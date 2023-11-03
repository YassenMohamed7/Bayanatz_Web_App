import { jsonEN } from "./languageJson/jsonEN.js";
import { jsonAR } from "./languageJson/jsonAR.js";
const formEl = document.querySelector("form");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const subjectError = document.getElementById("subjectError")
const messageError = document.getElementById("messageError")
let currentLang = localStorage.getItem("language")


import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js'
import { getFirestore, collection,  addDoc, getDocs} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "AIzaSyCxWxeAw57kUkNHZUcTPS2Ktn_G3rLB614",
  authDomain: "bayanatz-2da32.firebaseapp.com",
  projectId: "bayanatz-2da32",
  storageBucket: "bayanatz-2da32.appspot.com",
  messagingSenderId: "937995273276",
  appId: "1:937995273276:web:2afaaf2c11a3071b16ef39",
  measurementId: "G-N2G5CDVB7W"
};

initializeApp(firebaseConfig);
const db = getFirestore();
const User = collection(db, "Users");


// Test getDocs
// getDocs(User)
//   .then((snapshot) => {
//   let messages = []
//   snapshot.docs.forEach((doc) => {
//     messages.push({...doc.data(), id: doc.id})
//   })
//   console.log(messages)
// }).catch((err) => {
//   console.log(err.message)
// });


let displayError = (ele, msg) => {
  ele.textContent = msg;
  ele.parentElement.children[1].classList.add(`red`);
  ele.parentElement.classList.add("bg-color");
};


const isValidName = (name) => {
  const jsonLang = currentLang === "English" ? jsonEN : jsonAR;
  const namePattern = /^[A-Za-z\u0600-\u06FF\s'-]+$/;
  if (name.length === 0) {
    displayError(nameError, jsonLang["pleaseName"]);
    return false;
  } else if (!namePattern.test(name)) {
    displayError(nameError, jsonLang["invalidName"]);
    return false;
  } else {
    nameError.textContent = "";
    return true;
  }
};

const isValidEmail = (email) => {
  const jsonLang = currentLang === "English" ? jsonEN : jsonAR;
  if (email === "") {
    displayError(emailError, jsonLang["pleaseEmail"]);
    return false;
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    displayError(emailError, jsonLang["invalidEmail"]);
    return false;
  } else {
    emailError.textContent = "";
    return true;
  }
};
const isValidPhone = (phone) => {
  const jsonLang = currentLang === "English" ? jsonEN : jsonAR;
  if (phone === "") {
    displayError(phoneError, jsonLang["pleasePhone"]);
    return false;
  }
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    displayError(phoneError, jsonLang["invalidPhone"]);
    return false;
  } else {
    phoneError.textContent = "";
    return true;
  }
};

const isValidSubject = (subject) => {
  const jsonLang = currentLang === "English" ? jsonEN : jsonAR;
  if (subject === "") {
    displayError(subjectError, jsonLang["pleaseSubject"]);
    return false;
  }
  return true;
};

const isValidMessage = (message) => {
  const jsonLang = currentLang === "English" ? jsonEN : jsonAR;
  if (message === "") {
    displayError(messageError, jsonLang["pleaseMessage"]);
    return false;
  }
  return true;
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  currentLang = localStorage.getItem("language");
  const formData = new FormData(formEl);
  const data = Object.fromEntries(formData);

  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  subjectError.textContent = "";
  phoneError.textContent = "";

  const validName = isValidName(data.name.trim());
  const validEmail = isValidEmail(data.email.trim());
  const validPhone = isValidPhone(data.phone.trim());
  const validSubject = isValidSubject(data.subject.trim());
  const validMessage = isValidMessage(data.message.trim());

  if (
    !validName ||
    !validEmail ||
    !validPhone ||
    !validSubject ||
    !validMessage
  )
    return;

  //   here  addDoc to firesotre 
  addDoc(User, {
    name: data.name,
    email: data.email,
    phone: data.phone,
    subject: data.subject,
    message: data.message
  }).then(() =>{
    formEl.reset();
  })

});

// Remove error on focus input

let inputs = document.querySelectorAll("form .rem__error");
inputs.forEach((ele) => {
  ele.addEventListener("click", () => {
    ele.parentElement.classList.remove("bg-color");
    ele.parentElement.children[2].textContent = "";
    ele.classList.remove("red");
  });
});