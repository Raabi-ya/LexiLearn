import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const doSignOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
};

export const doPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

export const doPasswordChange = async (password) => {
  try {
    const user = auth.currentUser;
    await updatePassword(user, password);
  } catch (error) {
    throw error;
  }
};

export const doSendEmailVerification = async () => {
  try {
    const user = auth.currentUser;
    await sendEmailVerification(user, {
      url: `${window.location.origin}/Home.js`,
    });
  } catch (error) {
    throw error;
  }
};

