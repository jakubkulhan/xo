var XO = window.XO || {};
XO.UI = XO.UI || {};

XO.UI.Paper = function (config) {
    var stage = config.stage,
        backgroundImage = config.backgroundImage,
        a = config.squareSideLength,
        onGridClick = config.onGridClick || function () {};

    delete config.stage;
    delete config.backgroundImage;
    delete config.squareSideLength;
    delete config.onGridClick;

    var paper = new Kinetic.Layer(config);

    var background = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: stage.getWidth(),
        height: stage.getHeight(),
        fillPatternImage: backgroundImage
    });

    paper.add(background);

    var grid = new Kinetic.Shape({
        drawFunc: function (canvas) {
            var ctx = canvas.getContext();

            ctx.beginPath();

            for (var x = a; x < canvas.width; x += a) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
            }

            for (var y = a; y < canvas.height; y += a) {
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
            }

            ctx.closePath();

            canvas.stroke(this);
        },

        stroke: '#79E2F7',
        strokeWidth: 1
    });

    paper.add(grid);

    paper.on('click', function () {
        var mousePosition = stage.getMousePosition();
        onGridClick(Math.floor(mousePosition.y / a), Math.floor(mousePosition.x / a));
    });

    return paper;
};
