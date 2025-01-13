import { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../context/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Import necessary functions from v9+

export default function useContent(target) {
    const [content, setContent] = useState([]);
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const db = getFirestore(firebase); // Get Firestore instance

        // Access the collection using the modular API
        const contentCollection = collection(db, target);

        // Fetch documents from the collection
        getDocs(contentCollection)
            .then((snapshot) => {
                const allContent = snapshot.docs.map((contentObj) => ({
                    ...contentObj.data(),
                    docId: contentObj.id,
                }));
                setContent(allContent);
            })
            .catch((error) => {
                console.log(error.message);
            });

    }, [firebase, target]); // Adding target to the dependency array to handle dynamic collection names
    return { [target]: content };
}


{/*import { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../context/firebase";

export default function useContent(target) {
    const [content, setContent] = useState([]);
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        firebase
            .firestore()
            .collection(target)
            .get()
            .then((snapshot) => {
                const allContent = snapshot.docs.map((contentObj) => ({
                    ...contentObj.data(),
                    docId: contentObj.id, 
                }));
                setContent(allContent);
            })
            .catch((error) => {
                console.log(error.message);
            })

            
    }, []);
    return { [target]: content};
}*/}