var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};
function isValidMove(board, row, col, num) {
    for (let k = 0; k < 9; ++k) {
        if (board[row][k] === num || board[k][col] === num) {
            return false;
        }
    }

    const startRow = 3 * Math.floor(row / 3);
    const startCol = 3 * Math.floor(col / 3);
    for (let r = startRow; r < startRow + 3; ++r) {
        for (let c = startCol; c < startCol + 3; ++c) {
            if (board[r][c] === num) {
                return false;
            }
        }
    }

    return true;
}


function SudokuSolver(board, row, col, n) {
	if (row === n) {
        FillBoard(board)
        return true;
    }

    if (col === n) {
        // Move to the next row
        return SudokuSolver(board, row + 1, 0, n);
    }

    if (board[row][col] !== 0) {
        // Cell already filled; move to the next column
        return SudokuSolver(board, row, col + 1, n);
    }

    for (let num = 1; num <= 9; ++num) {
        if (isValidMove(board, row, col, num)) {
            board[row][col] = num;
            if (SudokuSolver(board, row, col + 1, n)) {
                return true;
            }
            board[row][col] = 0; // Backtrack
        }
    }

    return false; 



}
