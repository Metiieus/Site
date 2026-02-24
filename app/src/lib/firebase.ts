import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';

// Firebase configuration - Replace with your own config from Firebase Console
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'your-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'your-auth-domain',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'your-project-id',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'your-storage-bucket',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'your-sender-id',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'your-app-id',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Auth functions
export const registerWithEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const logoutUser = () => {
  return signOut(auth);
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// User profile functions
export const createUserProfile = async (userId: string, data: {
  name: string;
  email: string;
  photoURL?: string;
}) => {
  await setDoc(doc(db, 'users', userId), {
    ...data,
    createdAt: Timestamp.now(),
  });
};

export const getUserProfile = async (userId: string) => {
  const docSnap = await getDoc(doc(db, 'users', userId));
  return docSnap.exists() ? docSnap.data() : null;
};

// Blog functions
export interface BlogArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  author: string;
  readTime: number;
}

export const getBlogArticles = async (): Promise<BlogArticle[]> => {
  const q = query(collection(db, 'blog'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as BlogArticle[];
};

export const getBlogArticle = async (id: string): Promise<BlogArticle | null> => {
  const docSnap = await getDoc(doc(db, 'blog', id));
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as BlogArticle) : null;
};

export default app;
