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
  var found = false;
  // var answer = new Board({n:n});
  // var answer = [];
  // // var answer = solution.rows();

  var validSpot = function(board, row, col) {
    return (!board.hasRowConflictAt(row) && !board.hasColConflictAt(col) && !board.hasMajorDiagonalConflictAt(col - row) && !board.hasMinorDiagonalConflictAt(col + row));
  };

  var checker = function(startRow) {
    
    if (found) {
      return;
    }

    if ( n === 1) {
      // answer = solution.rows().slice();
      return;
    }

    for( var col = 0; col < n; col++) {

      if (!found) {
        solution.togglePiece(startRow, col);
        if ( validSpot(solution, startRow, col) ) {
          if( (startRow) === (n - 1) ) {
            found = true;
         //    console.log("n: " + n);
         //    console.log("found a solution");
         // //   solution.print();
            // answer = solution.rows().slice();
            break;
          }
          if (startRow < (n-1)){
            checker(startRow + 1);
          }
        }
        if (!found) {
          solution.togglePiece(startRow, col);
        }
      }
    }    
  }; // END CHECKER

  for ( var i = 0; i < n; i++ ) {
    if (!found) {
      solution = new Board({n: n});
      solution.togglePiece(0, i);
      checker(1);
    }
  }

  // clear board if found is false
  if (!found && n > 1) {
    solution = new Board({n:n});
  }

  if( n === 0) {
    return solution.rows();
  }

  // console.log("answer");
  // console.log(answer);
  console.log("solution");
  solution.print();
  return solution.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = new Board({n:n});
  var solutionCount = 0;

  var validSpot = function(board, row, col) {
    return (!board.hasRowConflictAt(row) && !board.hasColConflictAt(col) && !board.hasMajorDiagonalConflictAt(col - row) && !board.hasMinorDiagonalConflictAt(col + row));
  };

  var checker = function(startRow, startColumn) {

    if ( n === 1){
      solutionCount++;
      return;
    }

    for ( var column = 0; column < n; column++) {
      solution.togglePiece(startRow, column);
      if ( validSpot(solution, startRow, column) ) {
        if ( (startRow) === (n - 1) ) {
          var middle;
          if(n%2 === 1) {
            middle = Math.floor(n/2);  
          }
          if( solution.get(0)[middle] === 1 ) {
            solutionCount++;
          } else {
          solutionCount+=2;
          }
        }
        if ( startRow < (n-1)){
          checker(startRow + 1, 0);
        }
      }
      solution.togglePiece(startRow, column);
    }
  };

  for(var firstRowCol = 0; firstRowCol < (n/2); firstRowCol++) {
    solution = new Board({n: n});
    solution.togglePiece(0, firstRowCol);
    checker(1, firstRowCol);
  }

  if ( n === 0 ) {
    solutionCount++;
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


