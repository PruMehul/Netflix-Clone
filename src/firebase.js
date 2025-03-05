import { initializeApp } from "firebase/app";
import { getAuth, signInWithCredential, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBtmhbnUW6TXu2TkLcWcaBQlBqLnjTYMng",
  authDomain: "netflix-clone-31a8a.firebaseapp.com",
  projectId: "netflix-clone-31a8a",
  storageBucket: "netflix-clone-31a8a.firebasestorage.app",
  messagingSenderId: "18322128557",
  appId: "1:18322128557:web:53a80c747bc8f613b69024"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    };
}

const login = async (email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const logout = async () => {
    signOut(auth);
}

export {auth, db, login, signup, logout}
