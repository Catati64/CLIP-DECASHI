const express = require('express')
const bcrypt = require('bcrypt')
const cors = require ('cors')
const { getFirestore, collection, setDoc, getDoc, doc, getDocs, updateDoc, deleteDoc, addDoc, Timestamp, query, where, orderBy} = require('firebase/firestore')
const { initializeApp } = require('firebase/app')

require('dotenv/config')

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsLPXUTS6etIOsKzqI2j_SpIplAymOBKg",
    authDomain: "clip-decashi-c55dd.firebaseapp.com",
    projectId: "clip-decashi-c55dd",
    storageBucket: "clip-decashi-c55dd.appspot.com",
    messagingSenderId: "1060202572692",
    appId: "1:1060202572692:web:25f1e8de1f03c446713d81"
  };
  
// // Initialize Firebase
const firebase = initializeApp(firebaseConfig)
const db = getFirestore()

// // Initialize server
		const app = express()

// CORS options
const corsOptions = {
	"origin": "*",
	"optionSuccesStatus": 200
}

// Server Config
app.use(express.json())
app.use(cors(corsOptions))

// ---------- >>>> Routes <<<< ----------

// ADD USER
app.post('/newuser', (req, res) => {
	const { email, password, name, lastname, number } = req.body

	if (!email || !password || !name || !lastname || !number) {
			res.json({
					'alert' : 'not enough data'
			})
			return
	}

			// Validaciones
			if(name.length < 3) {
					res.json({
							'alert': 'Name requires min 3 characters'
					})
			} else if (lastname.length < 3) {
					res.json({
							'alert': 'Lastname requires min 3 characters'
					})
			} else if (!email.length) {
					res.json({
							'alert': 'You must enter an email'
					})
			} else if (password.length < 8) {
					res.json({
							'alert': 'The password must have a min of 8 characters'
					})
			} else if (!Number(number) || !number.length === 10) {
					res.json({
							'alert': 'Please enter a valid number'
					})
			} else {
					const Users = collection(db, "Users")
	
					getDoc(doc(Users, email)).then(User => {
							if(User.exists()) {
									res.json({
											'alert': 'The mail already exists in the DB'
									})
							} else {
									bcrypt.genSalt(10, (err, salt) => {
											bcrypt.hash(password, salt, (err, hash) => {
													sendData = {
															email,
															password: hash,
															name,
															lastname,
															number
													}
	
													// Guardar en DB
													setDoc(doc(Users, email), sendData).then(() => {
															res.json({
																	'alert': 'success'
															})
													}).catch((error) => {
															res.json({
																	'alert': error
															})
													})
											})
									})
							}
					})
			}

})

// I'LL TRY TO ADD THE LOGIN TO THE FRONT-END

// Server Port
const PORT = process.env.PORT || 12000

app.listen(PORT, () => {
    console.log(`Listening port: ${PORT}`) 
})
