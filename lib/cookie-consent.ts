export const COOKIE_CONSENT_STORAGE_KEY = "pfa-cookie-consent-v2";
export const COOKIE_CONSENT_VERSION = "2026-08-02";
export const COOKIE_CONSENT_EVENT = "pfa:cookie-consent";
export const COOKIE_SETTINGS_EVENT = "pfa:cookie-settings";

export interface CookieConsent {
  version: typeof COOKIE_CONSENT_VERSION;
  necessary: true;
  analytics: boolean;
  updatedAt: string;
}

export function parseCookieConsent(value: string | null): CookieConsent | null {
  if (!value) return null;

  try {
    const consent = JSON.parse(value) as Partial<CookieConsent>;

    if (
      consent.version !== COOKIE_CONSENT_VERSION ||
      consent.necessary !== true ||
      typeof consent.analytics !== "boolean" ||
      typeof consent.updatedAt !== "string"
    ) {
      return null;
    }

    return consent as CookieConsent;
  } catch {
    return null;
  }
}
