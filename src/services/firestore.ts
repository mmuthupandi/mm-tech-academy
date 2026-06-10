export const addExampleDocument = async (collectionName: string, data: any) => {
  try {
    const items = JSON.parse(localStorage.getItem(`mock_${collectionName}`) || "[]");
    const id = "mock_id_" + Math.random().toString(36).substring(2, 11);
    items.push({ id, ...data });
    localStorage.setItem(`mock_${collectionName}`, JSON.stringify(items));
    console.log("Document written with ID: ", id);
    return id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
};

export const fetchExampleDocuments = async (collectionName: string) => {
  try {
    return JSON.parse(localStorage.getItem(`mock_${collectionName}`) || "[]");
  } catch (e) {
    console.error("Error fetching documents: ", e);
    return [];
  }
};
