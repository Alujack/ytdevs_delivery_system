// types/global.d.ts
export {};

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}
