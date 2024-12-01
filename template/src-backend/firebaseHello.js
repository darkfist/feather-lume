import firestore from "../project-configs/firebase.config";
import { collection, getDocs } from "firebase/firestore";

const firebaseHello = async () => {
  const helloCollection = collection(firestore, "hello");
  const collectionData = await getDocs(helloCollection);
  const helloMessage = collectionData.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return helloMessage;
};

export default firebaseHello;
