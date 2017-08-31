class Animal {

    constructor(name) {
        this.name = name;
    }

    say() {
        return `my name is ${this.name || 'anonymous'}`;
    }

    static isNamed(animal) {
        return !!animal.name;
    }
}

class Dog extends Animal {
    bow() {
        return 'bow-wow';
    }

}

const cat = new Animal('cat');
console.log(cat.say());
console.log(Animal.isNamed(cat));

const none = new Animal();
console.log(none.say());
console.log(Animal.isNamed(none));

const dog = new Dog('chiwawa');
console.log(dog.say());
console.log(dog.bow());
console.log(Dog.isNamed(dog));
