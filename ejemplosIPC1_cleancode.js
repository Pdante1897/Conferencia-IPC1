// Ejemplos de Clean Code en Node.js

// 1. Nombres de variables y funciones significativos
// Mal ejemplo:
function calc(x, y) {
    return (x * y) / 100;
}

// Buen ejemplo:
function calcularPorcentaje(valor, porcentaje) {
    return (valor * porcentaje) / 100;
}


// 2. Funciones pequeñas y con una sola responsabilidad
// Mal ejemplo:
function procesarDatos(datos) {
    // Validación de datos
    if (!datos || datos.length === 0) {
        return "Error: Datos vacíos";
    }
    const datosValidados = datos.filter(d => typeof d === 'number');

    // Cálculo de la suma
    const suma = datosValidados.reduce((acc, val) => acc + val, 0);

    // Impresión del resultado
    console.log(`La suma es: ${suma}`);
}

// Buen ejemplo:
function validarDatos(datos) {
    if (!datos || datos.length === 0) {
        throw new Error("Datos vacíos");
    }
    return datos.filter(d => typeof d === 'number');
}

function calcularSuma(datos) {
    return datos.reduce((acc, val) => acc + val, 0);
}

function imprimirResultado(resultado) {
    console.log(`La suma es: ${resultado}`);
}

// Uso:
try {
    const datos = [1, 2, "tres", 4];
    const datosValidos = validarDatos(datos);
    const resultado = calcularSuma(datosValidos);
    imprimirResultado(resultado);
} catch (error) {
    console.error(error.message);
}


// 3. Evitar números mágicos
// Mal ejemplo:
if (edad > 65) {
    console.log("Persona mayor");
}

// Buen ejemplo:
//obtener variable de entorno

const EDAD_ADULTO_MAYOR = process.env.EDAD_ADULTO_MAYOR || 65;

if (edad > EDAD_ADULTO_MAYOR) {
    console.log("Persona mayor");
}


// 4. Comentarios útiles y no redundantes
// Mal ejemplo:
// Incrementa el contador en 1
contador = contador + 1;

// Buen ejemplo:
// Incrementa el contador para reflejar el próximo intento de conexión
contador += 1;


// 5. Evitar funciones con demasiados parámetros
// Mal ejemplo:
function crearUsuario(nombre, apellido, edad, direccion, telefono) {
    return {
        nombre,
        apellido,
        edad,
        direccion,
        telefono
    };
}

// Buen ejemplo:
class Usuario {
    constructor(nombre, apellido, edad, direccion, telefono) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.direccion = direccion;
        this.telefono = telefono;
    }
}

const usuario = new Usuario("Juan", "Pérez", 30, "Calle Falsa 123", "123456789");


const carroJson = {
    "marca": "Toyota",
    "modelo": "Corolla",
    "anio": 2020
};

function crearCarro(carroJson) {
    return {
        marca: carroJson.marca,
        modelo: carroJson.modelo,
        anio: carroJson.anio
    };
}

// 6. Manejo adecuado de excepciones
// Mal ejemplo:
function dividir(a, b) {
    return a / b;
}

try {
    const resultado = dividir(10, 0);
} catch {
    console.log("Ocurrió un error");
}

// Buen ejemplo:
function dividir(a, b) {
    if (b === 0) {
        throw new Error("El divisor no puede ser cero");
    }
    return a / b;
}

try {
    const resultado = dividir(10, 0);
} catch (error) {
    console.error(`Error: ${error.message}`);
}





// 7. Evitar anidamiento excesivo
// Mal ejemplo:
if(condicion1){
    if(false){
        if(condicion2){
            if(condicion3){
                console.log("Hola");
            }
        }
    }   
}

for(let i = 0; i < 10; i++){
    console.log(i);
    for(let j = 0; j < 10; j++){
        console.log(j);
        for(let k = 0; k < 10; k++){
            console.log(k);
            for(let l = 0; l < 10; l++){
                console.log(l);
        }
    }
}

// Buen ejemplo:

if(condicion1){
    return;
}
if(condicion2){
    return;
}
if(condicion3){
    console.log("Hola");
}



