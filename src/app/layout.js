import './globals.css';

export const metadata = {
  title: 'HACKATHON IT SCHOOL | ERP & CRM',
  description: 'Hackathon IT School - Ta\'lim va ERP tizimi',
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
