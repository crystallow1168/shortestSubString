// Given a list of words (it could be any length) and a string of text. 
// Find the shortest substring that contains all the words in the list.

// For example - given a list [cat, dog, chased] and the string. 
// Input: "My cat was missing today. I hope she comes back. She was chased by the dog next door. I love my cat" 
// Output: "chased by the dog next door. I love my cat"

export const shortestSubString = (list, str) => {

  //Eliminate edge cases
  if (list.length < 1 || str.length < 1 || typeof str !== 'string') return null;
  if (str.length < list.length) return null;
  if (str === list) return str;

  //Convert string to an array
  const words = str.toLowerCase().split(' ');

  //Store list of words into an object
  const dictionary = {};
  list.forEach(word => dictionary[word] = true);

  //Get the indexes 
  const indices = getAllIndices(dictionary, words);

  let minLength = {length: Infinity};

  //iterate the filtered indices
  for (let i = 0; i < indices.length - (list.length - 1); i ++) {
    const curIdx = i;
    const curSubString = subString(curIdx, indices, dictionary, words);

    i = curSubString.nextIdx;

    if (curSubString.length < minLength.length) {
      minLength = curSubString;
    }
  }
  
  if (minLength.length === Infinity) {
    return null;
  }

  return str.split(' ').slice(minLength.startIdx, minLength.endIdx + 1).join(' ');
}

const subString = (curIdx, indices, dictionary, words ) => {
  const ref = {...dictionary};
  const storage = {};

  //Iterate every indices to find substring that contains all the words in the list
  for (let j = curIdx; j < indices.length; j ++) {
    const curWord = words[indices[j]].replace(/\W/g, '');

    storage[curWord]? storage[curWord]++ : storage[curWord] = 1;

    if (ref[curWord]) {
      delete ref[curWord];

      //Find the shortest substring in the substring
      if (Object.keys(ref) < 1) {
        const endIdx = indices[j];
       
        for (let k = curIdx; k <= j; k ++) {
          const curWord = words[indices[k]].replace(/\W/g, '');

          if (storage[curWord] > 1) {
            storage[curWord]--;
          } else {
            const length = words.slice(indices[k], endIdx + 1).join(" ").length;
            return {startIdx: indices[k], endIdx, length, nextIdx: k};
          }
        }
      }
    }
  }

  return {length: Infinity};
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
console.log(shortestSubString(["cat", "dog", "chased"], "My was missing today. I hope she comes back. She was chased by the dog next door. I love my"));



