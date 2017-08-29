class Cat {

  constructor(name) {
    this.name = name
  }
  
  meow() {
    return `${this.name} はミャオと鳴きました`;
  }
}

const cat = new Cat('a-tsu');
console.log(cat.meow());
