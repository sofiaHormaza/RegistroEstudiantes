var firebaseConfig = {
    apiKey: "AIzaSyArc0CvaREiTGZgREHS-IZnPWno9fEaKB8",
    authDomain: "ecosistemas-57ed4.firebaseapp.com",
    databaseURL: "https://ecosistemas-57ed4.firebaseio.com",
    projectId: "ecosistemas-57ed4",
    storageBucket: "ecosistemas-57ed4.appspot.com",
    messagingSenderId: "908497073069",
    appId: "1:908497073069:web:4c108e9ef9b7c06871a724",
    measurementId: "G-W26PGQ3P4X"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


const estudianteNombre=document.getElementById("estudianteNombre");
const nombreIT=document.getElementById("nombreIT");;
const profesorIT=document.getElementById("profesorIT");;
const registrarBtn=document.getElementById("registrarBtn");;
const materiasContainer=document.getElementById("materiasContainer");
const database=firebase.database();
const storage=window.localStorage;

//recuperación de datos
const idEst=storage.getItem("id");

//Leer un objeto
database.ref().child("estudiantes").child(idEst).on("value",function(snapshot){
    //snapshot toma una foto de lo que hay dentro de estudiantes
  
        var estObj=snapshot.val();
        console.log(estObj.nombre);
  
        estudianteNombre.innerHTML="Perfil de "+estObj.nombre+" "+estObj.apellido;
  
  });

  registrarBtn.addEventListener("click",function(){

    var id=database.ref().child("estudiantes").child(idEst).child("materias").push().key;
    //cual rama va a contener las materias
      var nombre=nombreIT.value;
      var profesor=profesorIT.value;

      var materia=new Materia(id,nombre,profesor);
      database.ref().child("estudiantes").child(idEst).child("materias").child(id).set(materia);
  })

  //Leer lista de materias del estudiante
  database.ref().child("estudiantes").child(idEst).child("materias").on("child_added",function(snapshot){
    var materia=snapshot.val();

    var item=document.createElement("p");
    item.innerHTML=materia.nombre+" ("+materia.profesor+")";

    materiasContainer.appendChild(item);
  })