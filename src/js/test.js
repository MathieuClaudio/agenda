// Dependencia con funciones

// Módulo que realiza operaciones matemáticas
function MathOperations(addOperation) {
    this.addOperation = addOperation;
  }
  
  MathOperations.prototype.add = function(a, b) {
    return this.addOperation(a, b);
  };
  
  // Función que implementa la operación de suma
  function addition(a, b) {
    return a + b;
  }
  
  // Crear una instancia de MathOperations inyectando la dependencia de la función de suma
  const mathWithAddition = new MathOperations(addition);
  
  // Realizar una operación de suma utilizando la instancia
  const result = mathWithAddition.add(5, 5);
  console.log(result); // Salida esperada: 8


// ################################################


// dependencia con objetos
// Definición de la clase Logger
class Logger {
    log(message) {
        console.log(`[Log]: ${message}`);
    }
}

// Definición de la clase User
class User {
    constructor(name) {
        this.name = name;
    }
}

// Definición de la clase UserService que depende de Logger
class UserService {
    constructor(Logger, User) {
        this.logger = logger;
        this.user = User;
    }

    addUser(username) {
        // Lógica para agregar un usuario
        this.logger.log(`Usuario agregado: ${username} - ${this.user.name}`);
    }

    deleteUser(username) {
        // Lógica para borrar un usuario
        this.logger.log(`Usuario borrado: ${username} - ${this.user.name}`);
    }
}

// Crear una instancia de Logger
const logger = new Logger();

// Crear una instancia de User
const user = new User("Claudio");

// Crear una instancia de UserService inyectando la dependencia Logger
const userService = new UserService(logger, user);

// Usar UserService para agregar un usuario
userService.addUser('ejemploUsuario');

// Usar UserService para borrar un usuario
userService.deleteUser('ejemploUsuarioBorrado');
  
  