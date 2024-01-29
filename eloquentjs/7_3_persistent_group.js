class PGroup {
    constructor() {
        this.group = [];
    }

    has(item) {
        return this.group.includes(item) ? true : false;
    }

    add(item) {// this is adding things as strings??
        if (!this.has(item)) {
            let output = new PGroup();

            for (let element in this.group) {
                console.log(typeof element);
                output.group.push(element);
            }
            output.group.push(item);

            return output;
        } else {
            console.log(`Group already includes item '${item}!'`);
            return this;
        }
    }

    delete(item) {
        if (this.has(item)) {
            let output = new PGroup();

            output.group = this.group.filter(j => j !== item)
            
            return output;
        } else {
            console.log(`Group doesn't have '${item}'!`);
            return this;
        }

    }

    static from(inputArray) {
        let output = new PGroup();
        console.log(typeof inputArray[0])
        for (let element of inputArray) {
            output = output.add(element);
        }

        return output;
    }

    display() {
        console.log((this.group));
    }
}

let test = [1, 2, 3];

let testGroup = PGroup.from(test);

console.log("\nOriginal");
testGroup.display();

// console.log("\nAdding '6'");
// testGroup.add('6').display();

// console.log("\nAdding 6");
// testGroup.add(6).display();;

// console.log("\nDelete 2");
// testGroup.display();
// console.log(testGroup.has(2));
// testGroup.delete(2).display();;

// console.log("\nDelete 4");
// testGroup.delete(6).display();;

// console.log("\nDelete 't'");
// testGroup.delete('t').display();;


// console.log("\nTest complete");
