
function ready() {

    var playerId = Math.floor(Math.random() * (100000));

    var loc = window.location;

    var socket = new WebSocket('ws://' + window.location.hostname + ':62785');
    var playerAction = new STSEngine.Example.PlayerAction(playerId);
    var client = new STSEngine.Example.ExampleWebSocketGameClient(socket, playerAction);

    

    var world = client.getWorld();
    var objectListService = world.getServiceList().getObjectListService();
    var content = document.getElementById("content");
    setInterval(() => {

        var iterator = objectListService.getIterator();
        var objectStatusStr = "";
        for (let o of iterator) {
            let oo = <STSEngine.Example.ObjectPlayer>(<any>o);
            objectStatusStr += "<br/>x: " + oo.getPosition().x + " y:" + oo.getPosition().y;
        }

        var stepNumber = world.getStepNumber();
        content.innerHTML = ("stepNumber: " + stepNumber + objectStatusStr);
    }, 50);


    var up: boolean, down: boolean, left: boolean, right: boolean;

    function getPlayerObjectId() {
        var o = objectListService.getFirst(o => (<STSEngine.Example.ObjectPlayer>(<any>o)).getPlayerId() == playerId);
        return o.getId();
    }

    function keyDownHandler(e: any) {
        var playerObjectId = getPlayerObjectId();

        if (e.keyCode == 87) {
            if (!up) {
                playerAction.startMoveUp(playerObjectId);
                up = true;
            }
        }
        else if (e.keyCode == 83) {
            if (!down) {
                playerAction.startMoveDown(playerObjectId);
                down = true;
            }
        }
        else if (e.keyCode == 68) {
            if (!right) {
                playerAction.startMoveRight(playerObjectId);
                right = true;
            }
        }
        else if (e.keyCode == 65) {
            if (!left) {
                playerAction.startMoveLeft(playerObjectId);
                left = true;
            }
        }
    }
    function keyUpHandler(e: any) {
        var playerObjectId = getPlayerObjectId();
        if (e.keyCode == 87) {
            if (up) {
                playerAction.stopMoveUp(playerObjectId);
                up = false;
            }
        }
        else if (e.keyCode == 83) {
            if (down) {
                playerAction.stopMoveDown(playerObjectId);
                down = false;
            }
        }
        else if (e.keyCode == 68) {
            if (right) {
                playerAction.stopMoveRight(playerObjectId);
                right = false;
            }
            playerAction.stopMoveRight(playerObjectId);
        }
        else if (e.keyCode == 65) {
            if (left) {
                playerAction.stopMoveLeft(playerObjectId);
                left = false;
            }
        }
    }


    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);


   /*
    var socket = new WebSocket('ws://localhost:62785');

    socket.onopen = function () {
        socket.send("test");
    };

    var content = document.getElementById("content");
    
    socket.onmessage = function (message) {
        content.innerHTML = message.data;
    }
    */

};


document.addEventListener("DOMContentLoaded", ready);
