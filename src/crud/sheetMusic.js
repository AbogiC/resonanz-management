import { db } from "../firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Collection reference
const sheetMusicCollection = collection(db, "sheetMusic");

// Get all sheet music
export const getAllSheetMusic = async () => {
  try {
    const querySnapshot = await getDocs(sheetMusicCollection);
    const sheetMusic = [];
    querySnapshot.forEach((doc) => {
      sheetMusic.push({ id: doc.id, ...doc.data() });
    });
    return sheetMusic;
  } catch (error) {
    console.error("Error getting sheet music:", error);
    throw error;
  }
};

// Create new sheet music
export const createSheetMusic = async (sheetMusicData) => {
  try {
    const now = new Date();
    const dataWithMetadata = {
      ...sheetMusicData,
      created_date: now,
      created_by: "system", // TODO: Replace with actual user ID when authentication is implemented
      modified_date: now,
      modified_by: "system", // TODO: Replace with actual user ID when authentication is implemented
      rowStatus: "active",
    };
    const docRef = await addDoc(sheetMusicCollection, dataWithMetadata);
    return { id: docRef.id, ...dataWithMetadata };
  } catch (error) {
    console.error("Error creating sheet music:", error);
    throw error;
  }
};

// Update sheet music
export const updateSheetMusic = async (id, updatedData) => {
  try {
    const dataWithMetadata = {
      ...updatedData,
      modified_date: new Date(),
      modified_by: "system", // TODO: Replace with actual user ID when authentication is implemented
    };
    const docRef = doc(db, "sheetMusic", id);
    await updateDoc(docRef, dataWithMetadata);
    return { id, ...dataWithMetadata };
  } catch (error) {
    console.error("Error updating sheet music:", error);
    throw error;
  }
};

// Delete sheet music
export const deleteSheetMusic = async (id) => {
  try {
    const docRef = doc(db, "sheetMusic", id);
    await deleteDoc(docRef);
    return id;
  } catch (error) {
    console.error("Error deleting sheet music:", error);
    throw error;
  }
};
