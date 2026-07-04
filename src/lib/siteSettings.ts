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
};

function parseBoolean(value: unknown, fallback: boolean) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return fallback;
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

  update.run('chat.zoosnetEnabled', String(settings.zoosnetEnabled));
  update.run('chat.messageBoxEnabled', String(settings.messageBoxEnabled));
}
