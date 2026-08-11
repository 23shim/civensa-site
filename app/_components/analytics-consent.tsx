"use client";

import { useEffect, useState } from "react";

const MEASUREMENT_ID = "G-NP9Y9WQ3E2";

export function AnalyticsConsent() {
  const [choice, setChoice] = useState<"granted" | "denied" | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("civensa-analytics-consent");
    if (saved === "granted" || saved === "denied") setChoice(saved);
  }, []);

  useEffect(() => {
    if (choice !== "granted" || document.querySelector(`script[data-civensa-analytics]`)) return;
    const external = document.createElement("script");
    external.async = true;
    external.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    external.dataset.civensaAnalytics = "true";
    document.head.appendChild(external);
    window.dataLayer = window.dataLayer || [];
    const gtag = (...args: unknown[]) => window.dataLayer.push(args);
    gtag("js", new Date());
    gtag("config", MEASUREMENT_ID, { anonymize_ip: true });
  }, [choice]);

  const save = (value: "granted" | "denied") => {
    window.localStorage.setItem("civensa-analytics-consent", value);
    setChoice(value);
  };

  if (choice !== null) return null;
  return <aside className="consent-banner" aria-label="Analytics preferences"><div><strong>Your choice, clearly.</strong><p>We use optional Google Analytics only if you agree. It helps us understand which research is useful. Necessary site functions work without it.</p></div><div className="consent-actions"><button onClick={() => save("denied")}>Decline</button><button className="consent-accept" onClick={() => save("granted")}>Allow analytics</button></div></aside>;
}

declare global { interface Window { dataLayer: unknown[][]; } }
