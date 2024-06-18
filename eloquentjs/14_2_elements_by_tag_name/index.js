function byTagName(node, tagName) {
    const matches = [];

    function searchChildren(node) {
        for (let child of node.children) {
            if (child.nodeName.toLowerCase() === tagName.toLowerCase()) {
                matches.push(child);
            }
            searchChildren(child);
        }
    }

    searchChildren(node);

    return matches;
}

console.log(byTagName(document.body, "h1").length);
// → 1
console.log(byTagName(document.body, "span").length);
// → 3
let para = document.querySelector("p");
console.log(byTagName(para, "span").length);
// → 2
