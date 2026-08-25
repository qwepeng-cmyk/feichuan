import db from './db';
import { supabase } from './supabase';

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

export async function getTrackingSettings(): Promise<TrackingSettings> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('key, value')
    .like('key', 'tracking.%');
  if (error) throw error;
  const rows = (data || []) as Array<{ key: string; value: string | null }>;

  const values = Object.fromEntries(rows.map((row) => [row.key, row.value || '']));

  return {
    gaMeasurementId: values['tracking.gaMeasurementId'] || DEFAULT_TRACKING_SETTINGS.gaMeasurementId,
    gaEnabled: parseBoolean(values['tracking.gaEnabled'], DEFAULT_TRACKING_SETTINGS.gaEnabled),
    gtmContainerId: values['tracking.gtmContainerId'] || DEFAULT_TRACKING_SETTINGS.gtmContainerId,
    gtmEnabled: parseBoolean(values['tracking.gtmEnabled'], DEFAULT_TRACKING_SETTINGS.gtmEnabled),
  };
}

export async function updateTrackingSettings(settings: TrackingSettings) {
  await db.transaction(async (transactionDb) => {
    const update = transactionDb.prepare(`
      INSERT INTO site_settings (key, value, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET
        value = excluded.value,
        updated_at = CURRENT_TIMESTAMP
    `);
    await update.run('tracking.gaMeasurementId', settings.gaMeasurementId.trim());
    await update.run('tracking.gaEnabled', String(settings.gaEnabled));
    await update.run('tracking.gtmContainerId', settings.gtmContainerId.trim());
    await update.run('tracking.gtmEnabled', String(settings.gtmEnabled));
  });
}

export async function getChatSettings(): Promise<ChatSettings> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('key, value')
    .like('key', 'chat.%');
  if (error) throw error;
  const rows = (data || []) as Array<{ key: string; value: string | null }>;

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

export async function updateChatSettings(settings: ChatSettings) {
  await db.transaction(async (transactionDb) => {
    const update = transactionDb.prepare(`
      INSERT INTO site_settings (key, value, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET
        value = excluded.value,
        updated_at = CURRENT_TIMESTAMP
    `);
    await update.run('chat.zoosnetEnabled', String(settings.zoosnetEnabled));
    await update.run('chat.messageBoxEnabled', String(settings.messageBoxEnabled));
    await update.run(
      'chat.messageBoxDelayMinutes',
      String(parseInteger(
        settings.messageBoxDelayMinutes,
        DEFAULT_CHAT_SETTINGS.messageBoxDelayMinutes,
        MIN_MESSAGE_BOX_DELAY_MINUTES,
        MAX_MESSAGE_BOX_DELAY_MINUTES
      ))
    );
  });
}
