'use strict';
var selectField = document.getElementById('passphrase_select');
var separatorField = document.getElementById('passphrase_separator');
var passwordField = document.getElementById('passphrase');
var button = document.querySelector('.btn-generate');

// Cryptographic replacement for Math.random()
function randomNumberBetweenZeroAndOne() {
  var crypto = window.crypto || window.msCrypto;
  return crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
}

function generatePassword(numberOfWords, separator) {
  numberOfWords = parseInt(numberOfWords);

  // Empty array to be filled with wordlist
  var generatedPasswordArray = [];


  // Grab a random word, push it to the password array
  for (var i = 0; i < numberOfWords; i++) {
      var index = Math.floor(randomNumberBetweenZeroAndOne() * wordlist.length)
      generatedPasswordArray.push(wordlist[index]);
  }

  return generatedPasswordArray.join(separator);
}

function setStyleFromWordNumber(passwordField, numberOfWords) {
  var baseSize = '35';
  var newSize = baseSize * (4/numberOfWords);
  passwordField.setAttribute('style', 'font-size: ' + newSize + 'px;');
}

function showPassphrase(value) {
  passwordField.innerHTML = value;
}

function generateNewPassphrase() {
  var numberOfWords = selectField.options[selectField.selectedIndex].value;
  var separatorName = separatorField.options[separatorField.selectedIndex].value;
  var separator = ' ';
  if (separatorName === 'dashes') {
    separator = '-';
  }
  showPassphrase(generatePassword(numberOfWords, separator));
}

// Initially run it upon load
generateNewPassphrase();

// Listen for a button click
button.addEventListener('click', generateNewPassphrase);
