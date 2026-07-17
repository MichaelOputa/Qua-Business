export const WHATSAPP_NUMBER = '2347019791950';

export const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const WA_MESSAGES = {
  general: "Hello Qua Business, I'd like to learn more about your services.",
  buildWebsite:
    "Hello Qua Business, I'd like to build a website for my business. Please provide more information about your website development packages.",
  quote:
    "Hello Qua Business, I'd like to request a quote for a custom project. Could you share more details?",
  branding:
    "Hello Qua Business, I'm interested in your branding subscription and graphic design services. Please share more information.",
  video:
    "Hello Qua Business, I'd like to know more about your Video Production packages and pricing.",
  pricing:
    "Hello Qua Business, I'd like to discuss your subscription pricing and which plan would suit my business best.",
};
