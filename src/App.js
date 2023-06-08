import "./App.css";
import { auth } from "./config/firebase-config";
import { Auth } from "./components/auth";
import { db } from "./config/firebase-config";

import Play from "./components/play";

import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { prodErrorMap } from "firebase/auth";
import EnterMovie from "./components/enterMovie";

function App() {
  console.log("Re-render App component");

  const [movies, setMovies] = useState([]);

  // New movie
  const [movieName, setMovieName] = useState("");
  const [yearOfRelease, setYearOfRelease] = useState(0);
  const [isWinOscar, setIsWinOscar] = useState(false);

  // update
  const [updatedReleaseDate, setUpdatedReleaseDate] = useState(0);
  const [countReload, setCountReload] = useState(0);

  // does String movies need to match with the one in firestore ?
  const moviesCollectionRef = collection(db, "movies");

  const getAllMovies = async () => {
    // Read data
    // set data to list movies
    try {
      const dataMovies = await getDocs(moviesCollectionRef);

      const filterMovies = dataMovies.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMovies(filterMovies);

      //  map ((item) => (new object ))
      //  new object =  {...doc.data)(), id: doc.id} copy of properties of docs.data

      console.log(" getAllMovies :  " + filterMovies);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitMovie = async () => {
    console.log("submit " + movieName + yearOfRelease + isWinOscar);

    let movie = {
      name: movieName,
      releaseDate: yearOfRelease,
      winOscar: isWinOscar,
      userId: auth?.currentUser?.uid,
    };

    try {
      await addDoc(moviesCollectionRef, movie);
    } catch (er) {
      console.error(er);
      alert(er);
    }
    setCountReload(countReload + 1);
  };

  const onDeleteMovie = async (id) => {
    // deleteDoc(reference: DocumentReference<unknown>): Promise<void>
    const movieRef = doc(db, "movies", id);
    try {
      await deleteDoc(movieRef);
    } catch (er) {
      console.error(er);
      alert(er);
    }
    console.log("await deleteDoc(movie)" + id);
    setCountReload(countReload + 1);
  };

  const onUpdateReleaseDate = async (id) => {
    const movieRef = doc(db, "movies", id);
    console.log("Value of updatedReleaseDate " + updatedReleaseDate);
    try {
      await updateDoc(movieRef, { releaseDate: updatedReleaseDate });

    } catch (er) {
      console.error(er);
      alert(er);
    }
    setCountReload(countReload + 1);
  };

  useEffect(() => {
    getAllMovies();
    console.log("Get al movies again in Use effect");

  }, [countReload]);
  /*   We want the function inside the useEffect 
  run only ONCE TIME when the component app render or re-render */

  return (

    <div className="container mx-auto">
      <h1 className="text-3xl font-bold underline">
        Hello There!
      </h1>

      <Auth />
      <br />

      <div class="py-12">
        <h2 class="text-2xl font-bold">Create movie</h2>
        <p class="mt-2 text-lg text-gray-600">Example.</p>
        <div class="mt-8 max-w-md">
          <div class="grid grid-cols-1 gap-6">
            <label class="block">
              <span class="text-gray-700">Movie name</span>
              <input type="text"
                onChange={(e) => setMovieName(e.target.value)}
                class="mt-1 block w-full" placeholder="" />
            </label>

            <label class="block">
              <span class="text-gray-700">Date of Release</span>
              <input type="number"
                onChange={(e) => setYearOfRelease(e.target.value)}
                class="mt-1 block w-full" />
            </label>

            <lable class="block" >
              <span class="text-gray-500"> Win Oscar? </span>
              <input
                placeholder="winOscar"
                type="checkbox"
                checked={isWinOscar}
                onChange={(e) => setIsWinOscar(e.target.checked)}
              />
            </lable>

            <div class="block">
              <div class="mt-2">
                <div>
                  <label class="inline-flex items-center">
                    <button type="button"
                      onClick={onSubmitMovie}
                      class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
                      Save
                    </button>

                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        {movies.map((m) => (<div key={m.id}>
          <br />
          <div class="block" >

            <span class="italic text-xl"> {m.name} </span>
            <span class="decoration-slate-400"> {m.releaseDate} </span>
            <span class="decoration-slate-400"> Owner by: {m.userId} </span>
            <div class="mt-2">
              <div>
                <label class="inline-flex items-center">
                  <button type="button"
                    onClick={() => onDeleteMovie(m.id)}

                    class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
                    Delete
                  </button>

                </label>
              </div>
            </div>

            <label class="block">
              <input type="text"
                onChange={(e) => setUpdatedReleaseDate(e.target.value)}
                class="mt-1 block w-1/6 " placeholder="Update release date" />
            </label>

            <div class="mt-2">
              <div>
                <label class="inline-flex items-center">
                  <button type="button"
                    onClick={() => onUpdateReleaseDate(m.id)}

                    class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
                    Update
                  </button>

                </label>
              </div>
            </div>

          </div>
        </div>
        ))};

      </div>


    </div>
  );
}

export default App;
