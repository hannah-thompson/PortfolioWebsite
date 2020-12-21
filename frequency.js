
// this javascript works with the facalc.html and monoA.html pages to manipulate and display user input
// in order to compute frequencies, and do mono-alphabetic sub by key and by random key

// computes the frequency of each letter in the given ciphertext and updates the table on facalc.html accordingly
function computeFrequencies(){
	// get values from ciphertext text box on facalc page
	var x = document.getElementById("ciphertext").value
	
	// remove spaces and makes all uppercase
	x = x.replace(/\s+/g, '')
	x = x.toUpperCase()

	// make into a list, where each value is a char
	let y = []
	y = x.split('')

	// will use to accumulate total number of counted letters
	totalLetters=0;

	// dictionary to track number of each letter
	counts={"A":0, "B":0, "C":0, "D":0, "E":0, "F":0, "G":0, "H":0, "I":0, "J":0, "K":0, "L":0, "M":0, "N":0, "O":0, "P":0, "Q":0, "R":0, "S":0, "T":0, "U":0, "V":0, "W":0, "X":0, "Y":0, "Z":0}

	// go through list of letters, and if the character is one of the letters in our dict, add to it's count
	for (var i = 0; i < y.length; i += 1) {
		letter = y[i];
		if(letter in counts){
			totalLetters++;
			curNum= counts[letter];
			counts[letter] = curNum + 1;}
	}

	// sort dictionary from greatest number of occurances to least
	sortedCounts = sort_dict(counts);

	// start out on row 1
	row=1;

	// accumulator to get cell # and know when to jump to next row
	tracker=0;

	// get table of frequencies from facalc so can add to it
	var freqTable = document.getElementById('freqTable');

	// added in case people press "analyze" with no submission, so not dividing by 0
	if(y.length == 0){
		totalLetters = 1;
	}

	// loops through the now sorted dictionary and updates the table with each frequency of each letter from greatest to least
	for (let k in sortedCounts) {
		if(tracker==13){
			row=3;
			tracker=0;
		}

		// updates letter name
		freqTable.rows[row-1].cells[tracker].innerHTML = k;
		// calculates and updates frequency, rounds to hundreth place
		freqTable.rows[row].cells[tracker].innerHTML = ((((sortedCounts[k])/totalLetters)*100).toFixed(2));
		tracker++;
	}	
	
}

// function to sort dictionary by value
function sort_dict(dict) {
    items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
    });
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    sorted_dict={}
    $.each(items, function(k, v) {
        updatekey = v[0]
        updatevalue = v[1]
        sorted_dict[updatekey] = updatevalue
    })
    return(sorted_dict)
} 


// function to replace the letters in a given text, by the key given by the user
function replaceLetters(){
	// get values from text box
	var x = document.getElementById("replaceText").value
	
	//  makes all uppercase
	x = x.toUpperCase()

	// make into a list, where each value is a char, keeps spaces and punctuation for later
	text = x.split('')

	// default dictionary, will update based on user input
	alphabet={"A":"A", "B":"B", "C":"C", "D":"D", "E":"E", "F":"F", "G":"G", "H":"H", "I":"I", "J":"J", "K":"K", "L":"L", "M":"M", "N":"N", "O":"O", "P":"P", "Q":"Q", "R":"R", "S":"S", "T":"T", "U":"U", "V":"V", "W":"W", "X":"X", "Y":"Y", "Z":"Z"}

	// loop through alphabet
	for (let k in alphabet) {
		// get current letter in loop
		curLet = k;

		// if user put an entry for said letter, update to that entry
		if(document.getElementById(curLet) != null){
			newLet = document.getElementById(curLet).value;
			capLet = newLet.toUpperCase();
			// only takes in letter, leaves all punctuation alone
			if(capLet in alphabet){
				lowLet = capLet.toLowerCase();
				alphabet[k] = lowLet;
			}
		}	
	}	

	// set new string to empty, will add to it
	newString = "";

	// loop through given text, replace the letters with their dictionary value, and add to string
	for (var i = 0; i < text.length; i += 1) {
		letter = text[i];
		capLetter = letter.toUpperCase();
		if(capLetter in alphabet){
			letter=alphabet[capLetter];}
		newString+=letter;
	}

	// set value of results to created string
	document.getElementById("results").value = newString;

	// update the key with the key you used to encrypt
	// will update row one, tracker is cell number
	row=1;
	tracker=0;

	// get the key table from monoA.html
	var keyTable = document.getElementById('resultKey');

	// update key based on generated dictionary
	for (let k in alphabet) {
		keyTable.rows[row].cells[tracker].innerHTML = alphabet[k];
		tracker++;
	}		

}


// function to replace letters in text based on randomly generated key
function randomReplace(){
	// get values from text box
	var x = document.getElementById("replaceText").value
	
	//  makes all uppercase
	x = x.toUpperCase()

	// make into a list, where each value is a char
	text = x.split('')

	// make array of alphabet letters and randomly shuffle it
	alphabetArr=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
	shuffleArray(alphabetArr);

	// dictionary of default alphabet mappings
	alphabet={"A":"A", "B":"B", "C":"C", "D":"D", "E":"E", "F":"F", "G":"G", "H":"H", "I":"I", "J":"J", "K":"K", "L":"L", "M":"M", "N":"N", "O":"O", "P":"P", "Q":"Q", "R":"R", "S":"S", "T":"T", "U":"U", "V":"V", "W":"W", "X":"X", "Y":"Y", "Z":"Z"}

	// track number of times through loop
	tracker=0;

	// change dictionary values to randomly shuffled list of alphabetical letters
	for (let k in alphabet) {
		alphabet[k] = alphabetArr[tracker];
		tracker++;
	}	
	
	// empty string to add to for results
	newString = "";

	// loop through text and replace each letter with dictionary value
	for (var i = 0; i < text.length; i += 1) {
		letter = text[i];
		capLetter = letter.toUpperCase();
		// only takes in letter, leaves all punctuation alone
		if(capLetter in alphabet){
			letter=alphabet[capLetter];}
		newString+=letter;
	}

	// updates the results box with encrypted string
	document.getElementById("results").value = newString;

	// update the key with the key you used to encrypt
	// will update row one, tracker is cell number
	row=1;
	tracker=0;

	// get the key table from monoA.html
	var keyTable = document.getElementById('resultKey');

	// update key based on generated dictionary
	for (let k in alphabet) {
		keyTable.rows[row].cells[tracker].innerHTML = alphabet[k];
		tracker++;
	}		
}


// randomly shuffles the values in an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}







