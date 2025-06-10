import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface MailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  templateVars?: Record<string, string | number>;
  attachments?: nodemailer.SendMailOptions['attachments'];
}

/**
 * Simple template function to replace {{key}} in html template with values from templateVars
 */
function applyTemplate(template: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce(
    (html, [key, value]) => html.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), String(value)),
    template
  );
}

/**
 * Send email with optional HTML templating and attachments
 */
export async function sendMail({
  to,
  subject,
  text,
  html,
  templateVars,
  attachments,
}: MailOptions) {
  try {
    let finalHtml = html;

    if (html && templateVars) {
      finalHtml = applyTemplate(html, templateVars);
    }

    const info = await transporter.sendMail({
      from: `"Your Spa Name" <${process.env.SMTP_FROM}>`,
      to,
      subject,
      text,
      html: finalHtml,
      attachments,
    });

    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
