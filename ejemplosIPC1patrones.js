// Ejemplos de Patrones de Diseño en JavaScript (Node.js)

// 1. Singleton
// Asegura que solo exista una instancia de una clase
class Singleton {
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        Singleton.instance = this;
        this.data = {};
    }

    getData() {
        return this.data;
    }

    setData(key, value) {
        this.data[key] = value;
    }
}

const instance1 = new Singleton();
const instance2 = new Singleton();
instance1.setData('key', 'value');
console.log(instance2.getData()); // Output: { key: 'value' }


// 2. Factory
// Proporciona una forma de crear objetos sin especificar su clase exacta
class Car {
    constructor(model, price) {
        this.model = model;
        this.price = price;
    }
}

class CarFactory {
    static createCar(type) {
        switch (type) {
            case 'sedan':
                return new Car('Sedan', 20000);
            case 'suv':
                return new Car('SUV', 30000);
            default:
                throw new Error('Tipo desconocido de coche');
        }
    }
}

const sedan = CarFactory.createCar('sedan');
console.log(sedan); // Output: Car { model: 'Sedan', price: 20000 }


// 3. Observer
// Permite a los objetos suscribirse y reaccionar a eventos
class Observable {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }

    update(data) {
        console.log(`${this.name} recibió: ${data}`);
    }
}

const observable = new Observable();
const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

observable.subscribe(observer1);
observable.subscribe(observer2);

observable.notify('Evento 1');
// Output:
// Observer 1 recibió: Evento 1
// Observer 2 recibió: Evento 1


// 4. Strategy
// Permite cambiar dinámicamente el comportamiento de un objeto
class PaymentStrategy {
    pay(amount) {
        throw new Error('El método pay() debe ser implementado');
    }
}

class CreditCardPayment extends PaymentStrategy {
    pay(amount) {
        console.log(`Pagado ${amount} con tarjeta de crédito`);
    }
}

class PayPalPayment extends PaymentStrategy {
    pay(amount) {
        console.log(`Pagado ${amount} con PayPal`);
    }
}

class PaymentContext {
    setStrategy(strategy) {
        this.strategy = strategy;
    }

    executePayment(amount) {
        this.strategy.pay(amount);
    }
}

const context = new PaymentContext();
context.setStrategy(new CreditCardPayment());
context.executePayment(100); // Output: Pagado 100 con tarjeta de crédito

context.setStrategy(new PayPalPayment());
context.executePayment(200); // Output: Pagado 200 con PayPal


// 5. Decorator
// Añade funcionalidad a un objeto de manera dinámica
class Coffee {
    cost() {
        return 5;
    }

    description() {
        return 'Café';
    }
}

class MilkDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }

    cost() {
        return this.coffee.cost() + 2;
    }

    description() {
        return `${this.coffee.description()} con leche`;
    }
}

class SugarDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }

    cost() {
        return this.coffee.cost() + 1;
    }

    description() {
        return `${this.coffee.description()} con azúcar`;
    }
}

let coffee = new Coffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);

console.log(coffee.description()); // Output: Café con leche con azúcar
console.log(coffee.cost()); // Output: 8
