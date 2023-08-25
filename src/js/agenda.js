"use estrcit"

// Objeto Persona para los contactos
class Persona{
    name;
    email;
    celphone;
    description;
    type;

    constructor(name, email, celphone, description=null, type){
        this.name = name;
        this.email = email;
        this.celphone= celphone;
        this.description = description;
        this.type = type;
    }
}

// DOM Event
document.getElementById('contact-form').addEventListener('submit', function(e) {
    // recuperando valores del formulario
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const celphone = document.getElementById('contact-celphone').value;
    const description = document.getElementById('contact-description').value;
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

    // instanciando objeto persona
    const persona = new Persona(name, email, celphone, description, type)

    // agregando info a la agenda
    const agenda = document.querySelector('#lista');
    let contador = agenda.getElementsByTagName('tr').length + 1;
    divItem = document.createElement("tr");
    divItem.innerHTML = `
        <th scope="row">${contador}</th>
        <td>${persona.name}</td>
        <td>${persona.email}</td>
        <td>${persona.celphone}</td>
        <td>${persona.description}</td>
        <td>${persona.type}</td>
        <td><button type="button" class="btn btn-danger bt-sm">Borrar</button></td>
    `  
    agenda.appendChild(divItem);  

    // preparo mensaje
    const mensaje = document.querySelector('#mensaje');
    divMensaje = document.createElement('div');
    divMensaje.innerHTML = `
        <div class="alert alert-dismissible alert-warning">
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            <h4 class="alert-heading">El contacto "${persona.name}" fue agregado.</h4>
        </div>    
    `
    // cargo el mensaje
    mensaje.appendChild(divMensaje);
    // borro el mensaje después de 3 segundos
    //setInterval(function() {divMensaje.innerHTML = "";}, 3000); // con esta el mensaje tiene comportamiento errático
    setTimeout(function() { mensaje.removeChild(divMensaje); }, 3000);
    /*
        setTimeout se utiliza para ejecutar una función después de un retraso específico, mientras que 
        setInterval se utiliza para ejecutar una función repetidamente a intervalos regulares.
        si deseas eliminar completamente un elemento y todo su contenido, la opción recomendada es utilizar removeChild.
        Por otro lado, si solo deseas eliminar el contenido visible del elemento sin afectar su presencia en el DOM, puedes usar innerHTML = "".
    */

    // reseteando el formulario
    document.getElementById('contact-form').reset();

    // persistiendo los datos después del evento submit
    e.preventDefault();

})

