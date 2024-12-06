import Head from 'next/head';
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
export const metadata = {
  title: "Lucid",
  description: "Enhanced learning with AI. ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <Head>
        {/* Google Tag script */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-W0Q458T805"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-W0Q458T805');
            `,
          }}
        ></script>
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      
        {children}
      </body>
    </html>
  );
}
