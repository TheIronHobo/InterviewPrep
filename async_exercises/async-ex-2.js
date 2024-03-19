function pizzaDough() {
  return Promise.resolve({
    sauce: [],
    cheeses: [],
    toppings: [],
  });
}

function addSauce(pizza, sauceType) {
  return new Promise((resolve) => {
    for (let i = 0; i < 1000000000; i++) {
      // making sauces
    }
    pizza.sauce.push(sauceType);
    resolve(pizza);
  });
}

function addCheese(pizza, cheeseType) {
    return new Promise((resolve) => {
      for (let i = 0; i < 1000000000; i++) {
        // getting cheese
      }
      pizza.cheeses.push(cheeseType);
      resolve(pizza);
    });
  }
  

function addTopping(pizza, topping) {
  return new Promise((resolve) => {
    for (let i = 0; i < 1000000000; i++) {
      // getting toppings
    }
    pizza.toppings.push(topping);
    resolve(pizza);
  });
}

function makePizza(callback) {
  return pizzaDough()
    .then((pizza) => addSauce(pizza, "tomato"))
    .then((pizza) => addCheese(pizza, 'cheddar'))
    .then((pizza) => addCheese(pizza, 'mozzerella'))
    .then((pizza) => addTopping(pizza, "pepperoni"))
    .then((pizza) => addTopping(pizza, "anchovies"))
    .then((pizza) => addTopping(pizza, "goblins"))
    .then((pizza) => callback(pizza));
}

makePizza(console.log);

// Output:
// {
//     sauce: [ 'tomato', 'alfredo' ],       
//     toppings: [ 'pepperoni', 'anchovies' ]
// }
