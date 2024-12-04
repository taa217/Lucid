import { CssBaseline } from '@mui/material';
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
export const viewport = {
  width: 'device-width',
  initialScale: '0.8',
  maximumScale: '0.8',
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}
export const metadata = {
  title: "Lucid",
  description: "Enhanced learning with AI. ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <CssBaseline/>
        {children}
      </body>
    </html>
  );
}
