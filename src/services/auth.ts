import { collection, addDoc, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../lib/firebase";

export interface UserData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

const USERS_COLLECTION = "users";

/**
 * Register a new user in the system.
 * Checks if the email already exists.
 */
export const signUpUser = async (name: string, email: string, phone: string, password: string): Promise<UserData> => {
  try {
    const emailNormalized = email.toLowerCase().trim();
    
    // Check if email already exists
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(usersRef, where("email", "==", emailNormalized), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      throw new Error("Email address is already registered.");
    }
    
    const newUser = {
      name: name.trim(),
      email: emailNormalized,
      phone: phone.trim(),
      password, // Simple local verification
      createdAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(usersRef, newUser);
    
    const sessionUser: UserData = {
      id: docRef.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      createdAt: newUser.createdAt
    };
    
    // Save to local storage for persistence
    localStorage.setItem("mm_tech_user", JSON.stringify(sessionUser));
    return sessionUser;
  } catch (e) {
    console.error("Sign up error: ", e);
    throw e;
  }
};

/**
 * Log in a user by matching email and password.
 */
export const logInUser = async (email: string, password: string): Promise<UserData> => {
  try {
    const emailNormalized = email.toLowerCase().trim();
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(usersRef, where("email", "==", emailNormalized), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error("No account found with this email address.");
    }
    
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    
    if (userData.password !== password) {
      throw new Error("Incorrect password. Please try again.");
    }
    
    const sessionUser: UserData = {
      id: userDoc.id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      createdAt: userData.createdAt || new Date().toISOString()
    };
    
    localStorage.setItem("mm_tech_user", JSON.stringify(sessionUser));
    return sessionUser;
  } catch (e) {
    console.error("Log in error: ", e);
    throw e;
  }
};

/**
 * Retrieve the currently logged in user session.
 */
export const getCurrentUser = (): UserData | null => {
  const cached = localStorage.getItem("mm_tech_user");
  if (!cached) return null;
  try {
    return JSON.parse(cached);
  } catch {
    return null;
  }
};

/**
 * Log out the user.
 */
export const logOutUser = (): void => {
  localStorage.removeItem("mm_tech_user");
  window.location.reload();
};
