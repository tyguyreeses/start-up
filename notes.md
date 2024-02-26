## Github Notes:

- Can clone from the command line using a url like this: "git clone https://github.com/YOUR_ACCOUNT_HERE/YOUR_PROJECT_HERE"

` Cool stuff `

## AWS Stuff

### Server

- Hosted through Amazon

### Domain
- Linked to existing server with IP address

I ran into a problem earlier when I linked my Domain to my server with its IP address, but I then assigned an elastic IP address to my server. That changed the overall IP address without me knowing. It was a simple fix once I realized that it was connected to the wrong address, but it was an annoying head scratcher.

### Deploying Files

You have to run the `deployFiles.sh` from the directory that contains the files you are deploying every time you want to update the code on the website itself that isn't part of the `live` option in VsCode.

### Responsive Design

- Aside
    `float: right;` - makes it stick to the right side and everything else wraps around it.

- Display
    `None` doesn't render, `block` takes up the entire width, `inline` only takes enough width to render, `flex` allows for different sized columns like a controls tab on the left, `grid` renders into multiple responsive areas.

- Fractional Unit (fr)
    Automatically splits it up into equal divisions

- Grid - `display: grid;`  
    `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) - "fit as many onto the row as you can, minimum size of 300px"`  
- Flex - `display: flex;`  
    `flex-direction: column/row;` - defined in the parent object  
    `flex: 0 80px;` - "don't resize me, always make it 80px"  
    `flex: 1;` - resize it to a fractional unit  
- Media Queries  
```
    @media (orientation: portrait) {
        body {
            flex-direction: column;
        }
    }
```  
    if in portrait mode, make the body render in columns 

## JS

Java Script Arrays have a lot of functions. Here is a [link](https://github.com/webprogramming260/.github/blob/main/profile/javascript/array/array.md) to the class github explaining them.  
Below is an example of how to impletment an "arrow function":  
```
function testAll(input, tester) {
  return input.every(tester);
}

const fa = ["a","aaa","aaaa"]; /* returns false */
const ta = ["aaaa","aaaaaa"]; /* returns true */

console.log(testAll(fa, (i) => i.length > 3));
console.log(testAll(ta, (i) => i.length > 3));
```

## Arrow Functions

arrow functions replace regular function definitions to reduce size and increase readability. They also change the funtion of `this`, but that is an area to explore another day

Examples of converted functions:
```
function add(num1, num2) {
    return num1 + num2;
}

let add = (num1, num2) => num1 + num2;

// add(1,3) would both output 4
```

This is especially useful for functions that require a funciton as an input, like `.sort()` and `.forEach()`. Let's look at `.forEach()` first.

### .forEach()

Without an arrow function, you have to define the function first, then pass it in:
```
const numbers = [1,2,3,4,5];

function increment(num) {
    return ++num;
}

numbers.forEach(increment);
```
You can also use an "anonymous function" to do it in one step, but it's visually clunky and hard to read:
```
numbers.forEach(function(num) {
    return ++num;
});
```

With an arrow function, you can do it all in one step and in one line, and it's very easy to see how it works:
```
numbers.forEach(num => ++num);
```

### .sort() 

`.sort()` works by converting each element in an array to a string, then sorting alphabetically. That doesn't work well for an array of numbers, as it would sort "108" as being "smaller" than "5" since it starts with "1". This is easily fixed with an arrow function:

```
const numbers = [5, 2, 8, 1, 3];

numbers.sort((a, b) => b - a);

// Output: [8, 5, 3, 2, 1]
```
Note that when the function passed into the `.sort()` method returns a negative value, it doesn't swap the values, and when it returns a postive value, it does swap them. To sort in ascending order the arrow function would be `(a,b) => a - b`.

Compare to using an anonymous function:
```
numbers.sort(function(a, b) {
    return b - a;
});
```