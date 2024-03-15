function pizzaDough() {
    return Promise.resolve({
        sauce: [],
        toppings: []
    })
}

function addSauce(pizza, sauceType) {
    return new Promise(resolve => {
        for (let i = 0; i < 1000000000; i++) {
            // making sauces
        }
        pizza.sauce.push(sauceType);
        resolve(pizza);
    })
}

function addTopping(pizza, topping) {
    return new Promise(resolve => {
        for (let i = 0; i < 1000000000; i++) {
            // making toppings
        }
        pizza.toppings.push(topping);
        resolve(pizza);
    })
}

// Its like we wrap something in a promise, the promise resolves into a value, the value then gets scooped into a new function
// then that new function transforms it back into a promise! It bounces down the chain of thens until we're ready to actually do
// something with the value!

pizzaDough().then(pizza => addSauce(pizza, 'tomato'))
            .then(pizza => addSauce(pizza, 'alfredo'))
            .then(pizza => addTopping(pizza, 'pepperoni'))
            .then(pizza => addTopping(pizza, 'anchovies'))
            .then(pizza => console.log(pizza));

pizzaDough().then(pizza => addSauce(pizza, 'tomato'))
            .then(pizza => addTopping(pizza, 'spinach'))
            .then(pizza => addTopping(pizza, 'banana peppers'))
            .then(pizza => console.log(pizza));

// Output:
// { sauce: [ 'tomato' ], toppings: [ 'spinach', 'banana peppers' ] }
// {
//   sauce: [ 'tomato', 'alfredo' ],
//   toppings: [ 'pepperoni', 'anchovies' ]
// }
