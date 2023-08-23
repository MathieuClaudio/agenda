"use estrcit"

// Ejemplo de Clase JS
// class Persona{

//     constructor(contacName = "Sin Nombre"){
//         this.name = contacName;
//     }
    
//     getName(){
//         return this.name;
//     }

//     setName(contacName){
//         this.name = contacName;
//     }
// }

// const persona1 = new Persona();
// console.log("persona1= " + persona1.getName());

// persona1.setName("Alejandro Mathieu");
// console.log("persona1= " + persona1.getName());

// const persona2 = new Persona("Taty");
// console.log("persona2= " + persona2.getName());


class Persona{
    name;
    email;
    description;
    type;

    constructor(name, email, description=null, type){
        this.name = name;
        this.email = email;
        this.description = description;
        this.type = type;
    }
}

// DOM Event
document.getElementById('contact-form').addEventListener('submit', function(e) {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const description = document.getElementById('contact-description').value;
    const typeFamily = document.getElementById('contact-family');
    const typeFriend = document.getElementById('contact-friend');

    let type = "";
    if(typeFamily.checked){
        type += typeFamily.value + " ";
    }
    if(typeFriend.checked){
        type += typeFriend.value + " ";
    }
    const persona = new Persona(name, email, description, type)
    console.log(persona);

    const agenda = document.querySelector('#lista');
    let contador = agenda.getElementsByTagName('tr').length + 1;
    divItem = document.createElement("tr");
    divItem.innerHTML = `
        <th scope="row">${contador}</th>
        <td>${name}</td>
        <td>${email}</td>
        <td>${description}</td>
        <td>${type}</td>
        <td><button type="button" class="btn btn-danger bt-sm">Borrar</button></td>
    `  
    agenda.appendChild(divItem);  

    document.getElementById('contact-form').reset();
    e.preventDefault();

})

