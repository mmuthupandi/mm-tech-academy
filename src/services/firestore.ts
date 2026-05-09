import { collection, addDoc, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { db } from "../lib/firebase";

// Example function to add a document to a collection
export const addExampleDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

// Example function to fetch documents from a collection
export const fetchExampleDocuments = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents: any[] = [];
    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return documents;
  } catch (e) {
    console.error("Error fetching documents: ", e);
    throw e;
  }
};
