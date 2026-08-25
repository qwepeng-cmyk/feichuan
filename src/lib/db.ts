import 'server-only';
import postgres from 'postgres';

type QueryRow = Record<string, unknown>;

export interface RunResult {
  changes: number;
  lastInsertRowid?: number | string;
}

interface PreparedStatement {
  all(...parameters: any[]): Promise<QueryRow[]>;
  get(...parameters: any[]): Promise<QueryRow | undefined>;
  run(...parameters: any[]): Promise<RunResult>;
}

interface DatabaseAdapter {
  prepare(query: string): PreparedStatement;
  transaction(
    callback: (transactionDb: DatabaseAdapter) => Promise<void>,
  ): Promise<void>;
}

const connectionString = process.env.SUPABASE_DATABASE_URL;

if (!connectionString) {
  throw new Error('SUPABASE_DATABASE_URL is required for server-side database access.');
}

const globalDatabase = globalThis as typeof globalThis & {
  ntetPostgres?: ReturnType<typeof postgres>;
};

const sql =
  globalDatabase.ntetPostgres ??
  postgres(connectionString, {
    max: 1,
    idle_timeout: 10,
    connect_timeout: 15,
    prepare: false,
  });

if (process.env.NODE_ENV !== 'production') {
  globalDatabase.ntetPostgres = sql;
}

function toPostgresQuery(query: string) {
  let parameterIndex = 0;

  return query
    .replace(/\?/g, () => `$${++parameterIndex}`)
    .replace(/\s+COLLATE\s+NOCASE/gi, '');
}

async function execute(query: string, parameters: any[] = []) {
  return sql.unsafe<QueryRow[]>(toPostgresQuery(query), parameters);
}

const db: DatabaseAdapter = {
  prepare(query: string) {
    return {
      async all(...parameters: any[]) {
        return execute(query, parameters);
      },

      async get(...parameters: any[]) {
        const rows = await execute(query, parameters);
        return rows[0];
      },

      async run(...parameters: any[]): Promise<RunResult> {
        const wantsInsertedId =
          /^\s*INSERT\s+INTO\s+inquiries\b/i.test(query) &&
          !/\bRETURNING\b/i.test(query);
        const executableQuery = wantsInsertedId
          ? `${query.trim().replace(/;$/, '')} RETURNING id`
          : query;
        const rows = await execute(executableQuery, parameters);

        return {
          changes: rows.count ?? rows.length,
          lastInsertRowid: wantsInsertedId
            ? (rows[0]?.id as number | string | undefined)
            : undefined,
        };
      },
    };
  },

  async transaction(callback: (transactionDb: DatabaseAdapter) => Promise<void>) {
    await sql.begin(async (transactionSql) => {
      const transactionDb = {
        ...db,
        prepare(query: string) {
          return {
            async all(...parameters: any[]) {
              return transactionSql.unsafe<QueryRow[]>(
                toPostgresQuery(query),
                parameters,
              );
            },
            async get(...parameters: any[]) {
              const rows = await transactionSql.unsafe<QueryRow[]>(
                toPostgresQuery(query),
                parameters,
              );
              return rows[0];
            },
            async run(...parameters: any[]): Promise<RunResult> {
              const rows = await transactionSql.unsafe<QueryRow[]>(
                toPostgresQuery(query),
                parameters,
              );
              return { changes: rows.count ?? rows.length };
            },
          };
        },
      } as DatabaseAdapter;

      await callback(transactionDb);
    });
  },
};

export default db;
