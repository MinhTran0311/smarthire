"use client";

import { IntlProvider } from "react-intl";
import { ReactNode, useEffect, useState } from "react";
import { LocaleProvider } from "../contexts/LocaleContext";

const loadMessages = async (locale: string) => {
  const messages = await import(`../i18n/locales/${locale}.json`);
  return messages.default;
};

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const loadIntl = async () => {
      const loadedMessages = await loadMessages(locale);
      setMessages(loadedMessages);
    };

    loadIntl();
  }, [locale]);

  if (Object.keys(messages).length === 0) {
    return null;
  }

  return (
    <LocaleProvider locale={locale} setLocale={setLocale}>
      <IntlProvider messages={messages} locale={locale}>
        {children}
      </IntlProvider>
    </LocaleProvider>
  );
}
