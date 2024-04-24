function Promise_all(promises) {
  return new Promise((resolve, reject) => {
  
    async function iteratePromises() {
      output = [];
        for (let promise of promises) {
          try {
            output.push(await promise);
          } catch (e) {
            reject(e);
          }
           
        }
        resolve(output);
    }

    iteratePromises();
  });
}

// Test code.
Promise_all([]).then(array => {
  console.log("This should be []:", array);
});

Promise_all([soon(1), soon(2), soon(3)]).then(array => {
  console.log("This should be [1, 2, 3]:", array);
});

Promise_all([soon(1), Promise.reject("X"), soon(3)])
  .then(array => {
    console.log("We should not get here");
  })
  .catch(error => {
    if (error != "X") {
      console.log("Unexpected failure:", error);
    }
  });


function soon(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
