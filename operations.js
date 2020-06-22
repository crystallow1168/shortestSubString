// Given a list of words (it could be any length) and a string of text. 
// Find the shortest substring that contains all the words in the list.

// For example - given a list [cat, dog, chased] and the string. 
// Input: "My cat was missing today. I hope she comes back. She was chased by the dog next door. I love my cat" 
// Output: "chased by the dog next door. I love my cat"


export const shortestSubString = (list, str) => {
  const dictionary = {};
  let minLength = [Infinity]
  const words = str.toLowerCase().split(" ");
  list.join("!").toLowerCase().split("!");

  for (let i = 0; i < list.length; i++) {
    dictionary[list[i]] = true;
  }

  for (let i = 0; i < words.length; i ++) {
    const cur = words[i];

    if (dictionary[cur] === true) { 
      const lengthOfCurString = lengthOfString(list, i, words);

      if ( lengthOfCurString[0] < minLength[0]) {
        minLength = lengthOfCurString;
      }
    }
  }

  if (minLength[0] === Infinity) {
    return "NONE";
  }
  return str.split(" ").slice(minLength[1], minLength[2]).join(" ");
}

const lengthOfString = (list, startIdx, sentence) => {
  const temp = [...list];
  
  for (let j = startIdx; j < sentence.length; j ++) {
    const cur = sentence[j];
    const idx = list.indexOf(cur);
    
    if (idx > -1) {
      temp.splice(idx, 1);

      if (temp.length < 1) {
        const endIdx = j + 1;
        const subString = sentence.slice(startIdx, endIdx).join(" ");
        return [subString.length, startIdx, endIdx];
      }
    }
  }
  return [Infinity];
}

console.log(shortestSubString(["cat", "dog", "chased"], ""))
