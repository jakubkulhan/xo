var XO = window.XO || {};

XO.Model = function (rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.board = [];

    for (var i = 0; i < this.rows; ++i) {
        this.board.push([]);
    }

    this.myColor = this.opponentColor = this.lastMoveColor = undefined;
};

XO.Model.prototype.reset = function (myColor) {
    for (var i = 0; i < this.rows; ++i) {
        this.board[i].length = 0;
    }

    this.myColor = myColor;
    this.opponentColor = myColor === XO.Model.X ? XO.Model.O : XO.Model.X;
    this.lastMoveColor = XO.Model.O;
};


XO.Model.prototype.checkWin = function (color) {
    var relatives = [ [0, 1], [1, 1], [1, 0], [1, -1] ];

    for (var i = 0; i < this.rows; ++i) {
        for (var j = 0; j < this.cols; ++j) {
            if (this.board[i][j] !== color) {
                continue;
            }

            for (var r = 0; r < relatives.length; ++r) {
                var relative = relatives[r], k = i, l = j, inARow = 0;

                while (k < this.rows && l < this.cols && this.board[k][l] === color) {
                    ++inARow;
                    k += relative[0];
                    l += relative[1];
                }

                if (inARow > 4) {
                    return {
                        from: { row: i, col: j },
                        to: { row: k - relative[0], col: l - relative[1] }
                    };
                }
            }
        }
    }

    return null;
};

XO.Model.X = 'X';
XO.Model.O = 'O';
