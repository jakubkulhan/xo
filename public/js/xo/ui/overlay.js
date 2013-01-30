var XO = window.XO || {};
XO.UI = XO.UI || {};

XO.UI.Overlay = function (config) {
    var stage = config.stage,
        onButtonClick = config.onButtonClick;

    delete config.stage;
    delete config.onButtonClick;

    var overlay = new Kinetic.Layer(config);

    var background = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: stage.getWidth(),
        height: stage.getHeight(),
        fill: 'black',
        opacity: 0.5
    });

    overlay.add(background);

    var text = new Kinetic.Text({
        x: stage.getWidth() / 2,
        y: stage.getHeight() / 5 * 1,
        fontFamily: 'Trebuchet MS',
        fontSize: 40,
        fill: 'white',
        text: ''
    });

    overlay.add(text);

    var button = new Kinetic.Group({
        x: stage.getWidth() / 2,
        y: stage.getHeight() / 5 * 3
    });

    button.add(new Kinetic.Circle({
        x: 0,
        y: 0,
        radius: 60,
        fill: 'red'
    }));

    var buttonText = new Kinetic.Text({
        x: 0,
        y: 0,
        fontFamily: 'Trebuchet MS',
        fontSize: 20,
        fill: 'white',
        text: ''
    });

    button.add(buttonText);

    button.on('click', onButtonClick);

    overlay.add(button);

    function centerText(text) {
        text.setOffset({
            x: text.getWidth() / 2,
            y: text.getHeight() / 2
        });
    }

    overlay.setText = function (s) {
        text.setText(s);
        centerText(text);
        overlay.draw();
    };

    overlay.showText = function (callback) {
        text.setVisible(true);
        overlay.draw();
        if (callback) callback();
    };

    overlay.hideText = function (callback) {
        text.setVisible(false);
        overlay.draw();
        if (callback) callback();
    };

    overlay.setButtonText = function (s) {
        buttonText.setText(s);
        centerText(buttonText);
        overlay.draw();
    };

    overlay.showButton = function (callback) {
        button.setVisible(true);
        overlay.draw();
        if (callback) callback();
    };

    overlay.hideButton = function (callback) {
        button.setVisible(false);
        overlay.draw();
        if (callback) callback();
    };

    overlay.show = function (callback) {
        overlay.transitionTo({
            x: 0,
            duration: 1,
            easing: 'ease-in-out',
            callback: callback
        });
    };

    overlay.hide = function (callback) {
        overlay.transitionTo({
            x: stage.getWidth(),
            duration: 1,
            easing: 'ease-in-out',
            callback: callback
        });
    };

    return overlay;
};
