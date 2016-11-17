

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
    var playerAction = new STSEngine.Example.ClientAction();
    var client = new STSEngine.Example.WebSocketGameClient(socket, sid, playerAction);
    client.setOnConnected(onClientConnected);


    var content = document.getElementById("content");

    var world = client.getEngine().getWorld();
    world.getServiceList();

    var view = new STSEngine.Example.View(<HTMLDivElement>content, world);
    function onClientConnected(client: STSEngine.IWebSocketGameClient) {

        /*var render = Matter.Render.create({
            element: content,
            engine: world.getServiceList().getMatterEngine(),
            options: <any>{
                width: 800,
                height: 600,
                wireframeBackground: '#222',
                hasBounds: false,
                enabled: true,
                wireframes: true,
                showSleeping: true,
                showDebug: true,
                showBroadphase: true,
                showBounds: true,
                showVelocity: true,
                showCollisions: true,
                showSeparations: true,
                showAxes: true,
                showPositions: true,
                showAngleIndicator: true,
                showIds: true,
                showShadows: true,
                showVertexNumbers: true,
                showConvexHulls: true,
                showInternalEdges: true,
                showMousePosition: false
            }
            
        });

        Matter.Render.run(render);*/


        view.setClientId(client.getClientId());
        view.start();

        setInterval(updateScore, 500);
    }

    let scoreDiv = document.getElementById("score");

    function updateScore() {
        var clientList = world.getServiceList().getClientListService().getIterator();
        let str = '';
        for (let client of clientList) {
            if (client instanceof STSEngine.Example.ClientActive) {
                str += client.getName() + " (" + client.getId() + ") " + client.getScore() + "<br>";
            }
        }
        /*
        var itemList = world.getServiceList().getItemListService().getIterator();

        for (let item of itemList) {
            str += item.getId() + " (" + item.getBody().position.x + "; " + item.getBody().position.y + ") " + item.getBody().speed + "<br>";
            

        }*/

        scoreDiv.innerHTML = str;
    }

    var world = client.getEngine().getWorld();
    var objectListService = world.getServiceList().getItemListService();

    var up: boolean, down: boolean, left: boolean, right: boolean, fire: boolean;

    function getPlayerObjectId() {
        var o = objectListService.getFirst(o => (<STSEngine.Example.ItemTank>(<any>o)).getClientId() == client.getClientId());
        return o.getId();
    }

    function keyDownHandler(e: any) {
        var playerObjectId = getPlayerObjectId();

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
        else if (e.keyCode == 32) {
            if (!fire) {
                playerAction.fire(playerObjectId);
                fire = true;
            }
        }
    }
    function keyUpHandler(e: any) {
        var playerObjectId = getPlayerObjectId();
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
        else if (e.keyCode == 32) {
            fire = false;
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
