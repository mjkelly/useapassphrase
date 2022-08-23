'use strict';

const selectField = document.getElementById('passphrase_select');
const separatorField = document.getElementById('passphrase_separator');
const passwordField = document.getElementById('passphrase');
const passwordStatsField = document.getElementById('passphrase_stats');
const generateButton = document.getElementById('generate-btn');
const copyButton = document.getElementById('copy-btn');
const equivalentPasswordCharsetSize = 89;

// Cryptographic replacement for Math.random()
function randomNumberBetweenZeroAndOne() {
  var crypto = window.crypto || window.msCrypto;
  return crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
}

// Generate random indexes into the wordlist.
function randomIndexes(num, wordListLength) {
  var output = [];
  for (var i = 0; i < num; i++) {
      var index = Math.floor(randomNumberBetweenZeroAndOne() * wordListLength);
      output.push(index);
  }
  return output;
}

// Returns `numberOfWords` random words, separated by `separator`.
function generatePassword(numberOfWords, separator) {
  var indexes = randomIndexes(numberOfWords, wordlist.length);
  return indexes.map((x) => wordlist[x]).join(separator);
}

function showPassphraseStats(numberOfWords, wordListLength) {
  var entropyPerWord = Math.log2(wordListLength);
  var totalEntropy = numberOfWords * entropyPerWord;
  var equivalentPasswordLen = Math.round(totalEntropy / Math.log2(equivalentPasswordCharsetSize)) 
  passwordStatsField.innerHTML =
    `Using a ${wordListLength}-word list, this passphrase has ${Math.round(totalEntropy)} bits of entropy. That's as strong as a  ${equivalentPasswordLen}-character random password, containing uppercase and lowercase letters, numbers, and symbols.`;
}

function generateNewPassphrase() {
  var numberOfWords = parseInt(selectField.options[selectField.selectedIndex].value);
  var separatorName = separatorField.options[separatorField.selectedIndex].value;
  var separator = ' ';
  if (separatorName === 'dashes') {
    separator = '-';
  } else if (separatorName === 'underscores') {
    separator = '_';
  }
  passwordField.innerHTML = generatePassword(numberOfWords, separator);
  showPassphraseStats(numberOfWords, wordlist.length);
}

function copyPassphrase() {
  navigator.clipboard.writeText(passwordField.innerHTML);
  copyButton.textContent = '✨ Copied!';
  window.setTimeout(() => {
    copyButton.textContent = '📋 Copy'
  }, 1000);
}


generateButton.addEventListener('click', generateNewPassphrase);
copyButton.addEventListener('click', copyPassphrase);

// Initially run it upon load
generateNewPassphrase();