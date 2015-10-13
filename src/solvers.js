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

  // loop through each row
  var checker = function(column) {

    if ( n === 0 ){
      return;
    }

    solution.togglePiece(0, column);
    counter++;
    
    for ( var row = 1; row < n; row++) {
      
      if ( counter === n ) {
        break;
      }

      // debugger;
      
      for ( var col = 0; col < n; col++) {
        debugger;
        solution.togglePiece(row, col);        
        if ( !solution.hasRowConflictAt(row) && !solution.hasColConflictAt(col) && !solution.hasMajorDiagonalConflictAt(col - row ) && !solution.hasMinorDiagonalConflictAt(col + row  ) ) {
          counter++;
          break;
        } else {
          solution.togglePiece(row, col);
        }
      } // end inner for loop

      if ( counter < (row + 1) ) {
        counter = 0;
        solution = new Board({n: n});
        column += 1;
        checker(column);
      }

    }// end outer for loop 
  }; 

  // TEMP TEST FOR n6
  checker(3);
  
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
