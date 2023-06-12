const express = require('express')
const bcrypt = require('bcrypt')
const cors = require ('cors')
const { getFirestore, collection, setDoc, getDoc, doc, getDocs, updateDoc, deleteDoc, addDoc, Timestamp, query, where, orderBy} = require('firebase/firestore')
const { initializeApp } = require('firebase/app')
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth')

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

// Initialize FireAuth
const auth = getAuth(firebase)

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

// Sign Up
app.post('/SignUp', (req, res) => {
	const { email, password } = req.body


	if (!email || !password) {
		res.json({
			'alert' : 'not enough data'
		})
		return
	}
	// Validaciones
	if (!email.length) {
		res.json({
			'alert': 'You must enter an email'
		})
	} else if (password.length < 8) {
		res.json({
			'alert': 'The password must have a min of 8 characters'
		})
	} else {
		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				res.json({
					'alert' : 'User has been created'
				})
			})
			.catch((error) => {
				res.json({
					'alert' : 'Error creating user '
				})
			})
	}
})

// New Task

app.post('/NewTask', (req, res) => {

    // tenemos que recibir el valor del id a modo de string o nos da error
    const {userid, idtask, description, startDate, endDate, priority, state, tags, notes } = req.body
    const sendData = {
        idtask, description, startDate, endDate, priority, state, tags, notes
    }
    const coleccion = collection(db, "Users")
    const documento = doc(coleccion, userid)
    const coleccioninner = collection(documento, "Tasks")
    setDoc(doc(coleccioninner, idtask), sendData).then(() => {
        res.json({
            'alert' : 'success c:'
            })
        }).catch((error) => {
            res.json({
                'alert' : 'no success :c'
        })
    })
})

//All's Tasks

app.post('/AllsTasks', async (req, res) => {
    const { userid } = req.body
    try{
      const coleccion = collection(db, "Users")
      const documento = doc(coleccion, userid)
      const coleccioninner = collection(documento, "Tasks")
      const Tasks = await getDocs(coleccioninner)
      const Task = [];

      Tasks.forEach((doc) => {
        const dato = doc.data()
        Task.push(dato)
      })
      res.status(200).json(Task)
    } catch (error) {
      console.error('Error al buscar productos:', error)
    }
  })

// Edit task

app.post('/EditTask', (req, res) => {
    const {userid, idtask, description, startDate, finDate, priority, state, tags, notes } = req.body
    const sendData = {
        idtask, description, startDate, finDate, priority, state, tags, notes
    }
    const coleccion = collection(doc(collection(db, "Users"), userid), "Tasks")
    updateDoc(doc(coleccion, idtask), sendData).then(() => {
        res.json({
            'alert' : 'success'
            })
        }).catch((error) => {
            res.json({
                'alert' : 'no success :c'
        })
    })
})

// Delete Task

app.post('/DeleteTask', (req, res) => {
    const {userid, idtask} = req.body
    const coleccion = collection(doc(collection(db, "Users"), userid), "Tasks")
    deleteDoc(doc(coleccion, idproducto)).then(() => {
        res.json({
            'alert' : 'success'
            })
        }).catch((error) => {
            res.json({
                'alert' : 'nonononono'
        })
    })
})

// Edit task state

app.post('/EditTaskState', (req, res) => {
    const {userid, idtask, state} = req.body
    const sendData = {
        state
    }
    const coleccion = collection(doc(collection(db, "Users"), userid), "Tasks")
    updateDoc(doc(coleccion, idtask), sendData).then(() => {
        res.json({
            'alert' : 'success'
            })
        }).catch((error) => {
            res.json({
                'alert' : 'no success :c'
        })
    })
})

// ADD NEW STATE
app.post('/NewState', async (req, res) => {
    const { userid,  States } = req.body;
  
    try {
      const UsersRef = doc(collection(db, 'Users'), userid );
      const FacilRef = collection(UsersRef, 'Facilities');
      const FacilitiesRef = doc(FacilRef, 'States');

	  await setDoc(FacilitiesRef, {States});
      // Actualizar los números de artículos vendidos en la colección 'Productos'
      res.json({
        'alert': 'success',
      });
    } catch (error) {	
      console.error('Error al registrar la estados:', error);
      res.status(500).json({ mensaje: 'Error al registrar la estados' });
    }
  });

// ADD NEW TAG
app.post('/NewTag', async (req, res) => {
    const { userid,  Tags } = req.body;
  
    try {
      const UsersRef = doc(collection(db, 'Users'), userid );
      const FacilRef = collection(UsersRef, 'Facilities');
      const FacilitiesRef = doc(FacilRef, 'Tags');

	  await setDoc(FacilitiesRef, {Tags});
      // Actualizar los números de artículos vendidos en la colección 'Productos'
      res.json({
        'alert': 'success',
      });
    } catch (error) {	
      console.error('Error al registrar las etiquetas:', error);
      res.status(500).json({ mensaje: 'Error al registrar las etiquetas' });
    }
  });


// All States

app.post('/AllStates', async (req, res) => {
    const { userid } = req.body
    try{
      const coleccion = collection(db, "Users")
      const documento = doc(coleccion, userid)
      const coleccioninner = collection(documento, "Facilities")
      const StatesRef = doc(coleccioninner, "States")
      const States = await getDoc(StatesRef)
      const State = States.data()
      res.json(State)
    } catch (error) {
      console.error('Error al buscar estados:', error)
    }
  })

// All Tags

app.post('/AllTags', async (req, res) => {
    const { userid } = req.body
    try{
      const coleccion = collection(db, "Users")
      const documento = doc(coleccion, userid)
      const coleccioninner = collection(documento, "Facilities")
      const TasgsRef = doc(coleccioninner, "Tags")
      const Tags = await getDoc(TasgsRef)
      const Tag = Tags.data()
      res.json(Tag)
    } catch (error) {
      console.error('Error al buscar etiquetas:', error)
    }
  })

// Server Port
const PORT = process.env.PORT || 12000

app.listen(PORT, () => {
    console.log(`Listening port: ${PORT}`) 
})
