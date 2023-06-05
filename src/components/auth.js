
import { useState } from "react";
import { auth, googleAuthProvider } from "../config/firebase-config";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signMeIn = async () => {
       try  {
           // This is a Promise JS Promise<UserCredential>
            await createUserWithEmailAndPassword(auth, email, password);  
            console.log('Sign me');
            console.log(email);

        }
        catch (err){
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleAuthProvider);
        } catch (err) {
            console.log(err);
        }
        console.log('signInWithGoogle listening ' + auth.currentUser?.email);
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.log(err);
        }
        console.log('sign out listening ' + auth.currentUser?.email);
    };
    

    return (
    <div className="login"> 
        <input placeholder="Email" 
            onChange={ (e) => setEmail(e.target.value) } />

        <input placeholder="Password" 
            type="password"
            onChange={ (e) => setPassword(e.target.value) }/>   

        <button onClick={signMeIn} > Sign in </button>

        <button onClick={signInWithGoogle} > Sign in with Google Auth</button>
        <button onClick={logout}> Log out </button>    
    </div>
);
}

