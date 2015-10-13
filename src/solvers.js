/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});

  var counter = 0;
  //loop through rows
  for ( var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++ ) {
      solution.togglePiece(row, col); 
      if ( !solution.hasRowConflictAt(row) && !solution.hasColConflictAt(col) ) {
          counter++;
          break;
      } else {
          solution.togglePiece(row, col);
      }
    }
  }

  if ( counter === n) {
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
    return solution.rows();
  } else {
    console.log("Didn't work");
  }

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var solutionFinder = function(n) {
      
    // Stop once the matrix is 1 x 1 --> which means you've found a valid solution
    if (n === 1) {
      solutionCount += 1;
      return;
    }

    // Loop through all possible Rook positions in top row and run solution finder on smaller matrix composed of 'safe' slots below
    // Note: All valid solutions for n-rooks will only have one rook on a given "top" row
    for (var col = 0; col < n; col++) {  
      solutionFinder(n - 1);
    }
  };

  solutionFinder(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n:n});
  var counter = 0;


  var validSpot = function(board, row, col) {
    return (!board.hasRowConflictAt(row) && !board.hasColConflictAt(col) && !board.hasMajorDiagonalConflictAt(col - row) && !board.hasMinorDiagonalConflictAt(col + row));
  };

  // loop through each row
  var checker = function(startRow, startColumn) {

    if ( n === 0 ){
      return;
    }

    solution.togglePiece(startRow, startColumn);
    counter++;
    if (counter === n) {
      return;
    }


    // Collect the possible locations in the next row in array PossibleSpotsNextRow
    // for ( var row = startRow + 1; row < n; row++) {
    var possibleSpotsNextRow = [];
    for ( var column = 0; column < n; column++) {
      debugger;
      solution.togglePiece(startRow + 1, column);
      if ( validSpot(solution, startRow + 1, column) ) {
        possibleSpotsNextRow.push(column);
      }
      solution.togglePiece(startRow + 1, column);
    }
    
    if(possibleSpotsNextRow.length === 0) {
      solution.togglePiece(startRow, startColumn);
      counter--;
      return;
    }
    // }

    for (var candidate = 0; candidate < possibleSpotsNextRow.length; candidate++) {
      checker(startRow + 1, possibleSpotsNextRow[candidate]);
    }
  };

  if ( counter < n) {
    for(var firstRowCol = 0; firstRowCol < n; firstRowCol++) {
      solution = new Board({n: n});
      counter = 0;
      checker(0, firstRowCol);
    }
  }
  
  if ( counter === n ) {
    return solution.rows();
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  } else {
    console.log("counter is: " + counter);
    console.log("didn't work");
  }
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


