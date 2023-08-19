import React from "react";
import Istockphoto from ".././photos/istockphoto.jpg";

import { useState } from "react";
import { auth, googleAuthProvider } from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

function Play() {
  return <div class="parents"></div>;
}

export default Play;
