
// Clase Persona
class Persona{
    name;

    getPersona(){
        return this.name;
    }

    log(message) {
        console.log(`[Persona]: ${message}`);
    }    
}

// Clase que implementa las operaciones de la interfax gráfica
class DomUi{
    name = "Claudio Mathieu";

    setName(name){
        this.name = name;
    }

    getName(){
        return this.name
    }

    log(message) {
        console.log(`[DonUi]: ${message}`);
    }
}

// clase que implementa las operaciones con el localStorage del Navegador Web (persistir)
class StorageWeb{

    addPerson(message){
        console.log(`[StorageLocal]: ${message}`);
    }

}



// Inyecta las dependencias necesarias para 
// realizar las operaciones segun los eventos de usuario
class Eventos{
    constructor(Persona, DomUi, StorageWeb){
        this.persona = Persona;
        this.domui = DomUi;
        this.storageLocal = StorageWeb;
    }

    // Lógica para insertar una persona
    insertPerson(){
        // Obtener nombre de la persona desde el DOM por el Formulario y cargarselo al objeto Persona
        this.persona.name = this.domui.getName();
        this.domui.log(`El objeto persona ahora es : ${this.persona.getPersona()}`);
        this.storageLocal.addPerson(`Se agregó la persona: ${this.persona.getPersona()} a la DB`);
        this.persona.log(this.persona.getPersona());
    }

}

// Usando las clases
// Crear una instancia de Persona
const persona = new Persona();

//console.log(persona.getPerson());

// Crear una instancia de DomUi
const domUi = new DomUi();

// Crear una instancia de StorageWeb
const storage = new StorageWeb();

// Crear una instancia de Eventos inyectando las dependencias
const eventos = new Eventos(persona, domUi, storage);

eventos.insertPerson();