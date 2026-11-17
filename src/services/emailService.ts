import emailjs from '@emailjs/browser';
import {COMPANY_INFO, EMAILJS_CONFIG, isEmailJSConfigured, ServiceTypeOption} from '../config/emailConfig';

export type PreferredTimeOption = 'Morning' | 'Afternoon' | 'Flexible';

export interface AppointmentRequestData {
  fullName: string;
  email: string;
  phone: string;
  serviceType: ServiceTypeOption;
  preferredDate: string;
  preferredTime: PreferredTimeOption;
  projectAddress: string;
  message: string;
  consent: boolean;
}

export class EmailConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmailConfigurationError';
  }
}

export function buildMailtoFallbackUrl(data: AppointmentRequestData): string {
  const subject = `Electrical Service Appointment Request - ${data.serviceType} (${data.fullName})`;
  const bodyLines = [
    `Hello ${COMPANY_INFO.contactPerson},`,
    '',
    'I would like to request an electrical service appointment with Olympia Electric Ltd.:',
    '',
    `Full Name: ${data.fullName}`,
    `Email Address: ${data.email}`,
    `Phone Number: ${data.phone}`,
    `Service Type: ${data.serviceType}`,
    `Preferred Appointment Date: ${data.preferredDate || 'Not specified'}`,
    `Preferred Time: ${data.preferredTime}`,
    `Project Address: ${data.projectAddress || 'Not provided'}`,
    '',
    'Electrical Needs / Project Details:',
    data.message,
    '',
    'Consent: I agree to be contacted regarding my service request.',
  ];

  const params = new URLSearchParams({
    subject,
    body: bodyLines.join('\n'),
  });

  return `mailto:${COMPANY_INFO.email}?${params.toString()}`;
}

export async function submitAppointmentRequest(data: AppointmentRequestData): Promise<void> {
  if (!isEmailJSConfigured()) {
    throw new EmailConfigurationError(
      'Automated email delivery is not configured yet. Please add your EmailJS Service ID, Template ID, and Public Key, or use the direct email/phone options below.',
    );
  }

  const templateParams: Record<string, string> = {
    to_email: COMPANY_INFO.email,
    to_name: COMPANY_INFO.contactPerson,
    company_name: COMPANY_INFO.name,
    from_name: data.fullName.trim(),
    reply_to: data.email.trim(),
    customer_name: data.fullName.trim(),
    customer_email: data.email.trim(),
    customer_phone: data.phone.trim(),
    service_type: data.serviceType,
    preferred_date: data.preferredDate.trim() || 'Not specified',
    preferred_time: data.preferredTime,
    project_address: data.projectAddress.trim() || 'Not provided',
    message: data.message.trim(),
    consent_given: data.consent ? 'Yes — customer agreed to be contacted.' : 'No',
    submitted_at: new Date().toLocaleString('en-CA', {
      timeZone: 'America/Halifax',
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  };

  const response = await emailjs.send(
    EMAILJS_CONFIG.serviceId,
    EMAILJS_CONFIG.templateId,
    templateParams,
    {
      publicKey: EMAILJS_CONFIG.publicKey,
    },
  );

  if (response.status !== 200) {
    throw new Error(`Email service returned status ${response.status}.`);
  }
}
