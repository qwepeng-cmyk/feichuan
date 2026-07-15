import nodemailer from 'nodemailer';
import { getEmailSettings } from './emailSettings';

export interface InquiryPayload {
  name: string;
  company?: string;
  email: string;
  contactMethod?: string;
  countryCode?: string;
  phone?: string;
  demands?: string[];
  message?: string;
  sourcePage?: string;
}

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isEmailReady(settings = getEmailSettings()) {
  return Boolean(
    settings.enabled &&
    settings.smtpHost &&
    settings.smtpPort &&
    settings.smtpUser &&
    settings.smtpPass &&
    settings.receiverEmail
  );
}

export async function sendInquiryNotification(inquiry: InquiryPayload) {
  const settings = getEmailSettings();

  if (!isEmailReady(settings)) {
    return { skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host: settings.smtpHost,
    port: settings.smtpPort,
    secure: settings.smtpSecure,
    auth: {
      user: settings.smtpUser,
      pass: settings.smtpPass,
    },
  });

  const demands = Array.isArray(inquiry.demands) ? inquiry.demands : [];
  const subjectName = inquiry.name || 'Website visitor';
  const subjectCompany = inquiry.company ? ` (${inquiry.company})` : '';
  const from = settings.fromEmail || settings.smtpUser;

  await transporter.sendMail({
    from,
    to: settings.receiverEmail,
    ...(inquiry.email ? { replyTo: inquiry.email } : {}),
    subject: `New N-TET inquiry from ${subjectName}${subjectCompany}`,
    text: [
      'New website inquiry',
      '',
      `Name: ${inquiry.name || ''}`,
      `Company: ${inquiry.company || ''}`,
      `Email: ${inquiry.email || ''}`,
      `Phone: ${inquiry.countryCode || ''} ${inquiry.phone || ''}`,
      `Contact Method: ${inquiry.contactMethod || ''}`,
      `Inquiry Types: ${demands.join(', ')}`,
      `Source Page: ${inquiry.sourcePage || ''}`,
      '',
      'Message:',
      inquiry.message || '',
    ].join('\n'),
    html: `
      <div style="font-family:Arial,sans-serif;color:#1f2937;line-height:1.6">
        <h2 style="margin:0 0 16px;color:#315ba4">New N-TET Website Inquiry</h2>
        <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:720px">
          <tr><td style="font-weight:700;background:#f3f6fb;width:160px">Name</td><td>${escapeHtml(inquiry.name)}</td></tr>
          <tr><td style="font-weight:700;background:#f3f6fb">Company</td><td>${escapeHtml(inquiry.company)}</td></tr>
          <tr><td style="font-weight:700;background:#f3f6fb">Email</td><td>${escapeHtml(inquiry.email)}</td></tr>
          <tr><td style="font-weight:700;background:#f3f6fb">Phone</td><td>${escapeHtml(`${inquiry.countryCode || ''} ${inquiry.phone || ''}`.trim())}</td></tr>
          <tr><td style="font-weight:700;background:#f3f6fb">Contact Method</td><td>${escapeHtml(inquiry.contactMethod)}</td></tr>
          <tr><td style="font-weight:700;background:#f3f6fb">Inquiry Types</td><td>${escapeHtml(demands.join(', '))}</td></tr>
          <tr><td style="font-weight:700;background:#f3f6fb">Source Page</td><td>${escapeHtml(inquiry.sourcePage)}</td></tr>
        </table>
        <h3 style="margin:24px 0 8px;color:#111827">Project Details / Message</h3>
        <div style="white-space:pre-wrap;background:#f8fafc;border:1px solid #e5e7eb;padding:16px">${escapeHtml(inquiry.message)}</div>
      </div>
    `,
  });

  return { skipped: false };
}
