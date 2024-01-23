class Group {
    constructor() {
        this.set = [];
    }

    has(item) {
        return this.set.includes(item) ? true : false;
    }

    add(item) {
        if (!this.has(item)) {
            this.set.push(item);
        } else {
            console.log(`Set already includes item '${item}'`);
        }
    }

    delete(item) {
        if (this.has(item)) {
            this.set.splice(this.set.findIndex(j => j === item), 1);
        }
    }

    display() {
        console.log(JSON.stringify(this.set));
    }

}

let test =[1,2,3,4,'a'];

let testGroup = new Group();

for (element of test) {
    testGroup.add(element);
}

testGroup.display();

testGroup.add('6');

testGroup.display();

testGroup.add('6');

testGroup.delete(2);

testGroup.display();
