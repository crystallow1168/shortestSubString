// Given a list of words (it could be any length) and a string of text. 
// Find the shortest substring that contains all the words in the list.

// For example - given a list [cat, dog, chased] and the string. 
// Input: "My cat was missing today. I hope she comes back. She was chased by the dog next door. I love my cat" 
// Output: "chased by the dog next door. I love my cat"


export const shortestSubString = (list, str) => {

  //Eliminate edge cases
  if (str.length < 1 || typeof str !== 'string') {
    return "NONE";
  }

  //Convert string to an array
  const words = str.toLowerCase().split(' ');


  //Store list of words into an object
  const dictionary = {};
  list.map(word => dictionary[word] = true);

  //Get the indexes 
  const indices = getAllIndices(dictionary, words);

  //Find the shortest substring
  let minLength = {length: Infinity};


  for (let i = 0; i < indices.length - (list.length - 1); i ++) {
    const curIdx = i;
    const curLength = getLength(curIdx, indices, dictionary, words);

    if (curLength.length < minLength.length) {
      minLength = curLength;
    }
  }
  
  if (minLength.length === Infinity) {
    return "NONE";
  }

  return str.split(' ').slice(minLength.startIdx, minLength.endIdx + 1).join(' ')
}



const getLength = (curIdx, indices, dictionary, words) => {
  const ref = {...dictionary};
  
  for (let j = curIdx; j < indices.length; j ++) {
    const curWord = words[indices[j]].replace(/\W/g, '');

    if (ref[curWord]) {
      delete ref[curWord];
      
      if (Object.keys(ref).length < 1) {
        const startIdx = indices[curIdx];
        const endIdx =indices[j];
        const length = words.slice(startIdx, endIdx + 1).join(" ").length;
        return {startIdx, endIdx, length};
      }
    }
  }
}

const getAllIndices = (dictionary, words) => {
  const arrOfIdx = [];

  for (let i = 0; i < words.length; i ++) {
    const cur = words[i].replace(/\W/g, '');

    if (dictionary[cur]) {
      arrOfIdx.push(i);
    }
  }
  return arrOfIdx;
}


console.log(shortestSubString(["cat", "dog", "chased"], "My cat was missing today. I hope she comes back. She was chased by the dog next door. I love my cat"));
console.log(shortestSubString(["cat", "dog", "chased"], "My cat was missing today. I hope she comes back. She was chased by the dog next door. I love my cat?"));
console.log(shortestSubString(["cat", "dog", "chased"], "My cat was missing today. I hope she comes back. She was chased by the dog next door. I love my cattle"))
console.log(shortestSubString(["cat", "dog", "chased"], ""))
console.log(shortestSubString(["cat", "dog", "chased"], "Mary has a little lamb, little lamb, little lamb"))

