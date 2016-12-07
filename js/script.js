
// Name: Connor McGrory
// Email: Connor_McGrory@student.uml.edu
// Date: December 6, 2016
// For: GUI Programming I, UMass Lowell
// Assignement No. 9


$( document ).ready(function() {
  var numOfTiles = 7;
  var scores = [0, 0, 0, 0, 0, 0, 0];
  var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Blank"];
  var freq = [9, 2, 2, 4, 12, 2, 3, 2, 9, 1, 1, 4, 2, 6, 8, 2, 1, 6, 4, 6, 4, 2, 2, 1, 2, 1, 2];
  var score = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10, 0];

  // This for loop creates the empty tiles where the user can place letter.
  for(var i = 0; i < numOfTiles; i++) {
    bonus = "";
    if(i == 1 || i == 5) bonus = "Bonus";
    $('#board').append('<img value=' + i + ' id="droppable' + i + '" bonus=' + (bonus === "Bonus" ? 2 : 1) + ' src="images/ScrabbleBoard' + bonus + '.jpg" alt="Tile">');
    $("#droppable" + i).droppable({
      drop: function( event, ui ) {
        scores[$(this).attr('value')] = $(this).attr('bonus') * getLetterScore($(ui.draggable).attr('id'));
        console.log($(ui.draggable).attr('id') + " " + scores[$(this).attr('value')] + "  index: " + $(this).attr('value'));
      },
      out: function( event, ui ) {
        scores[$(this).attr('value')] = 0;
      }
    });

  }

  // This for loop grabs 7 letters from the "bag" and displays them to the user.
  for(var i = 0; i < 7; i++) {
    var letter = getRandomLetter();
    $('#myLetters').prepend('<img class="letter" id="' + letter + '" src="images/Scrabble_Tile_' + letter + '.jpg" />');
    $('#' + letter).draggable({ snap: "#board img" });
  }

  // This will update the word score when clicked.
  $("#scoreButton").click(function(e) {
    $("p").text(getWordScore());
  });


  // This function finds a letter in the "letters" array, and then finds its
  // cooresponding score value in its respective array.
  function getLetterScore(letter) {
    console.log("here we go");
    for(var i = 0; i < letters.length; i++) {
      console.log("letter: " + (letters[i]) + " " + score[i]);
      if(letters[i] === letter) return score[i];
    }
    return -1;
  }

  // This function sums all current scores for all tiles.  (To get a word score.)
  function getWordScore() {
    tempScore = 0;
    for(var i = 0; i < numOfTiles; i++) {
      tempScore += scores[i];
    }
    return tempScore;
  }

  // To get a random letter, I used a Cumalitive Distribution Frequency (CDF) to
  // accurately represent the frequencies of each letter.
  function getRandomLetter() {
    var tempFreq = [];
    tempFreq[0] = freq[0];
    for(var i = 1; i < freq.length; i++) {
      tempFreq[i] = freq[i] + tempFreq[i - 1];
    }
    var val = Math.floor(Math.random() * tempFreq[tempFreq.length-1]);
    for(var i = 0; i < freq.length; i++) {
      if(val < tempFreq[i]) {
        freq[i] = freq[i] - 1;
        return letters[i];
      }
    }
  }
  
});
