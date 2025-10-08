import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import "./globals.css";
import SessionWrapper from "../../components/SessionWrapper.js"; // 👈 import wrapper

import ThemeSwitcher from "@/components/ThemeSwitcher";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import ContactPopup from "@/components/ContactPopup";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import DockNavigation from "@/components/DockNavigation";
import Script from "next/script";

export const metadata = {
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SriPatro",
  },
  applicationName: "SriPatro",
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  //export default async function LocaleLayout(props) {
  // const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });
  return (
    <>
      <SessionWrapper>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <DockNavigation />
          <div className="min-h-screen bg-base-200 lg:pl-64">
            <div className="px-4 sm:px-6 lg:px-8 pb-24 lg:pb-0">
              <div className="flex justify-end gap-2 py-4">
                <ThemeSwitcher />
                <LocaleSwitcher />
              </div>
              {children}
            </div>
          </div>
          <ContactPopup />
          <ServiceWorkerRegister />
        </NextIntlClientProvider>
      </SessionWrapper>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}`}
        crossOrigin="anonymous"
      />
    </>
  );
}
