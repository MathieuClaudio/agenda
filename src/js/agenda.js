"use strict";

// Objeto Persona para los contactos
class Persona{

    constructor(id, name, email, celphone, description, type){
        this.id = id;
        this.name = name;
        this.email = email;
        this.celphone= celphone;
        this.description = description;
        this.type = type;
    }
}

// Función para verificar si el localStorage está disponible
function localStorageDisponible() {
    try {
        const testKey = '__test_key__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
}

// Función para obtener la lista de personas del localStorage
function obtenerPersonas() {
    const personasJSON = localStorage.getItem('personas');
    return personasJSON ? JSON.parse(personasJSON) : [];
}

// Función para obtener una persona del localStorage por su ID
function obtenerPersonaPorId(id) {
    const personas = obtenerPersonas();
    return personas.find(persona => persona.id === id) || null;
}

// Función para guardar la lista de personas en el localStorage
function guardarPersonas(personas) {
    localStorage.setItem('personas', JSON.stringify(personas));
}

// Función para agregar una nueva persona
function agregarPersona(id, name, email, celphone, description, type) {
    const personas = obtenerPersonas();
    const nuevoId = personas.length > 0 ? personas[personas.length - 1].id + 1 : 1; // Genera un nuevo ID incremental
    const nuevaPersona = new Persona(id, name, email, celphone, description, type);
    personas.push(nuevaPersona);
    guardarPersonas(personas);
}


function limpiarLocalStoragePersonas() {
    localStorage.removeItem('personas');
    //console.log('El localStorage de personas ha sido limpiado.');
}


function eliminaContacto(){
    // Obtener los datos del localStorage

}

function mostrarAgenda(agenda, listadPersonas){
    let divItem;
    for (const key in listadPersonas) {
        if (listadPersonas.hasOwnProperty(key)) {
            const element = listadPersonas[key];
            divItem = document.createElement("tr");
            divItem.innerHTML = `
                <th scope="row">${element.id}</th>
                <td>${element.name}</td>
                <td>${element.email}</td>
                <td>${element.celphone}</td>
                <td>${element.description}</td>
                <td>${element.type}</td>
                <td><button type="button" id="${element.id}" class="btn btn-danger bt-sm borrar">Borrar</button></td>
                <td><button type="button" id="${element.id}" class="btn btn-info bt-sm editar">Editar</button></td>
            `;
            agenda.appendChild(divItem);
        }
    }
}

let botonesBorrar;
let botonesEditar;
window.addEventListener("load", function(){
    const listadPersonas = obtenerPersonas();
        // agregando info a la agenda (Versión con localStorage)
        const agenda = document.querySelector('#lista');
        agenda.innerHTML = "";
        mostrarAgenda(agenda, listadPersonas);

        botonesBorrar = document.querySelectorAll('.borrar');
        // Agrega un evento click a cada botón
        botonesBorrar.forEach(boton => {
            boton.addEventListener('click', function() {
                const idToDelete = event.target.id; // Obtén el ID del botón clickeado
                //console.log(`Botón Borrar con ID ${id} clickeado`);
                // Obtén los datos del localStorage
                const datosLocalStorage = JSON.parse(localStorage.getItem('personas'));
                if (Array.isArray(datosLocalStorage)) {
                    console.log(datosLocalStorage);
                    // Filtrar los elementos para eliminar el elemento con "id": 2
                    const datosFiltrados = datosLocalStorage.filter(item => item.id != idToDelete);
                    console.log(datosFiltrados);
                
                    // Actualizar el localStorage con los datos filtrados
                    localStorage.setItem('personas', JSON.stringify(datosFiltrados));
                
                    console.log(`Dato con ID ${idToDelete} ha sido eliminado del localStorage.`);
                    // Recarga la página para reflejar los cambios
                    location.reload();
                } else {
                    console.log('Los datos no están en un formato válido.');
                }

            });
        });   


        botonesEditar = document.querySelectorAll('.editar');
        let formulario;
        // Agrega un evento click a cada botón
        botonesEditar.forEach(boton => {
            boton.addEventListener('click', function() {
                const idToEdit = event.target.id; // Obtén el ID del botón clickeado
                // Obtén los datos del localStorage
                const datosLocalStorage = JSON.parse(localStorage.getItem('personas'));
                if (Array.isArray(datosLocalStorage)) {
                    //console.log(datosLocalStorage);
                    const datosFiltrados = datosLocalStorage.filter(item => item.id == idToEdit);
                    //console.log(`Dato con ID ${idToEdit}:`);
                    //console.log(datosFiltrados + " - " + datosFiltrados[0].name);


                    // completar formulario
                    //formulario = document.getElementById('contact-form');
                    //console.log(formulario);
                    document.getElementById('contact-id').value = datosFiltrados[0].id;
                    document.getElementById('contact-name').value = datosFiltrados[0].name;
                    document.getElementById('contact-email').value = datosFiltrados[0].email;
                    document.getElementById('contact-celphone').value = datosFiltrados[0].celphone;
                    document.getElementById('contact-description').value = datosFiltrados[0].description;

                    const str = datosFiltrados[0].type;
                    // Divide el string en palabras utilizando el espacio como separador
                    const palabras = str.trim().split(' ');
                    // Itera a través de las palabras y realiza alguna acción
                    document.getElementById('contact-family').checked = false;
                    document.getElementById('contact-friend').checked = false;
                    palabras.forEach(palabra => {
                        if(palabra == "Familiar"){
                            document.getElementById('contact-family').checked = true;
                        }
                        if(palabra == "Amigo"){
                            document.getElementById('contact-friend').checked = true;
                        }
                    });


                    // Obtener nuevos datos desde el formulario
                    document.getElementById('editar').addEventListener('click', function () {

                        datosFiltrados[0].name = document.getElementById('contact-name').value;
                        datosFiltrados[0].email = document.getElementById('contact-email').value;
                        datosFiltrados[0].celphone = document.getElementById('contact-celphone').value;
                        datosFiltrados[0].description = document.getElementById('contact-description').value;

                        // seteando el tipo de contacto
                        const typeFamily = document.getElementById('contact-family');
                        const typeFriend = document.getElementById('contact-friend');
                        let type = "";
                        if(typeFamily.checked){
                            type += typeFamily.value + " ";
                        }
                        if(typeFriend.checked){
                            type += typeFriend.value + " ";
                        }
                        datosFiltrados[0].type = type;

                        guardarPersonas(datosLocalStorage);
                        location.reload();

                    })



                } else {
                    console.log('Los datos no están en un formato válido.');
                }
            });
        });  

        
        

})



const persona = new Persona();


if(localStorageDisponible()){


    // Event Submit Form
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        // Obteniendo los datos del formulario y asignando valores a los atributos del objeto Persona

        const personas = obtenerPersonas();
        const nuevoId = personas.length > 0 ? personas[personas.length - 1].id + 1 : 1; // Genera un nuevo ID incremental

        persona.id = nuevoId;
        persona.name = document.getElementById('contact-name').value;
        persona.email = document.getElementById('contact-email').value;
        persona.celphone = document.getElementById('contact-celphone').value;
        persona.description = document.getElementById('contact-description').value;
        const typeFamily = document.getElementById('contact-family');
        const typeFriend = document.getElementById('contact-friend');
        // seteando el tipo de contacto
        let type = "";
        if(typeFamily.checked){
            type += typeFamily.value + " ";
        }
        if(typeFriend.checked){
            type += typeFriend.value + " ";
        }
        persona.type = type;
        //console.log(persona.id + " " + persona.name + " " + persona.email + " " + persona.celphone + " " + persona.description + " " + persona.type);

        agregarPersona(persona.id, persona.name, persona.email, persona.celphone, persona.description, persona.type);


        const listadPersonas = obtenerPersonas();
               

        // agregando info a la agenda (Versión con localStorage)
        const agenda = document.querySelector('#lista');
        //console.log(agenda);

        agenda.innerHTML = "";
        
        //console.log('Lista de personas:', listadPersonas); 

        mostrarAgenda(agenda, listadPersonas);
              


        
        // reseteando el formulario
        document.getElementById('contact-form').reset();





        // reseteando el formulario
        document.getElementById('contact-form').reset();

        // persistiendo los datos después del evento submit
        //e.preventDefault();
    });    








    document.getElementById('eliminarTodo').addEventListener('click', function (e) {
        alert("haciendo click");
        //console.log("haciendo click");
        limpiarLocalStoragePersonas();
        location.reload();
        //console.log("después del click");
    });



}else{
    console.log("El almacenamiento de datos no está disponible o está lleno");
}




document.getElementById('cancelar').addEventListener('click', function () {
    document.getElementById('contact-id').value = "";
    document.getElementById('contact-name').value = "";
    document.getElementById('contact-email').value = "";
    document.getElementById('contact-celphone').value = "";
    document.getElementById('contact-description').value = "";  
    document.getElementById('contact-family').checked = false;
    document.getElementById('contact-friend').checked = false;
})