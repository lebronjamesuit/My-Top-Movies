import React from "react";
import { auth } from ".././config/firebase-config";
import { db } from ".././config/firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";


function EnterMovie() {

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
  run only countReload is changed when the component app render or re-render */


  return (<div className="movieParent">



    <div className="flex flex-wrap">
      {movies.map((m) => (<div key={m.id}>
        <br />
        <div class="block flex-grow" >
          <div class="block" >
            <span class="italic text-xl text-pink-500"> {m.name} </span>
          </div>
          <div class="block" >
            <span class="decoration-slate-400"> Releasd year: {m.releaseDate} </span>
          </div>
          <div class="block" >
            <span class="decoration-slate-400"> Created by: {m.userId.slice(0, 10)} </span>
          </div>


          <label class="block">
            <input type="text"
              onChange={(e) => setUpdatedReleaseDate(e.target.value)}
              class="mt-1 block w-5/6 " placeholder="edit release year" />
          </label>

          <div class="mt-2">
            <div>
              <label class="inline-flex items-center">
                <button type="button"
                  onClick={() => onUpdateReleaseDate(m.id)}

                  class="w-24 block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg 
                  px-1 py-1 border border-gray-300">
                  Update
                </button>

              </label>
            </div>
          </div>

          <div class="mt-2">
            <div>
              <label class="inline-flex items-center">
                <button type="button"
                  onClick={() => onDeleteMovie(m.id)}
                  class="w-24 block bg-blue hover:bg-gray-400 
                    focus:bg-gray-200 text-gray-700 
                    font-semibold rounded-lg 
                    px-1 py-1
                    border border-gray-300">
                  Delete
                </button>
              </label>
            </div>
          </div>
        </div>
      </div>
      ))}
    </div>


    <div class="py-12">
      <h2 class="text-2xl font-bold">Add a movie</h2>
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
                    class="w-24 block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-1 py-1 border border-gray-300">
                    Save
                  </button>

                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  );
}

export default EnterMovie;