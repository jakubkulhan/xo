var XO = window.XO || {};

XO.UI = function (config) {
    var model = config.model,
        backgroundImage = config.backgroundImage,
        onGridClick = config.onGridClick || function (row, col) {},
        onOverlayButtonClick = config.onOverlayButtonClick || function () {};

    delete config.model;
    delete config.backgroundImage;
    delete config.onGridClick;
    delete config.onOverlayButtonClick;

    var stage = new Kinetic.Stage(config);

    var squareSideLength = Math.round(Math.min(stage.getHeight() / model.rows, stage.getWidth() / model.cols));

    stage.paper = new XO.UI.Paper({
        stage: stage,
        backgroundImage: backgroundImage,
        squareSideLength: squareSideLength,
        onGridClick: onGridClick
    });

    stage.add(stage.paper);

    stage.squares = new XO.UI.Squares({
        stage: stage,
        model: model,
        squareSideLength: squareSideLength
    });

    stage.add(stage.squares);

    stage.overlay = new XO.UI.Overlay({
        stage: stage,
        onButtonClick: onOverlayButtonClick
    });

    stage.add(stage.overlay);

    return stage;
};
