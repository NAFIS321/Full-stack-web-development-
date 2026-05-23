
import emojiPedia from './emojiPedia';

const newEnoji =emojiPedia.map(function (emojiEntry){
    return emojiEntry.meaning.substring(1,100);
})

console.log(newEoni);




//var numbers = [3, 56, 2, 48, 5];

//Map -Create a new array by doing something with each item in an array.

// function double(x) {
//return x * 2;

// const newNumbers = numbers.map(double);

/*var newNumbers = [];

numbers. forEach(function double(x) {
newNumbers.push(x * 2);
});

console.log(newNumbers);                       |     This is Javascript ES6 Arrow function :

const newNumbers = numbers.map(function (x) { |  A alternative way to do it : 
return x * 2;                                 |  const newNumber = numbers.map(x => x*X);
});                                           |
                 

console. log(newNumbers);

//------------------------------------------------------------------------------//
//                                                                              //
//------------------------------------------------------------------------------//

var numbers = [3, 56, 2, 48, 5];
//Filter - Create a new array by keeping the items that return true.

// const newNumbers = numbers.filter(function(num) {    | const newNumbers = numbers.filter(num => num<10);
return num < 10;                                        |
});
var newNumbers = []:
numbers. forEach(function(num) {                
if (num < 10) {                                 
newNumbers.push(num);                           
}
})
console. log(newNumbers);


//------------------------------------------------------------------------------//
//                                                                              //
//------------------------------------------------------------------------------//

var numbers = [3, 56, 2, 48, 5];
//Reduce - Accumułate a vałue by doing something to each item in an array |          Same think but alternative using js ES6 arrow function                   

var newNumber = numbers.reduce(function (accumulator, currentNumber) {   | var newNumber = number.reduce((accumulator , currentNumbmer) =>){return accumulator + currentNumber;}
                          
return accumulator + currentNumber;
})
console. log("accumulator = " + accumulator);  

// var newNumber = 0;
// numbers.forEach(function (currentNumber) {
/1
// 1'
    }

console.log(newNumber);


//------------------------------------------------------------------------------//
//                                                                              //
//------------------------------------------------------------------------------//


//FindIndex - find the index of the first item that matches.
var numbers = [3, 56 2, 48, 5];

//Find - find the first item that matches from an array.

// const newNumber = numbers.find(function (num) {          | const newNumber = numbers.find(num=> num>10)
return num > 10;
})

console.log(newNumber);
*/
















