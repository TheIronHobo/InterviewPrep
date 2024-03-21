let networkDictionary = {
    HANGAR2: '55555',
};

/**
 * Simulates wifi access point w/ security flaw
 * @param {*} networkID 
 * @param {*} password 
 * @returns 
 */
function joinWifi(networkID, password) {
    let promise = new Promise((resolve, reject) => {
        const correctPassword = networkDictionary[networkID];

        for (let i = 0; i < Math.min(password.length, correctPassword.length); i++) {
            if (password[i] != correctPassword[i]) {
                reject("Rejected");
                return;
            }
        }

        if (password === correctPassword) {
            resolve("Authenticated");
            return;
        }
    });

    return withTimeout(promise, 20);
}

/**
 * Eloquent JS Chapter 11
 * Exploits Wifi access point security flaw
 * @param {*} networkID 
 * @returns 
 */
function crackPasscode(networkID) {
    function nextDigit(code, digit) {
      let newCode = code + digit;
      return withTimeout(joinWifi(networkID, newCode), 50)
        .then(() => newCode)
        .catch(failure => {
          if (failure == "Timed out") {
            return nextDigit(newCode, 0);
          } else if (digit < 9) {
            return nextDigit(code, digit + 1);
          } else {
            throw failure;
          }
        });
    }
    return nextDigit("", 0);
  }

  /**
   * Eloquent JS Chapter 11
   * Wraps a promise in a timeout
   * @param {*} promise 
   * @param {*} time 
   * @returns 
   */
function withTimeout(promise, time) {
    return new Promise((resolve, reject) => {
        promise.then(resolve, reject);
        setTimeout(() => reject("Timed out"), time);
    })
}

crackPasscode("HANGAR2").then(console.log);

// -> 55555
