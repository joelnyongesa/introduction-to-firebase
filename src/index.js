// Imports
import {initializeApp} from 'firebase/app'
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAxSvT1pTioBk3tuDPtjHkL1I50OadCzds",
    authDomain: "fir-introduction-tutorial.firebaseapp.com",
    projectId: "fir-introduction-tutorial",
    storageBucket: "fir-introduction-tutorial.appspot.com",
    messagingSenderId: "143811920639",
    appId: "1:143811920639:web:72d116b282e6f1422942ca"
  };

//   Initialize the app
initializeApp(firebaseConfig)


// Initialize services.
const db = getFirestore();

// Collection ref.
const colRef = collection(db, 'friends')

// Fetching data from firebase- Realtime data
onSnapshot(colRef, (snapshot)=>{
    let friends = []
    snapshot.docs.forEach((doc)=>{
        friends.push({...doc.data(), id: doc.id,})
    })
    console.log(friends)
})


// Adding friends
const addFriendForm = document.querySelector('.addFriendForm')
addFriendForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    addDoc(colRef, {
        name: addFriendForm.name.value,
        hobby: addFriendForm.hobby.value,
    })
    .then(()=>addFriendForm.reset())
});


// Deleting friends.
const deleteFriendForm = document.querySelector('.deleteFriendForm')
deleteFriendForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const docRef = doc(db, 'friends', deleteFriendForm.id.value)

    deleteDoc(docRef)
    .then(()=>deleteFriendForm.reset())
})
