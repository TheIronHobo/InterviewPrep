function deliverCookies() {
    return new Promise(resolve => {
        bakeCookies(cookie => resolve(cookie)); 
    });
}

function bakeCookies(done) {
    for (let i = 0; i < 1000000000; i++) {
        // baking
    }
    let cookieType = '1x batch - chocolate chip cookies';
    done(cookieType);
}

deliverCookies().then(console.log);
console.log("Baking a cake. La la la!");

// Output: 
// Baking a cake. La la la!
// 1x batch - chocolate chip cookies
