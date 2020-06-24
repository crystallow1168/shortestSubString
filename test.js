import { shortestSubString } from "./operations.js";
import assert from "assert";

describe('testing shortestSubString function', () => {

  it('should return shortest substring that contains all the words in the list', () => {
    assert.equal(shortestSubString(["cat", "dog", "chased"], "My cat was missing today. I hope she comes back. She was chased by the dog next door. I love my cat"), "chased by the dog next door. I love my cat");
  });

  it('should return shortest substring that contains all the words in the list including escape characters (ex: .?!@#$) ', () => {
    assert.equal(shortestSubString(["cat", "dog", "chased"], "My cat was missing today. I hope she comes back. She was chased by the dog. next door. I love my cat"), "chased by the dog. next door. I love my cat");
  });

  it('should return shortest substring that contains all the words in the list without extra characters (ex: the word "cattle"is not included ) ', () => {
    assert.equal(shortestSubString(["cat", "dog", "chased"], "My cat was missing today. I hope she comes back. She was chased by the dog. next door. I love my cattle"), "cat was missing today. I hope she comes back. She was chased by the dog.");
  });

  it('should return "NONE" when string is empty', () => {
    assert.equal(shortestSubString(["cat", "dog", "chased"], ""), "NONE");
  });

  it('should return "NONE" when all or some of the words in the list are not found', () => {
    assert.equal(shortestSubString(["cat", "dog", "chased"], "Mary has a little lamb, little lamb, little lamb"), "NONE");
  });

});

