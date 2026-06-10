export interface UserData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  password?: string;
}

const USERS_COLLECTION = "mock_users";

export const signUpUser = async (name: string, email: string, phone: string, password: string): Promise<UserData> => {
  try {
    const emailNormalized = email.toLowerCase().trim();
    const users: UserData[] = JSON.parse(localStorage.getItem(USERS_COLLECTION) || "[]");
    
    if (users.find(u => u.email === emailNormalized)) {
      throw new Error("Email address is already registered.");
    }
    
    const newUser: UserData = {
      id: "user_" + Math.random().toString(36).substring(2, 11),
      name: name.trim(),
      email: emailNormalized,
      phone: phone.trim(),
      password, // Simple local verification
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem(USERS_COLLECTION, JSON.stringify(users));
    
    const sessionUser: UserData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      createdAt: newUser.createdAt
    };
    
    localStorage.setItem("mm_tech_user", JSON.stringify(sessionUser));
    return sessionUser;
  } catch (e) {
    console.error("Sign up error: ", e);
    throw e;
  }
};

export const logInUser = async (email: string, password: string): Promise<UserData> => {
  try {
    const emailNormalized = email.toLowerCase().trim();
    const users: UserData[] = JSON.parse(localStorage.getItem(USERS_COLLECTION) || "[]");
    const userDoc = users.find(u => u.email === emailNormalized);
    
    if (!userDoc) {
      throw new Error("No account found with this email address.");
    }
    
    if (userDoc.password !== password) {
      throw new Error("Incorrect password. Please try again.");
    }
    
    const sessionUser: UserData = {
      id: userDoc.id,
      name: userDoc.name,
      email: userDoc.email,
      phone: userDoc.phone,
      createdAt: userDoc.createdAt || new Date().toISOString()
    };
    
    localStorage.setItem("mm_tech_user", JSON.stringify(sessionUser));
    return sessionUser;
  } catch (e) {
    console.error("Log in error: ", e);
    throw e;
  }
};

export const getCurrentUser = (): UserData | null => {
  const cached = localStorage.getItem("mm_tech_user");
  if (!cached) return null;
  try {
    return JSON.parse(cached);
  } catch {
    return null;
  }
};

export const logOutUser = (): void => {
  localStorage.removeItem("mm_tech_user");
  window.location.reload();
};
