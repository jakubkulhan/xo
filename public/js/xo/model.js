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

XO.Model.X = 'X';
XO.Model.O = 'O';
