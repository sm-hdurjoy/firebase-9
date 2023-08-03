import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhBjs-r9OE8ln3FtDnYd5tVoxNKBYvUXM",
  authDomain: "fir-9-f72f8.firebaseapp.com",
  projectId: "fir-9-f72f8",
  storageBucket: "fir-9-f72f8.appspot.com",
  messagingSenderId: "475116388815",
  appId: "1:475116388815:web:59c8d268a995289455d2ba",
};
// console.log('hi');

// Initialize firebase app
initializeApp(firebaseConfig);

// initialize services
const db = getFirestore();

// Collection ref
const colRef = collection(db, "books");

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    // console.log(snapshot.docs);
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });

// adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  })
  .then (() => {
    addBookForm.reset()
  })

});

// deleting document
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
  .then(() => {
    deleteBookForm.reset()
  })

});
