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


const firstnameIT=document.getElementById("firstnameIT");
const secondnameIT=document.getElementById("secondnameIT");
const codeIT=document.getElementById("codeIT");
const registerBtn=document.getElementById("registerBtn");
//const crearhtmlBtn=document.getElementById("crearhtmlBtn");
const contenedorBase=document.getElementById("contenedorBase");

//base de datos
const database=firebase.database();

const storage=window.localStorage;

var imagenSeleccionada="";

/*
crearhtmlBtn.addEventListener("click", function(){
  //var parrafo=document.createElement("p");
    //crear boton
    //var botonNuevo=document.createElement("button");
    var listItem=document.createElement("li");
    //lo que va dentro de ese botón <button> aqui </button>
    listItem.innerHTML="Soy un item nuevo";
    listItem.id="itemNuevo";
    //encerrar dentro de un parrafo
    //parrafo.appendChild(botonNuevo);
    contenedorBase.appendChild(listItem);
});
*/

registerBtn.addEventListener("click",registrar);

    function registrar(){

        let nombre= firstnameIT.value;
        let apellido=secondnameIT.value;
        let code=codeIT.value;

        //id sea el mismo identificador de firebase
        let id=database.ref().child("estudiantes").push().key;


        let estudiante=new Estudiante(id,nombre,apellido,code, imagenSeleccionada);

        let info=firstnameIT.value+","+secondnameIT.value+","+codeIT.value;
        console.log(estudiante);

        //se obtiene referencia de ruta raiz con .ref, se agrega una subrama con .child y se agrega el elemento con.set
        //Registrar un solo estudiante en una rama
        //database.ref().child("estudiantes").set(estudiante);

        //con .push se hace una lista
        //database.ref().child("estudiantes").push().set(estudiante);
        database.ref().child("estudiantes").child(id).set(estudiante);
}

//leer lista optimamente
database.ref().child("estudiantes").on("child_added", function(snapshot){
  var estObj=snapshot.val();
  var item=document.createElement("li");

  var enlace=document.createElement("a");
  enlace.innerHTML=estObj.nombre+" "+estObj.apellido;
  enlace.href="#";

  var img=document.createElement("img");
  img.src=estObj.url;
  img.width=36;

  enlace.id=estObj.id;
  //append child agrega imagen a item
  item.appendChild(img);
  item.appendChild(enlace);

  contenedorBase.appendChild(item);

  //crear listener al elemento
  document.getElementById(estObj.id).addEventListener("click",function(event){
    event.preventDefault();
    //como un putExtra
    storage.setItem("id",estObj.id);
    window.location.href="agregarMaterias.html";
  });
})

document.querySelectorAll(".avatar").forEach(
  item=> {
    item.addEventListener("click",function(){
      //cuando toca el item se vuelve mas grande con restoreButtons
      restoreButtons();
      item.width=128;
      imagenSeleccionada=item.src;
      console.log(imagenSeleccionada);
    })
  }
);

function restoreButtons(){
  document.querySelectorAll(".avatar").forEach(
    item=>{
      item.width=96;
    }
  );
}