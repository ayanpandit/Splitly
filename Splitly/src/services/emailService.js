// Centralized EmailJS wrapper to keep components clean
import emailjs from '@emailjs/browser';

const getConfig = () => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (!serviceId || !templateId || !publicKey) {
    throw new Error('Missing EmailJS env vars (VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY)');
  }
  return { serviceId, templateId, publicKey };
};

export async function sendContactEmail({ name, email, subject, category, message }) {
  const { serviceId, templateId, publicKey } = getConfig();
  const params = {
    from_name: name,
    from_email: email,
    subject,
    category,
    message,
  };
  return emailjs.send(serviceId, templateId, params, { publicKey });
}
