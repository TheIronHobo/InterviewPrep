// takes in an array of promises and returns the result as a promise when all the promises have resolved
// if any of the promises fail we should pass on the failure into the larger promise.
// maybe we should give the first promise a callback to push its result to the result array and

function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    output = [];

    async function iteratePromises() {
        for (let i = 0; i < promises.length; i++) {
          try {
            let promiseResult = await promises[i];
            output.push(promiseResult);
          } catch (e) {
            reject(e);
          }
           
        }
        resolve(output);
    }

    iteratePromises();
  });
}

// // Test code.
// Promise_all([]).then(array => {
//   console.log("This should be []:", array);
// });

// Promise_all([soon(1), soon(2), soon(3)]).then(array => {
//   console.log("This should be [1, 2, 3]:", array);
// });

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
