class Persona{

    constructor(contacName = "Sin Nombre"){
        this.name = contacName;
    }
    
    getName(){
        return this.name;
    }

    setName(contacName){
        this.name = contacName;
    }
}

const persona1 = new Persona();
console.log("persona1= " + persona1.getName());

persona1.setName("Alejandro Mathieu");
console.log("persona1= " + persona1.getName());

const persona2 = new Persona("Taty");
console.log("persona2= " + persona2.getName());