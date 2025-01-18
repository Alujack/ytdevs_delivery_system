import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize reCAPTCHA verifier for phone authentication
export const setupRecaptcha = (containerId) => {
  const recaptchaVerifier = new RecaptchaVerifier(containerId, {
    size: 'invisible',
    callback: (response) => {
      // Handle reCAPTCHA response here
    },
  }, auth);

  recaptchaVerifier.render();
};

// Function to send OTP to phone number
export const sendOTP = async (phoneNumber, recaptchaContainerId) => {
  const recaptchaVerifier = setupRecaptcha(recaptchaContainerId);
  const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  return confirmationResult;  // Store the confirmation result to verify OTP
};

// Function to verify OTP
export const verifyOTP = async (confirmationResult, otp) => {
  try {
    const result = await confirmationResult.confirm(otp);
    return result.user;
  } catch (error) {
    console.error('OTP verification failed:', error);
    return null;
  }
};
