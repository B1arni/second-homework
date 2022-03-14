'use strict';

const ERROR_MESSAGE = new Error('Некорректные данные');

function makeObjectDeepCopy(object) {
  const clonedObject = {
    ...object,
  };

  Object.keys(clonedObject).forEach(key => {
    return (clonedObject[key] =
      typeof object[key] === 'object'
        ? makeObjectDeepCopy(object[key])
        : object[key]);
  });

  return clonedObject;
}

function selectFromInterval(array, firstNumber, secondNumber) {
  let resultArray = [];
  let testArray = [];

  function inputValueValidator(inputValue) {
    return typeof inputValue !== 'number';
  }

  if (!Array.isArray(array) || array.some(inputValueValidator)) {
    throw ERROR_MESSAGE;
  }

  if (inputValueValidator(firstNumber) || inputValueValidator(secondNumber)) {
    throw ERROR_MESSAGE;
  }

  function createTestArray(firstValue, lastValue) {
    for (let i = firstValue; i <= lastValue; i++) {
      testArray = [...testArray, i];
    }
    return testArray;
  }

  if (firstNumber < secondNumber) {
    createTestArray(firstNumber, secondNumber);
  } else {
    createTestArray(secondNumber, firstNumber);
  }

  for (let i = 0; i < array.length; i++) {
    if (testArray.includes(array[i])) {
      resultArray = [...resultArray, array[i]];
    }
  }

  return resultArray;
}

const myIterable = {
  from: 1,
  to: 4,

  [Symbol.iterator]() {
    function dataValidator(firstValue, secondValue) {
      return (
        firstValue > secondValue ||
        typeof (firstValue || secondValue) !== 'number'
      );
    }

    if (dataValidator(this.from, this.to)) {
      throw ERROR_MESSAGE;
    } else {
      return {
        current: this.from,
        last: this.to,
        next() {
          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        },
      };
    }
  },
};
