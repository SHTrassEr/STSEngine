

function createCookie(name, value) {
    let expires = "";

    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "");
}

function getSID(): string {
    let key = "STSEngine.example.SID";
    let sid = readCookie(key);
    if (!sid) {
        sid = (Math.floor(Math.random() * (1000000))).toString();
        createCookie(key, sid);
    }
    return sid;
}

function ready() {
    var sid = getSID();

    var loc = window.location;

    var socket = new WebSocket('ws://' + window.location.hostname + ':62785');
    var playerAction = new STSEngine.Example.Tanks.ClientAction();
    var client = new STSEngine.Example.Tanks.WebSocketGameClient(socket, sid, playerAction);
    client.setOnConnected(onClientConnected);


    var content = document.getElementById("content");

    /*var meter1 = (new FPSMeter(document.getElementById("fps1"), { position: "relative" }));
    var meter2 = (new FPSMeter(document.getElementById("fps2"), { position: "relative" }));*/


    var world = client.getEngine().getWorld();
    var engine = client.getEngine();

/*    engine.beforePhysicsEngineStep().on(() => meter1.tickStart());
    engine.afterPhysicsEngineStep().on(() => meter1.tick());

    engine.beforeStep().on(() => meter2.tickStart());
    engine.afterStep().on(() => meter2.tick());*/

    var view = new STSEngine.Example.Tanks.View(<HTMLDivElement>content, world);
    function onClientConnected(client: STSEngine.Core.IWebSocketGameClient) {

        view.setClientId(client.getClientId());
        view.start();
        view.mouseClick().on(onStageMouseClick);
        view.touchMove().on(onStageTouchMove);
        view.touchEnd().on(onStageTouchEnd);



        /*setInterval(() => {
            world.getAttributeList().setTickLength(50);
            engine.step();
        }, 50);
        */

        

        setInterval(updateScore, 100);
    }

    function onStageMouseClick(p: STSEngine.Example.Tanks.IVector) {
        
        playerAction.fire(getPlayerObject().getId(), p);
    }

    function onStageTouchEnd(p: STSEngine.Example.Tanks.IVector) {
        playerAction.setClientForceVector(getPlayerObject().getId(), new STSEngine.Example.Tanks.Vector(0, 0));
    }

    function onStageTouchMove(p: STSEngine.Example.Tanks.IVector) {

        let o = getPlayerObject();
        /*let v = o.getPosition();

        let f = new STSEngine.Example.Vector(p);

        STSEngine.Example.VectorHelper.substract(f, v);*/


        playerAction.setClientForceVector(o.getId(), p);
    }

    let scoreDiv = document.getElementById("score");

    function updateScore() {
        var clientList = world.getClientListService().getIterator();
        let str = '';
        for (let client of clientList) {
            if (client instanceof STSEngine.Example.Tanks.ClientActive) {
                let name = "";
                if (client.getName()) {
                    name = client.getName();
                }
                str += name + " (" + client.getId() + ") " + client.getScore() + "|";
            }
        }
        /*
        var itemList = world.getServiceList().getItemListService().getIterator();

        for (let item of itemList) {
            str += item.getId() + " (" + item.getBody().position.x + "; " + item.getBody().position.y + ") " + item.getBody().speed + "<br>";
            

        }*/

        var itemList = world.getItemListService().getIterator();
        for (let item of itemList) {
            if (item instanceof STSEngine.Example.Tanks.ItemTank) {
                let v = item.getPosition();
                str += JSON.stringify(v);
            }

        }

        scoreDiv.innerText = str;
    }

    var world = client.getEngine().getWorld();
    var objectListService = world.getItemListService();

    var up: boolean, down: boolean, left: boolean, right: boolean;//, fire: boolean;

    function getPlayerObject() {
        var o = objectListService.getFirst(o => (<STSEngine.Example.Tanks.ItemTank>(<any>o)).getClientId() == client.getClientId());
        return o;
    }

    function keyDownHandler(e: any) {
        var playerObjectId = getPlayerObject().getId();

        if (e.keyCode == 87) {
            if (!up) {
                up = true;
                playerAction.setClientForce(playerObjectId, up, right, down, left);
            }
        }
        else if (e.keyCode == 83) {
            if (!down) {
                down = true;
                playerAction.setClientForce(playerObjectId, up, right, down, left);
            }
        }
        else if (e.keyCode == 68) {
            if (!right) {
                right = true;
                playerAction.setClientForce(playerObjectId, up, right, down, left);
            }
        }
        else if (e.keyCode == 65) {
            if (!left) {
                left = true;
                playerAction.setClientForce(playerObjectId, up, right, down, left);
            }
        }
    }
    function keyUpHandler(e: any) {
        var playerObjectId = getPlayerObject().getId();
        if (e.keyCode == 87) {
            if (up) {
                up = false;
                playerAction.setClientForce(playerObjectId, up, right, down, left);
            }
        }
        else if (e.keyCode == 83) {
            if (down) {
                down = false;
                playerAction.setClientForce(playerObjectId, up, right, down, left);
            }
        }
        else if (e.keyCode == 68) {
            if (right) {
                right = false;
                playerAction.setClientForce(playerObjectId, up, right, down, left);
            }
        }
        else if (e.keyCode == 65) {
            if (left) {
                left = false;
                playerAction.setClientForce(playerObjectId, up, right, down, left);
            }
        }
    }


    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    let nameInput = <HTMLInputElement>(document.getElementById("name-input"));
    nameInput.onchange = (event) => {
        playerAction.changeClientName(client.getClientId(), nameInput.value);

    };

};


document.addEventListener("DOMContentLoaded", ready);
