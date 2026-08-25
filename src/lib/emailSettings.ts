import db from './db';

export interface EmailSettings {
  enabled: boolean;
  brochureNotificationsEnabled: boolean;
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  fromEmail: string;
  receiverEmail: string;
}

export interface PublicEmailSettings extends Omit<EmailSettings, 'smtpPass'> {
  smtpPass: string;
  hasSmtpPass: boolean;
}

const hasSmtpConfig = Boolean(
  process.env.SMTP_HOST &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS
);

const DEFAULT_EMAIL_SETTINGS: EmailSettings = {
  enabled: process.env.EMAIL_NOTIFICATIONS_ENABLED
    ? process.env.EMAIL_NOTIFICATIONS_ENABLED === 'true'
    : hasSmtpConfig,
  brochureNotificationsEnabled: process.env.ENABLE_BROCHURE_EMAIL_NOTIFICATION === '1',
  smtpHost: process.env.SMTP_HOST || '',
  smtpPort: Number(process.env.SMTP_PORT || 587),
  smtpSecure: Number(process.env.SMTP_PORT || 587) === 465,
  smtpUser: process.env.SMTP_USER || '',
  smtpPass: process.env.SMTP_PASS || '',
  fromEmail: process.env.SMTP_USER || '',
  receiverEmail: process.env.INQUIRY_RECEIVER_EMAIL || 'info@n-tetbj.cn',
};

function parseBoolean(value: unknown, fallback: boolean) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return fallback;
}

function parsePort(value: unknown, fallback: number) {
  const parsed = Number(value);
  if (Number.isInteger(parsed) && parsed > 0 && parsed <= 65535) {
    return parsed;
  }
  return fallback;
}

async function loadValues() {
  const rows = await db.prepare(
    "SELECT key, value FROM site_settings WHERE key LIKE 'email.%'"
  ).all() as Array<{ key: string; value: string | null }>;

  return Object.fromEntries(rows.map((row) => [row.key, row.value || '']));
}

export async function getEmailSettings(): Promise<EmailSettings> {
  const values = await loadValues();

  return {
    enabled: parseBoolean(values['email.enabled'], DEFAULT_EMAIL_SETTINGS.enabled),
    brochureNotificationsEnabled: parseBoolean(
      values['email.brochureNotificationsEnabled'],
      DEFAULT_EMAIL_SETTINGS.brochureNotificationsEnabled
    ),
    smtpHost: values['email.smtpHost'] || DEFAULT_EMAIL_SETTINGS.smtpHost,
    smtpPort: parsePort(values['email.smtpPort'], DEFAULT_EMAIL_SETTINGS.smtpPort),
    smtpSecure: parseBoolean(values['email.smtpSecure'], DEFAULT_EMAIL_SETTINGS.smtpSecure),
    smtpUser: values['email.smtpUser'] || DEFAULT_EMAIL_SETTINGS.smtpUser,
    smtpPass: values['email.smtpPass'] || DEFAULT_EMAIL_SETTINGS.smtpPass,
    fromEmail: values['email.fromEmail'] || DEFAULT_EMAIL_SETTINGS.fromEmail,
    receiverEmail: values['email.receiverEmail'] || DEFAULT_EMAIL_SETTINGS.receiverEmail,
  };
}

export async function getPublicEmailSettings(): Promise<PublicEmailSettings> {
  const settings = await getEmailSettings();

  return {
    ...settings,
    smtpPass: '',
    hasSmtpPass: Boolean(settings.smtpPass),
  };
}

export async function updateEmailSettings(settings: Partial<EmailSettings> & { keepExistingPassword?: boolean }) {
  const current = await getEmailSettings();
  const next: EmailSettings = {
    enabled: Boolean(settings.enabled),
    brochureNotificationsEnabled: Boolean(settings.brochureNotificationsEnabled),
    smtpHost: (settings.smtpHost ?? '').trim(),
    smtpPort: parsePort(settings.smtpPort, 587),
    smtpSecure: Boolean(settings.smtpSecure),
    smtpUser: (settings.smtpUser ?? '').trim(),
    smtpPass: settings.keepExistingPassword ? current.smtpPass : (settings.smtpPass ?? '').trim(),
    fromEmail: (settings.fromEmail ?? '').trim(),
    receiverEmail: (settings.receiverEmail ?? '').trim(),
  };

  await db.transaction(async (transactionDb) => {
    const update = transactionDb.prepare(`
      INSERT INTO site_settings (key, value, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET
        value = excluded.value,
        updated_at = CURRENT_TIMESTAMP
    `);

    await update.run('email.enabled', String(next.enabled));
    await update.run('email.brochureNotificationsEnabled', String(next.brochureNotificationsEnabled));
    await update.run('email.smtpHost', next.smtpHost);
    await update.run('email.smtpPort', String(next.smtpPort));
    await update.run('email.smtpSecure', String(next.smtpSecure));
    await update.run('email.smtpUser', next.smtpUser);
    await update.run('email.smtpPass', next.smtpPass);
    await update.run('email.fromEmail', next.fromEmail);
    await update.run('email.receiverEmail', next.receiverEmail);
  });
}
