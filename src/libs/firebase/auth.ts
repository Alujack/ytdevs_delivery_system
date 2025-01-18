import {
  type User,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  PhoneAuthProvider,
} from 'firebase/auth';
import { auth } from './config';

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(auth, callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);

    if (!result || !result.user) {
      throw new Error('Google sign in failed');
    }
    return result.user.uid;
  } catch (error) {
    console.error('Error signing in with Google', error);
  }
}

export async function signOutWithGoogle() {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Error signing out with Google', error);
  }
}

export function setupRecaptcha(containerId: string) {
  if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      containerId,
      { size: 'invisible' },
      auth
    );
  }
  return window.recaptchaVerifier;
}

export async function sendOTP(phoneNumber: string, recaptchaContainerId: string) {
  if (!phoneNumber) {
    throw new Error('Phone number is required');
  }

  try {
    const recaptchaVerifier = setupRecaptcha(recaptchaContainerId);
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier
    );
    return confirmationResult.verificationId; // Use this to verify OTP later
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
}

export async function verifyOTP(verificationId: string, otp: string) {
  try {
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    const userCredential = await auth.signInWithCredential(credential);
    return userCredential.user;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
}