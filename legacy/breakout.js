const arr =[4, 9, 2, 7, 5];
const length = arr.length;

let product = 1;
let currentValue = 0;
let previousProduct = 0;
for(let i=0; i<length; i++){
    currentValue = arr[i];
    previousProduct = product;
    product = product * currentValue;

    console.log(`iterasi ke `+(i+1));
    console.log(`index ke : `+ i);
    console.log(`nilai saat ini: `+ currentValue);
    console.log(`product yang lama : `+ previousProduct);
    console.log(`product hasil iterasi `+ previousProduct + ` x ` + currentValue + ` = ` + product);
    console.log(`================`);
}

