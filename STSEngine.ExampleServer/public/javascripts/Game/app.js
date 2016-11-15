function createCookie(name, value) {
    let expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    createCookie(name, "");
}
function getSID() {
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
    var playerAction = new STSEngine.Example.PlayerAction();
    var client = new STSEngine.Example.WebSocketGameClient(socket, sid, playerAction);
    client.setOnConnected(onClientConnected);
    var content = document.getElementById("content");
    var world = client.getWorld();
    world.getServiceList();
    var view = new STSEngine.Example.View(content, (world));
    function onClientConnected(client) {
        view.setPlayerId(client.getPlayerId());
        view.start();
        setInterval(updateScore, 1000);
    }
    let scoreDiv = document.getElementById("score");
    function updateScore() {
        var clientList = world.getServiceList().getClientListService().getIterator();
        let str = '';
        for (let client of clientList) {
            if (client instanceof STSEngine.Example.ClientActive) {
                str += client.getId() + " " + client.getScore() + "<br>";
            }
        }
        scoreDiv.innerHTML = str;
    }
    var world = client.getWorld();
    var objectListService = world.getServiceList().getItemListService();
    var up, down, left, right, fire;
    function getPlayerObjectId() {
        var o = objectListService.getFirst(o => o.getPlayerId() == client.getPlayerId());
        return o.getId();
    }
    function keyDownHandler(e) {
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
        else if (e.keyCode == 32) {
            if (!fire) {
                playerAction.fire(playerObjectId);
                fire = true;
            }
        }
    }
    function keyUpHandler(e) {
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
        else if (e.keyCode == 32) {
            fire = false;
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
}
;
document.addEventListener("DOMContentLoaded", ready);
