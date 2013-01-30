var XO = window.XO || {};
XO.UI = XO.UI || {};

XO.UI.Squares = function (config) {
    var stage = config.stage,
        model = config.model,
        a = config.squareSideLength,
        padding = 4;

    delete config.stage;
    delete config.model;
    delete config.squareSideLength;

    var squares = new Kinetic.Layer(config);

    var xs = new Kinetic.Shape({
        drawFunc: function (canvas) {
            var ctx = canvas.getContext();

            ctx.beginPath();

            for (var i = 0; i < model.rows; ++i) {
                for (var j = 0; j < model.cols; ++j) {
                    if (model.board[i][j] === XO.Model.X) {
                        ctx.moveTo(j * a + padding,     i * a + padding);
                        ctx.lineTo(j * a + a - padding, i * a + a - padding);
                        ctx.moveTo(j * a + padding,     i * a + a - padding);
                        ctx.lineTo(j * a + a - padding, i * a + padding);
                    }
                }
            }

            ctx.closePath();

            canvas.stroke(this);
        },
        stroke: '#FF6666',
        strokeWidth: 3
    });

    squares.add(xs);

    var ys = new Kinetic.Shape({
        drawFunc: function (canvas) {
            var ctx = canvas.getContext();

            ctx.beginPath();

            for (var i = 0; i < model.rows; ++i) {
                for (var j = 0; j < model.cols; ++j) {
                    if (model.board[i][j] === XO.Model.O) {
                        ctx.moveTo(j * a + a - padding, i * a + a/2);
                        ctx.arc(j * a + a/2, i * a + a/2, a/2 - padding, 0, 2*Math.PI, false);
                    }
                }
            }

            ctx.closePath();

            canvas.stroke(this);
        },
        stroke: '#2A8FBD',
        strokeWidth: 3
    });

    squares.add(ys);

    return squares;
};
