const arr = ["one", "two", "thrre", "three"];
arr.forEach((prop, index) => {
    console.log(index);
    console.log(prop);
    if (prop === "thrre") {
        arr.splice(index, 1);
    }
});
console.log(arr);
