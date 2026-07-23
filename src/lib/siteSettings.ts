import db from './db';

export interface TrackingSettings {
  gaMeasurementId: string;
  gaEnabled: boolean;
  gtmContainerId: string;
  gtmEnabled: boolean;
}

export interface ChatSettings {
  zoosnetEnabled: boolean;
  messageBoxEnabled: boolean;
  messageBoxDelayMinutes: number;
}

const DEFAULT_TRACKING_SETTINGS: TrackingSettings = {
  gaMeasurementId: 'G-ZS6XC2TFCG',
  gaEnabled: true,
  gtmContainerId: 'GTM-PJN9QQWN',
  gtmEnabled: true,
};

const DEFAULT_CHAT_SETTINGS: ChatSettings = {
  zoosnetEnabled: true,
  messageBoxEnabled: false,
  messageBoxDelayMinutes: 3,
};

const MIN_MESSAGE_BOX_DELAY_MINUTES = 1;
const MAX_MESSAGE_BOX_DELAY_MINUTES = 60;

function parseBoolean(value: unknown, fallback: boolean) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return fallback;
}

function parseInteger(value: unknown, fallback: number, min: number, max: number) {
  const parsed = typeof value === 'number' ? value : Number.parseInt(String(value), 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, Math.round(parsed)));
}

export function getTrackingSettings(): TrackingSettings {
  const rows = db.prepare(
    "SELECT key, value FROM site_settings WHERE key LIKE 'tracking.%'"
  ).all() as Array<{ key: string; value: string | null }>;

  const values = Object.fromEntries(rows.map((row) => [row.key, row.value || '']));

  return {
    gaMeasurementId: values['tracking.gaMeasurementId'] || DEFAULT_TRACKING_SETTINGS.gaMeasurementId,
    gaEnabled: parseBoolean(values['tracking.gaEnabled'], DEFAULT_TRACKING_SETTINGS.gaEnabled),
    gtmContainerId: values['tracking.gtmContainerId'] || DEFAULT_TRACKING_SETTINGS.gtmContainerId,
    gtmEnabled: parseBoolean(values['tracking.gtmEnabled'], DEFAULT_TRACKING_SETTINGS.gtmEnabled),
  };
}

export function updateTrackingSettings(settings: TrackingSettings) {
  const update = db.prepare(`
    INSERT INTO site_settings (key, value, updated_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(key) DO UPDATE SET
      value = excluded.value,
      updated_at = CURRENT_TIMESTAMP
  `);

  const transaction = db.transaction(() => {
    update.run('tracking.gaMeasurementId', settings.gaMeasurementId.trim());
    update.run('tracking.gaEnabled', String(settings.gaEnabled));
    update.run('tracking.gtmContainerId', settings.gtmContainerId.trim());
    update.run('tracking.gtmEnabled', String(settings.gtmEnabled));
  });

  transaction();
}

export function getChatSettings(): ChatSettings {
  const rows = db.prepare(
    "SELECT key, value FROM site_settings WHERE key LIKE 'chat.%'"
  ).all() as Array<{ key: string; value: string | null }>;

  const values = Object.fromEntries(rows.map((row) => [row.key, row.value || '']));

  return {
    zoosnetEnabled: parseBoolean(values['chat.zoosnetEnabled'], DEFAULT_CHAT_SETTINGS.zoosnetEnabled),
    messageBoxEnabled: parseBoolean(values['chat.messageBoxEnabled'], DEFAULT_CHAT_SETTINGS.messageBoxEnabled),
    messageBoxDelayMinutes: parseInteger(
      values['chat.messageBoxDelayMinutes'],
      DEFAULT_CHAT_SETTINGS.messageBoxDelayMinutes,
      MIN_MESSAGE_BOX_DELAY_MINUTES,
      MAX_MESSAGE_BOX_DELAY_MINUTES
    ),
  };
}

export function updateChatSettings(settings: ChatSettings) {
  const update = db.prepare(`
    INSERT INTO site_settings (key, value, updated_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(key) DO UPDATE SET
      value = excluded.value,
      updated_at = CURRENT_TIMESTAMP
  `);

  const transaction = db.transaction(() => {
    update.run('chat.zoosnetEnabled', String(settings.zoosnetEnabled));
    update.run('chat.messageBoxEnabled', String(settings.messageBoxEnabled));
    update.run(
      'chat.messageBoxDelayMinutes',
      String(parseInteger(
        settings.messageBoxDelayMinutes,
        DEFAULT_CHAT_SETTINGS.messageBoxDelayMinutes,
        MIN_MESSAGE_BOX_DELAY_MINUTES,
        MAX_MESSAGE_BOX_DELAY_MINUTES
      ))
    );
  });

  transaction();
}
