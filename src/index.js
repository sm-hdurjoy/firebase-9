import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

// Firebase database credentials
const firebaseConfig = {
  apiKey: "AIzaSyAaaf0KEr7y0acRJBUy3aYFlwRN0640SSE",
  authDomain: "fir-9-ba6e1.firebaseapp.com",
  projectId: "fir-9-ba6e1",
  storageBucket: "fir-9-ba6e1.appspot.com",
  messagingSenderId: "242750098212",
  appId: "1:242750098212:web:0dedd4844264bc5a3e81b1",
};
// console.log('hi');

// Initialize firebase app
initializeApp(firebaseConfig);

// initialize services
const db = getFirestore();

// Collection ref
const colRef = collection(db, "books");

// queries
const q = query(colRef, orderBy("createdAt"));

// // get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     // console.log(snapshot.docs);
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(books);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// Real time collection data/invoke function whenever data changes in the database
onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting document
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

// Get single document
const docRef = doc(db, "books", "ToSz9u0AL87kwiBg0mTi");

// getDoc(docRef)
// .then((doc) => {
//   console.log(doc.data(), doc.id);
// })

// If data changes in the database, then fetch the data again
onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});
