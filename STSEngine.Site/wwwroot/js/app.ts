
function ready() {
    var settings: Map<string, number | string> = new Map<string, number | string>();
    var worldSettings: STSEngine.IWorldSettings = new STSEngine.WorldSettingsImpl(settings);
    settings.set("moveStepSize", 10);

    var objectListService = new STSEngine.ObjectListServiceImpl();
    var processListService = new STSEngine.ProcessListServiceImpl();
    var commandListService = new STSEngine.CommandListServiceImpl();

    var world: STSEngine.IWorld = new STSEngine.WorldImpl(worldSettings, objectListService, processListService);
    var engine: STSEngine.IEngine = new STSEngine.EngineImpl(world, commandListService);

    var playerAction = new STSEngine.PlayerActionImpl(1, commandListService);

    var gameServer = new STSEngine.GameServerImpl(engine);

    //gameServer.start();


    var registerPlayerAttributeList: STSEngine.IKeyValuePair[] = [];
    registerPlayerAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.NewPlayerId, 1));
    commandListService.createCommand(STSEngine.CommandType.RegisterPlayer, 0, registerPlayerAttributeList);

    
    

    

    /*setInterval(() => {
        var o = objectListService.getObject(1);
        if (o) {
            var stepNumber = world.getStepNumber();
            content.innerHTML = ("stepNumber: " + stepNumber + "<br/>x: " + o.getPosition().getX() + " y:" + o.getPosition().getY());
        }

    }, 50);
    */



    var up: boolean, down: boolean, left: boolean, right: boolean;

    function keyDownHandler(e: any) {

        if (e.keyCode == 87) {
            if (!up) {
                playerAction.startMoveUp(1);
                up = true;
            }
        }
        else if (e.keyCode == 83) {
            if (!down) {
                playerAction.startMoveDown(1);
                down = true;
            }
        }
        else if (e.keyCode == 68) {
            if (!right) {
                playerAction.startMoveRight(1);
                right = true;
            }
        }
        else if (e.keyCode == 65) {
            if (!left) {
                playerAction.startMoveLeft(1);
                left = true;
            }
        }
    }
    function keyUpHandler(e: any) {
        if (e.keyCode == 87) {
            if (up) {
                playerAction.stopMoveUp(1);
                up = false;
            }
        }
        else if (e.keyCode == 83) {
            if (down) {
                playerAction.stopMoveDown(1);
                down = false;
            }
        }
        else if (e.keyCode == 68) {
            if (right) {
                playerAction.stopMoveRight(1);
                right = false;
            }
            playerAction.stopMoveRight(1);
        }
        else if (e.keyCode == 65) {
            if (left) {
                playerAction.stopMoveLeft(1);
                left = false;
            }
        }
    }


    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);



    var socket = new WebSocket('ws://localhost:62785');

    socket.onopen = function () {
        socket.send("test");
    };

    var content = document.getElementById("content");
    
    socket.onmessage = function (message) {
        content.innerHTML = message.data;
    }


};


document.addEventListener("DOMContentLoaded", ready);
