import { useContext } from "react";
import { auth } from "../config/firebase-config";
import { signOut } from "firebase/auth";
import AuthenContext from "../context/authenContext";

const Contact = () => {
  const { chaneUserLogged } = useContext(AuthenContext); // Match with valueToShare in file authenContext.js

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
    console.log("Contact page, sign out listener " + auth.currentUser?.email);
    chaneUserLogged(""); // Change context value authenContext.hs
    window.location.pathname = "/";
  };

  return (
    <>
      <h1>Contact Me Have NOT been Implement</h1>
      <button
        type="button"
        className="block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
        onClick={logout}
      >
        <div className="flex items-center justify-center">
          <span className="ml-4"> Sign out</span>
        </div>
      </button>
    </>
  );
};

export default Contact;
