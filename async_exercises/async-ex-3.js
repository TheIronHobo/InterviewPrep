function addTopping(pizza, topping, callback) {
    pizza.toppings.push(topping);
    callback(pizza);
}

function addCheese(pizza, cheese, callback) {
    pizza.cheeses.push(cheese);
    callback(pizza);
}

function addSauce(pizza, sauce, callback) {
    pizza.sauces.push(sauce);
    callback(pizza);
}

// Callback hell
function makePizza(callback) { 
    let pizza = {
        sauces: [],
        cheeses: [],
        toppings: [],
    }
    addSauce(pizza, 'tomato', pizza => {
        addCheese(pizza, 'cheddar', pizza => {
            addTopping(pizza, 'pepperoni', pizza => {
                addTopping(pizza, 'anchovies', callback);
            })
        });
    });
}

makePizza(console.log);
