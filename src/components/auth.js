import { useContext, useState } from "react";
import { auth, googleAuthProvider } from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import Istockphoto from ".././photos/istockphoto.jpg";
import AuthenContext from "../context/authenContext";

export const Authen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userLogged, chaneUserLogged } = useContext(AuthenContext); // Match with valueToShare in file authenContext.js

  console.log(
    "This is Context ValueToShare {userLogged, callback fn chaneUserLogged } " +
      userLogged
  );

  const signMeIn = async () => {
    try {
      // This is a Promise JS Promise<UserCredential>
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Sign me");
      console.log(email);
    } catch (err) {
      console.error(err);
    }
    changeLoggedEmail();
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err) {
      console.log(err);
    }
    console.log("signInWithGoogle listening " + auth.currentUser?.email);
    changeLoggedEmail();
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
    console.log("sign out listening " + auth.currentUser?.email);
    setEmail();
  };

  function changeLoggedEmail() {
    if (auth.currentUser?.email != null) {
      setEmail(auth.currentUser?.email);
      chaneUserLogged(auth.currentUser?.email); // Change context value authenContext.hs
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src={Istockphoto}
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
     
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={signMeIn}
              className="flex w-full justify-center 
                    rounded-md bg-indigo-600 px-3 py-1.5 
                    text-sm font-semibold leading-6 
                    text-white shadow-sm hover:bg-indigo-500 
                    focus-visible:outline focus-visible:outline-2 
                    focus-visible:outline-offset-2 
                    focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign in with Google
          </a>
        </p>

        <button
          type="button"
          className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
          onClick={signInWithGoogle}
        >
          <div className="flex items-center justify-center">
            <span className="ml-4"> Log in with Google</span>
          </div>
        </button>

      </div>
    </div>
  );
};
