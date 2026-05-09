import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_bl7j8q6';
const TEMPLATE_ID = 'template_u3lwid8';
const PUBLIC_KEY = 'UwUynZmTMa4ot9O5_';

export const sendEmailNotification = async (params: {
  title: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      title: params.title,
      name: params.name,
      email: params.email,
      phone: params.phone,
      message: params.message,
      time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    },
    PUBLIC_KEY
  );
};
