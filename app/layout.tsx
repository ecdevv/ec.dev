import { Inter, Raleway, Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-opensans',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
})


export const metadata = {
  title: "Eric Chour | Software Developer",
  description: "Eric Chour's Personal Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
      <link rel="manifest" href="/favicon/site.webmanifest"/>
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
      <link rel="shortcut icon" href="/favicon/favicon.ico"/>
      <meta name="msapplication-TileColor" content="#da532c"/>
      <meta name="msapplication-config" content="/favicon/browserconfig.xml"/>
      <meta name="theme-color" content="#ffffff"/>
      <body className={`${raleway.variable} ${openSans.variable} ${poppins.variable}`}>
        <Navbar/>
        {children}

      </body>
    </html>
  );
}

