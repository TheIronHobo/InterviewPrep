class Group {
    constructor() {
        this.n = 0;
        this.set = [];
    }

    has(item) {
        return this.set.includes(item) ? true : false;
    }

    add(item) {
        if (!this.has(item)) {
            this.set.push(item);
        } else {
            console.log(`Set already includes item '${item}!'`);
        }
    }

    delete(item) {
        if (this.has(item)) {
            this.set.splice(this.set.findIndex(j => j === item), 1);
        } else {
            console.log(`Set doesn't have '${item}'!`);
        }
    }

    static from(inputArray) {
        let output = new Group();

        for (let element of inputArray) {
            output.add(element);
        }

        return output;
    }

    [Symbol.iterator]() {
        return this;
    }

    next() {
        if (this.n === this.set.length) {
            this.n = 0;
            return {done: true}
        }
        const output ={value: this.set[this.n], done : false};
        this.n++;
        return output;
    }

    display() {
        console.log(JSON.stringify(this.set));
    }
}

let test = [1, 2 ,3 ,4 ,'a'];

let testGroup = Group.from(test);

console.log("\nOriginal");
testGroup.display();

console.log("\nAdding '6'");
testGroup.add('6');
testGroup.display();

console.log("\nAdding '6'");
testGroup.add('6');
testGroup.display();

console.log("\nAdding 6");
testGroup.add(6);
testGroup.display();

console.log("\nDelete 2");
testGroup.delete(2);
testGroup.display();

console.log("\nDelete 6");
testGroup.delete(6);
testGroup.display();

console.log("\nDelete 't'");
testGroup.delete('t');
testGroup.display();

console.log("\nIterator Test");
for(let element of testGroup) {
    console.log(`${element} is having a good day.`)
}

console.log("\nTest complete");
