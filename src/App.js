
import './App.css';
import {auth} from "./config/firebase-config"
import {Auth} from "./components/auth"
import { db } from './config/firebase-config';

import {addDoc, collection, getDocs, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import { useEffect, useState } from 'react';

function App() {

  console.log("Re-render App component");

  const [movies, setMovies] = useState([]);

  // New movie
  const [movieName, setMovieName] = useState("");
  const [yearOfRelease, setYearOfRelease] = useState(0); 
  const [isWinOscar, setIsWinOscar] = useState(false);

  // update
  const [updatedReleaseDate,setUpdatedReleaseDate] = useState(0);
  


  // does String movies need to match with the one in firestore ?
  const moviesCollectionRef = collection(db, "movies")

  const getAllMovies = async () => {
    // Read data 
    // set data to list movies
    try {
      const dataMovies  = await getDocs(moviesCollectionRef);

      const filterMovies = dataMovies.docs.map( (doc) => ({
        ...doc.data(), 
        id: doc.id
      }));

      setMovies(filterMovies);

      //  map ((item) => (new object ))
      //  new object =  {...doc.data)(), id: doc.id} copy of properties of docs.data

      console.log(" getAllMovies :  " + filterMovies);

    } catch (err) {
      console.error(err);
    } 
    
  }

  const onSubmitMovie = async () => {
    console.log("submit " + movieName + yearOfRelease + isWinOscar);
    
    let movie  = {
      name: movieName, 
      releaseDate: yearOfRelease, 
      winOscar: isWinOscar 
    };

    try {
      await addDoc(moviesCollectionRef, movie); 
    } catch (er) {
      console.error(er);
    }
    getAllMovies();
  };
 

  const onDeleteMovie =  async (id) => {
    // deleteDoc(reference: DocumentReference<unknown>): Promise<void>
      const movieRef = doc(db, "movies", id);
      await deleteDoc(movieRef);
      console.log("await deleteDoc(movie)" + id );
      getAllMovies();
  };

  const onUpdateReleaseDate = async(id) => {
      const movieRef = doc(db, "movies",id) ;
      console.log("Value of updatedReleaseDate " + updatedReleaseDate); 
      await updateDoc(movieRef, {releaseDate: updatedReleaseDate}); 
      getAllMovies();
  };


  useEffect( () => {

    getAllMovies();
    console.log("End useEffect");

  }, []);
/*   We want the function inside the useEffect 
  run only ONCE TIME when the component app render or re-render */
 

  return (  
    <div className="App">
      Fire base hello
      <Auth />
      
      <br/>
      <div>
        <input placeholder="movieName" 
        onChange={(e) => setMovieName(e.target.value)} />  

       <input placeholder="yearOfRelease" type='number'
        onChange={(e) => setYearOfRelease(e.target.value)} /> 

        <input placeholder='winOscar' type='checkbox' checked={isWinOscar}
        onChange={(e) => setIsWinOscar(e.target.checked)} />  

        <button onClick={onSubmitMovie} > Save </button>
      </div>


      <div>
      {movies.map( m => 
        <div key={m.id}>
            <h1> {m.name} </h1>
            <p> {m.releaseDate}</p>
            <button onClick={() => onDeleteMovie(m.id)} > Delete </button> 

            <input placeholder='...new data of release' 
            onChange={e => setUpdatedReleaseDate(e.target.value)} />
            <button onClick={() => onUpdateReleaseDate(m.id)}> Update </button>
         </div>
      )} 
      
      </div>


      
    </div>   
  
  );
}

export default App;
