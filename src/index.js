module.exports = function solveSudoku(matrix) {
	let size = matrix.length;
	let sector = size / 3;

	const SolveSudoku = () => {
		let emptyCell = FindEmptyCell();
		if (emptyCell == null) {
			return true;
		}
		const [x, y] = emptyCell;

		for (let i = 1; i < size + 1; i++) {
			let state = IsValid(x, y, i);
			if (state === true) {
				matrix[x][y] = i;

				let validateSudoku = SolveSudoku();
				if (validateSudoku === true) {
					return true;
				}
				matrix[x][y] = 0;
			}
		}
		return false;
	}

	const FindEmptyCell = () => {
		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				if (matrix[i][j] === 0) {
					return [i, j];
				}
			}
		}
	}

	const IsValid = (x, y, number) => {
		for (let i = 0; i < size; i++) {
			if (matrix[x][i] === number || matrix[i][y] === number) return false;
		}

		const x_box = Math.floor(x / sector) * sector;
		const y_box = Math.floor(y / sector) * sector;

		for (let i = x_box; i < x_box + sector; i++) {
			for (let j = y_box; j < y_box + sector; j++) {
				if (matrix[i][j] === number) return false;
			}
		}
		return true;
	}

	SolveSudoku();
	return matrix;
}
