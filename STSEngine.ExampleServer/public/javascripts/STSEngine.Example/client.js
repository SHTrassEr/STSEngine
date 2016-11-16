'use strict';
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class Client extends STSEngine.Client {
        }
        Example.Client = Client;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ClientActive extends Example.Client {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this.attributeScoreId = ++this.lastAttributeId;
                this.setType(STSEngine.ClientType.Active);
            }
            getScore() {
                return this.attributeList.get(this.attributeScoreId, 0);
            }
            setScore(score) {
                this.attributeList.set(this.attributeScoreId, score);
            }
        }
        Example.ClientActive = ClientActive;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var ClientType;
    (function (ClientType) {
        ClientType.Active = ClientType.getNewTypeId();
    })(ClientType = STSEngine.ClientType || (STSEngine.ClientType = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ClientInitializer extends STSEngine.ClientInitializer {
            createByType(type, attr) {
                switch (type) {
                    case STSEngine.ClientType.Active:
                        return this.createActive(attr);
                }
            }
            createActive(attr) {
                return new Example.ClientActive(this.createAttributeList(), attr);
            }
            createAttributeList() {
                return new STSEngine.AttributeListArray();
            }
        }
        Example.ClientInitializer = ClientInitializer;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class Point {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }
        }
        Example.Point = Point;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class Item extends STSEngine.Item {
        }
        Example.Item = Item;
        (function (Item) {
            let lastTypeId = STSEngine.Item.LastTypeId;
        })(Item = Example.Item || (Example.Item = {}));
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ItemRectangle extends Example.Item {
            constructor() {
                super(...arguments);
                this._position = ++this.lastAttributeId;
                this._positionPrecise = ++this.lastAttributeId;
                this._playerId = ++this.lastAttributeId;
                this._minSpeed = ++this.lastAttributeId;
                this._maxSpeed = ++this.lastAttributeId;
                this._size = ++this.lastAttributeId;
                this._moveDirection = ++this.lastAttributeId;
            }
            getPosition(d) {
                if (typeof d == 'number') {
                    return this.attributeList.get(this._position)[d];
                }
                return this.attributeList.get(this._position);
            }
            setPosition(position) {
                this.attributeList.set(this._position, position);
            }
            getPositionPrecise(d) {
                if (typeof d == 'number') {
                    return this.attributeList.get(this._positionPrecise)[d];
                }
                return this.attributeList.get(this._positionPrecise);
            }
            setPositionPrecise(position) {
                this.attributeList.set(this._positionPrecise, position);
                this.setPosition([Math.floor(position[0]), Math.floor(position[1])]);
            }
            getPlayerId() {
                return this.attributeList.get(this._playerId);
            }
            setPlayerId(playerId) {
                this.attributeList.set(this._playerId, playerId);
            }
            getMinSpeed() {
                return this.attributeList.get(this._minSpeed);
            }
            setMinSpeed(speed) {
                this.attributeList.set(this._minSpeed, speed);
            }
            getMaxSpeed() {
                return this.attributeList.get(this._maxSpeed);
            }
            setMaxSpeed(speed) {
                this.attributeList.set(this._maxSpeed, speed);
            }
            getSize(d) {
                if (d) {
                    return this.attributeList.get(this._size)[d];
                }
                return this.attributeList.get(this._size);
            }
            setSize(size) {
                this.attributeList.set(this._size, size);
            }
            getMoveDirection() {
                return this.attributeList.get(this._moveDirection);
            }
            setMoveDirection(direction) {
                this.attributeList.set(this._moveDirection, direction);
            }
        }
        Example.ItemRectangle = ItemRectangle;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ItemBullet extends Example.ItemRectangle {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this.setType(ItemBullet.Type);
            }
        }
        Example.ItemBullet = ItemBullet;
        (function (ItemBullet) {
            ItemBullet.Type = ++Example.Item.LastTypeId;
        })(ItemBullet = Example.ItemBullet || (Example.ItemBullet = {}));
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ItemInitializer extends STSEngine.ItemInitializer {
            constructor(createIdHandler) {
                super(createIdHandler);
            }
            createByType(type, attr) {
                let item = super.createByType(type, attr);
                if (item) {
                    return item;
                }
                switch (type) {
                    case Example.ItemPlayer.Type:
                        return this.createPlayer(attr);
                    case Example.ItemBullet.Type:
                        return this.createBullet(attr);
                }
            }
            createPlayer(attr) {
                var object = new Example.ItemPlayer(this.createAttributeList(), attr);
                this.initId(object);
                return object;
            }
            createBullet(attr) {
                var object = new Example.ItemBullet(this.createAttributeList(), attr);
                this.initId(object);
                return object;
            }
        }
        Example.ItemInitializer = ItemInitializer;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ItemPlayer extends Example.ItemRectangle {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this.setType(ItemPlayer.Type);
            }
        }
        Example.ItemPlayer = ItemPlayer;
        (function (ItemPlayer) {
            ItemPlayer.Type = ++Example.Item.LastTypeId;
        })(ItemPlayer = Example.ItemPlayer || (Example.ItemPlayer = {}));
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class Command extends STSEngine.Command {
        }
        Example.Command = Command;
        (function (Command) {
            let lastTypeId = STSEngine.Command.LastTypeId;
        })(Command = Example.Command || (Example.Command = {}));
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class CommandCreatePlayerObject extends Example.Command {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this._playerId = ++this.lastAttributeId;
                this.setType(CommandCreatePlayerObject.Type);
            }
            getPlayerId() {
                return this.attributeList.get(this._playerId);
            }
            setPlayerId(id) {
                this.attributeList.set(this._playerId, id);
            }
        }
        Example.CommandCreatePlayerObject = CommandCreatePlayerObject;
        (function (CommandCreatePlayerObject) {
            CommandCreatePlayerObject.Type = ++Example.Command.LastTypeId;
        })(CommandCreatePlayerObject = Example.CommandCreatePlayerObject || (Example.CommandCreatePlayerObject = {}));
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class CommandCreatePlayerObjectHandler extends STSEngine.CommandHandler {
            constructor(worldServiceList) {
                super(worldServiceList);
            }
            executeCommand(command) {
                var process = this.worldServiceList.getProcessInitializer().createCreatePlayerObject();
                process.setPlayerId(command.getPlayerId());
                this.startProcess(process);
            }
            isValidCommand(command) {
                return command.getPlayerId() === 0;
            }
            isValidCommandType(command) {
                return command instanceof Example.CommandCreatePlayerObject;
            }
        }
        Example.CommandCreatePlayerObjectHandler = CommandCreatePlayerObjectHandler;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class CommandDispatcher extends STSEngine.CommandDispatcher {
            constructor(worldServiceList) {
                super();
                this.initCommandHandlerList(worldServiceList);
            }
            initCommandHandlerList(worldServiceList) {
                this.commandHandlerList[Example.CommandRegisterPlayer.Type] = new Example.CommandRegisterPlayerHandler(worldServiceList);
                this.commandHandlerList[Example.CommandCreatePlayerObject.Type] = new Example.CommandCreatePlayerObjectHandler(worldServiceList);
                this.commandHandlerList[Example.CommandMoveObjectStart.Type] = new Example.CommandMoveObjectStartHandler(worldServiceList);
                this.commandHandlerList[Example.CommandMoveObjectStop.Type] = new Example.CommandMoveObjectStopHandler(worldServiceList);
                this.commandHandlerList[Example.CommandFire.Type] = new Example.CommandFireHandler(worldServiceList);
            }
        }
        Example.CommandDispatcher = CommandDispatcher;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class CommandFire extends Example.Command {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this._objectId = ++this.lastAttributeId;
                this.setType(CommandFire.Type);
            }
            getObjectId() {
                return this.attributeList.get(this._objectId);
            }
            setObjectId(id) {
                this.attributeList.set(this._objectId, id);
            }
        }
        Example.CommandFire = CommandFire;
        (function (CommandFire) {
            CommandFire.Type = ++Example.Command.LastTypeId;
        })(CommandFire = Example.CommandFire || (Example.CommandFire = {}));
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class CommandFireHandler extends STSEngine.CommandHandler {
            constructor(worldServiceList) {
                super(worldServiceList);
            }
            executeCommand(command) {
                var process = this.worldServiceList.getProcessInitializer().createFire();
                process.setObjectId(command.getObjectId());
                this.startProcess(process);
            }
            isValidCommand(command) {
                let playerId = command.getInitiatorId();
                if (playerId > 0) {
                    let objectId = command.getObjectId();
                    let object = this.worldServiceList.getItemListService().getTyped(objectId, Example.ItemPlayer);
                    if (object) {
                        return (object).getPlayerId() == playerId;
                    }
                }
                return command.getInitiatorId() === 0;
            }
            isValidCommandType(command) {
                return command instanceof Example.CommandFire;
            }
        }
        Example.CommandFireHandler = CommandFireHandler;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class CommandInitializer extends STSEngine.CommandInitializer {
            createByType(type, attr) {
                let command = super.createByType(type, attr);
                if (command) {
                    return command;
                }
                switch (type) {
                    case Example.CommandRegisterPlayer.Type:
                        return this.createRegisterPlayer(attr);
                    case Example.CommandMoveObjectStart.Type:
                        return this.createMoveObjectStart(attr);
                    case Example.CommandMoveObjectStop.Type:
                        return this.createMoveObjectStop(attr);
                    case Example.CommandCreatePlayerObject.Type:
                        return this.createPlayerObject(attr);
                    case Example.CommandFire.Type:
                        return this.createFire(attr);
                }
            }
            createRegisterPlayer(attr) {
                return new Example.CommandRegisterPlayer(this.createAttributeList(), attr);
            }
            createMoveObjectStart(attr) {
                return new Example.CommandMoveObjectStart(this.createAttributeList(), attr);
            }
            createMoveObjectStop(attr) {
                return new Example.CommandMoveObjectStop(this.createAttributeList(), attr);
            }
            createPlayerObject(attr) {
                return new Example.CommandCreatePlayerObject(this.createAttributeList(), attr);
            }
            createFire(attr) {
                return new Example.CommandFire(this.createAttributeList(), attr);
            }
            createAttributeList() {
                return new STSEngine.AttributeListArray();
            }
        }
        Example.CommandInitializer = CommandInitializer;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class CommandMoveObjectStart extends Example.Command {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this._objectId = ++this.lastAttributeId;
                this._moveDirection = ++this.lastAttributeId;
                this.setType(CommandMoveObjectStart.Type);
            }
            getObjectId() {
                return this.attributeList.get(this._objectId);
            }
            setObjectId(id) {
                this.attributeList.set(this._objectId, id);
            }
            getMoveDirection() {
                return this.attributeList.get(this._moveDirection);
            }
            setMoveDirection(direction) {
                this.attributeList.set(this._moveDirection, direction);
            }
        }
        Example.CommandMoveObjectStart = CommandMoveObjectStart;
        (function (CommandMoveObjectStart) {
            CommandMoveObjectStart.Type = ++Example.Command.LastTypeId;
        })(CommandMoveObjectStart = Example.CommandMoveObjectStart || (Example.CommandMoveObjectStart = {}));
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class CommandMoveObjectStartHandler extends STSEngine.CommandHandler {
            constructor(worldServiceList) {
                super(worldServiceList);
            }
            executeCommand(command) {
                var process = this.worldServiceList.getProcessInitializer().createMoveObject();
                process.setObjectId(command.getObjectId());
                process.setMoveDirection(command.getMoveDirection());
                this.startProcess(process);
            }
            isValidCommand(command) {
                let playerId = command.getInitiatorId();
                if (playerId > 0) {
                    let objectId = command.getObjectId();
                    let object = this.worldServiceList.getItemListService().getTyped(objectId, Example.ItemPlayer);
                    if (object) {
                        return (object).getPlayerId() == playerId;
                    }
                }
                return command.getInitiatorId() === 0;
            }
            isValidCommandType(command) {
                return command instanceof Example.CommandMoveObjectStart;
            }
        }
        Example.CommandMoveObjectStartHandler = CommandMoveObjectStartHandler;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class CommandMoveObjectStop extends Example.Command {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this._objectId = ++this.lastAttributeId;
                this._moveDirection = ++this.lastAttributeId;
                this.setType(CommandMoveObjectStop.Type);
            }
            getObjectId() {
                return this.attributeList.get(this._objectId);
            }
            setObjectId(id) {
                this.attributeList.set(this._objectId, id);
            }
            getMoveDirection() {
                return this.attributeList.get(this._moveDirection);
            }
            setMoveDirection(direction) {
                this.attributeList.set(this._moveDirection, direction);
            }
        }
        Example.CommandMoveObjectStop = CommandMoveObjectStop;
        (function (CommandMoveObjectStop) {
            CommandMoveObjectStop.Type = ++Example.Command.LastTypeId;
        })(CommandMoveObjectStop = Example.CommandMoveObjectStop || (Example.CommandMoveObjectStop = {}));
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class CommandMoveObjectStopHandler extends STSEngine.CommandHandler {
            constructor(worldServiceList) {
                super(worldServiceList);
            }
            executeCommand(command) {
                let processListService = this.worldServiceList.getProcessListService();
                let objectId = command.getObjectId();
                let moveDirection = command.getMoveDirection();
                let processList = processListService.getAll(p => ((p instanceof Example.ProcessMoveObject) && p.getObjectId() === objectId) && p.getMoveDirection() === moveDirection);
                for (let process of processList) {
                    this.finishProcess(process);
                }
                return null;
            }
            isValidCommand(command) {
                let playerId = command.getInitiatorId();
                if (playerId > 0) {
                    let objectId = command.getObjectId();
                    let object = this.worldServiceList.getItemListService().getTyped(objectId, Example.ItemPlayer);
                    if (object) {
                        return (object).getPlayerId() == playerId;
                    }
                }
                return command.getInitiatorId() === 0;
            }
            isValidCommandType(command) {
                return command instanceof Example.CommandMoveObjectStop;
            }
        }
        Example.CommandMoveObjectStopHandler = CommandMoveObjectStopHandler;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class CommandRegisterPlayer extends Example.Command {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this._playerId = ++this.lastAttributeId;
                this._playerName = ++this.lastAttributeId;
                this.setType(CommandRegisterPlayer.Type);
            }
            getPlayerId() {
                return this.attributeList.get(this._playerId);
            }
            setPlayerId(id) {
                this.attributeList.set(this._playerId, id);
            }
            getPlayerName() {
                return this.attributeList.get(this._playerName);
            }
            setPlayerName(playerName) {
                this.attributeList.set(this._playerName, playerName);
            }
        }
        Example.CommandRegisterPlayer = CommandRegisterPlayer;
        (function (CommandRegisterPlayer) {
            CommandRegisterPlayer.Type = ++Example.Command.LastTypeId;
        })(CommandRegisterPlayer = Example.CommandRegisterPlayer || (Example.CommandRegisterPlayer = {}));
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class CommandRegisterPlayerHandler extends STSEngine.CommandHandler {
            constructor(worldServiceList) {
                super(worldServiceList);
            }
            executeCommand(command) {
                let client = new Example.ClientActive();
                client.setName(command.getPlayerName());
                client.setId(command.getPlayerId());
                this.worldServiceList.getClientListService().add(client);
                let process = this.worldServiceList.getProcessInitializer().createCreatePlayerObject();
                process.setPlayerId(command.getPlayerId());
                this.startProcess(process);
            }
            isValidCommand(command) {
                let playerId = command.getPlayerId();
                if (command.getInitiatorId() === 0) {
                    var player = this.worldServiceList.getClientListService().getFirst(p => p.getId() == playerId);
                    if (!player) {
                        return true;
                    }
                }
                return false;
            }
            isValidCommandType(command) {
                return command instanceof Example.CommandRegisterPlayer;
            }
        }
        Example.CommandRegisterPlayerHandler = CommandRegisterPlayerHandler;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class CollisionService {
            constructor(worldAttributeList, itemListService, clientListService) {
                this.clientListService = clientListService;
                this.worldAttributeList = worldAttributeList;
                this.itemListService = itemListService;
            }
            processCollision(moveItem, newPosition) {
                if (moveItem instanceof Example.ItemPlayer) {
                    this.processCollisionObjectPlayer(moveItem, newPosition);
                }
                else if (moveItem instanceof Example.ItemBullet) {
                    this.processCollisionObjectBullet(moveItem, newPosition);
                }
            }
            processCollisionObjectPlayer(moveItem, newPosition) {
                this.processCollisionObjectRectangleWorld(moveItem, newPosition);
                let objectList = this.itemListService.getIterator();
                for (var o of objectList) {
                    if (moveItem.getId() != o.getId()) {
                        if (o instanceof Example.ItemPlayer) {
                            this.processCollisionObjectPlayerObjectPlayer(moveItem, newPosition, o);
                        }
                    }
                }
                moveItem.setPositionPrecise(newPosition);
            }
            processCollisionObjectBullet(moveItem, newPosition) {
                if (this.processCollisionObjectRectangleWorld(moveItem, newPosition)) {
                    this.itemListService.remove(moveItem.getId());
                }
                let objectList = this.itemListService.getIterator();
                for (var o of objectList) {
                    if (moveItem.getId() != o.getId()) {
                        if (o instanceof Example.ItemPlayer) {
                            this.processCollisionObjectBulletObjectPlayer(moveItem, newPosition, o);
                        }
                    }
                }
                moveItem.setPositionPrecise(newPosition);
            }
            processCollisionObjectPlayerObjectPlayer(moveItem, newPosition, o) {
                let position = moveItem.getPositionPrecise();
                let oPosition = o.getPositionPrecise();
                let moveItemSize = moveItem.getSize();
                let oSize = o.getSize();
                if (!this.isRectangleObjectCollision(position, moveItemSize, oPosition, oSize)) {
                    if (this.isRectangleObjectCollision(newPosition, moveItemSize, oPosition, oSize)) {
                        if (position[0] < newPosition[0]) {
                            newPosition[0] = oPosition[0] - moveItemSize[0];
                            return true;
                        }
                        else if (position[0] > newPosition[0]) {
                            newPosition[0] = oPosition[0] + oSize[0];
                            return true;
                        }
                        else if (position[1] < newPosition[1]) {
                            newPosition[1] = oPosition[1] - moveItemSize[1];
                            return true;
                        }
                        else if (position[1] > newPosition[1]) {
                            newPosition[1] = oPosition[1] + oSize[1];
                            return true;
                        }
                    }
                }
                return false;
            }
            processCollisionObjectBulletObjectPlayer(moveItem, newPosition, o) {
                let position = moveItem.getPositionPrecise();
                let oPosition = o.getPositionPrecise();
                let moveItemSize = moveItem.getSize();
                let oSize = o.getSize();
                if (!this.isRectangleObjectCollision(position, moveItemSize, oPosition, oSize)) {
                    if (this.isRectangleObjectCollision(newPosition, moveItemSize, oPosition, oSize)) {
                        this.itemListService.remove(moveItem.getId());
                        let playerId = moveItem.getPlayerId();
                        let client = this.clientListService.getTyped(playerId, Example.ClientActive);
                        client.setScore(client.getScore() + 10);
                        return true;
                    }
                }
                return false;
            }
            processCollisionObjectRectangleWorld(moveItem, newPosition) {
                if (newPosition[0] < 0) {
                    newPosition[0] = 0;
                    return true;
                }
                if (newPosition[1] < 0) {
                    newPosition[1] = 0;
                    return true;
                }
                if (newPosition[0] > this.worldAttributeList.getWorldSize()[0] - moveItem.getSize()[0]) {
                    newPosition[0] = this.worldAttributeList.getWorldSize()[0] - moveItem.getSize()[0];
                    return true;
                }
                if (newPosition[1] > this.worldAttributeList.getWorldSize()[1] - moveItem.getSize()[1]) {
                    newPosition[1] = this.worldAttributeList.getWorldSize()[1] - moveItem.getSize()[1];
                    return true;
                }
                return false;
            }
            isRectangleObjectCollision(pos1, size1, pos2, size2) {
                if ((pos2[0] + size2[0] <= pos1[0]) ||
                    (pos2[1] + size2[1] <= pos1[1]) ||
                    (pos2[0] >= pos1[0] + size1[0]) ||
                    (pos2[1] >= pos1[1] + size1[1])) {
                    return false;
                }
                return true;
            }
        }
        Example.CollisionService = CollisionService;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class Process extends STSEngine.Process {
        }
        Example.Process = Process;
        (function (Process) {
            let lastTypeId = STSEngine.Process.LastTypeId;
        })(Process = Example.Process || (Example.Process = {}));
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ProcessCreatePlayerObject extends Example.Process {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this._playerId = ++this.lastAttributeId;
                this.setType(ProcessCreatePlayerObject.Type);
            }
            getPlayerId() {
                return this.attributeList.get(this._playerId);
            }
            setPlayerId(id) {
                this.attributeList.set(this._playerId, id);
            }
        }
        Example.ProcessCreatePlayerObject = ProcessCreatePlayerObject;
        (function (ProcessCreatePlayerObject) {
            ProcessCreatePlayerObject.Type = ++Example.Item.LastTypeId;
        })(ProcessCreatePlayerObject = Example.ProcessCreatePlayerObject || (Example.ProcessCreatePlayerObject = {}));
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ProcessCreatePlayerObjectHandler extends STSEngine.ProcessHandler {
            constructor(worldServiceList) {
                super(worldServiceList);
            }
            initProcess(process) {
                let itemPlayer = this.worldServiceList.getItemInitializer().createPlayer();
                itemPlayer.setPlayerId(process.getPlayerId());
                itemPlayer.setSize([5, 5]);
                itemPlayer.setMoveDirection(Example.MoveDirection.Up);
                itemPlayer.setPositionPrecise([40, 40]);
                itemPlayer.setMaxSpeed(1);
                this.worldServiceList.getItemListService().add(itemPlayer);
                process.setStatus(STSEngine.ProcessStatus.Finished);
            }
        }
        Example.ProcessCreatePlayerObjectHandler = ProcessCreatePlayerObjectHandler;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ProcessDispatcher extends STSEngine.ProcessDispatcher {
            constructor(worldServiceList) {
                super();
                this.initProcessHandlerList(worldServiceList);
            }
            initProcessHandlerList(worldServiceList) {
                this.processHandlerList = [];
                this.processHandlerList[Example.ProcessCreatePlayerObject.Type] = new Example.ProcessCreatePlayerObjectHandler(worldServiceList);
                this.processHandlerList[Example.ProcessMoveObject.Type] = new Example.ProcessMoveObjectHandler(worldServiceList);
                this.processHandlerList[Example.ProcessFire.Type] = new Example.ProcessFireHandler(worldServiceList);
            }
        }
        Example.ProcessDispatcher = ProcessDispatcher;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ProcessFire extends Example.Process {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this._objectId = ++this.lastAttributeId;
                this.setType(ProcessFire.Type);
            }
            getObjectId() {
                return this.attributeList.get(this._objectId);
            }
            setObjectId(id) {
                this.attributeList.set(this._objectId, id);
            }
        }
        Example.ProcessFire = ProcessFire;
        (function (ProcessFire) {
            ProcessFire.Type = ++Example.Item.LastTypeId;
        })(ProcessFire = Example.ProcessFire || (Example.ProcessFire = {}));
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ProcessFireHandler extends STSEngine.ProcessHandler {
            constructor(worldServiceList) {
                super(worldServiceList);
            }
            executeProcess(process) {
                let object = this.worldServiceList.getItemListService().getTyped(process.getObjectId(), Example.ItemPlayer);
                if (object) {
                    this.fire(object);
                }
                process.setStatus(STSEngine.ProcessStatus.Finished);
            }
            fire(object) {
                var bullet = this.worldServiceList.getItemInitializer().createBullet();
                bullet.setPositionPrecise([object.getPosition(0) + (object.getSize()[0] / 2), object.getPosition(1) + (object.getSize()[0] / 2)]);
                bullet.setPlayerId(object.getPlayerId());
                bullet.setMaxSpeed(4);
                bullet.setSize([1, 1]);
                bullet.setMoveDirection(object.getMoveDirection());
                this.worldServiceList.getItemListService().add(bullet);
                var moveProcess = this.worldServiceList.getProcessInitializer().createMoveObject();
                moveProcess.setMoveDirection(object.getMoveDirection());
                moveProcess.setObjectId(bullet.getId());
                this.startProcess(moveProcess);
            }
        }
        Example.ProcessFireHandler = ProcessFireHandler;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ProcessInitializer extends STSEngine.ProcessInitializer {
            constructor(createIdHandler) {
                super(createIdHandler);
            }
            createByType(type, attr) {
                let process = super.createByType(type, attr);
                if (process) {
                    return process;
                }
                switch (type) {
                    case Example.ProcessMoveObject.Type:
                        return this.createMoveObject(attr);
                    case Example.ProcessFire.Type:
                        return this.createFire(attr);
                    case Example.ProcessCreatePlayerObject.Type:
                        return this.createCreatePlayerObject(attr);
                }
            }
            setProcessId(process) {
                if (!process.getId()) {
                    process.setId(this.createId());
                }
            }
            createMoveObject(attr) {
                var process = new Example.ProcessMoveObject(this.createAttributeList(), attr);
                this.setProcessId(process);
                return process;
            }
            createFire(attr) {
                var process = new Example.ProcessFire(this.createAttributeList(), attr);
                this.setProcessId(process);
                return process;
            }
            createCreatePlayerObject(attr) {
                var process = new Example.ProcessCreatePlayerObject(this.createAttributeList(), attr);
                this.setProcessId(process);
                return process;
            }
            createAttributeList() {
                return new STSEngine.AttributeListArray();
            }
        }
        Example.ProcessInitializer = ProcessInitializer;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ProcessMoveObject extends Example.Process {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this._objectId = ++this.lastAttributeId;
                this._moveDirection = ++this.lastAttributeId;
                this.setType(ProcessMoveObject.Type);
            }
            getObjectId() {
                return this.attributeList.get(this._objectId);
            }
            setObjectId(id) {
                this.attributeList.set(this._objectId, id);
            }
            getMoveDirection() {
                return this.attributeList.get(this._moveDirection);
            }
            setMoveDirection(direction) {
                this.attributeList.set(this._moveDirection, direction);
            }
        }
        Example.ProcessMoveObject = ProcessMoveObject;
        (function (ProcessMoveObject) {
            ProcessMoveObject.Type = ++Example.Item.LastTypeId;
        })(ProcessMoveObject = Example.ProcessMoveObject || (Example.ProcessMoveObject = {}));
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ProcessMoveObjectHandler extends STSEngine.ProcessHandler {
            constructor(worldServiceList) {
                super(worldServiceList);
            }
            executeProcess(process) {
                var object = this.worldServiceList.getItemListService().get(process.getObjectId());
                if (object) {
                    let execCount = this.worldServiceList.getWorldAttributeList().getStepNumber() - process.getInitStep();
                    this.moveObject(object, process.getMoveDirection(), execCount);
                }
                else {
                    process.setStatus(STSEngine.ProcessStatus.Finished);
                }
            }
            moveObject(object, direction, execCount) {
                let position = object.getPositionPrecise();
                var speed = object.getMaxSpeed();
                if (execCount < 50) {
                    speed = Math.floor((speed * (execCount + 10) / 20) * 100) / 100;
                }
                else if (execCount >= 50) {
                    speed = speed * 3;
                }
                let newPosition = null;
                switch (direction) {
                    case Example.MoveDirection.Down:
                        newPosition = [position[0], position[1] + speed];
                        break;
                    case Example.MoveDirection.Up:
                        newPosition = [position[0], position[1] - speed];
                        break;
                    case Example.MoveDirection.Left:
                        newPosition = [position[0] - speed, position[1]];
                        break;
                    case Example.MoveDirection.Right:
                        newPosition = [position[0] + speed, position[1]];
                        break;
                    default:
                        throw 'Invalid move direction: ' + direction;
                }
                object.setMoveDirection(direction);
                this.worldServiceList.getCollisionService().processCollision(object, newPosition);
            }
        }
        Example.ProcessMoveObjectHandler = ProcessMoveObjectHandler;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class WorldAttributeList extends STSEngine.WorldAttributeList {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this._worldSize = ++this.lastAttributeId;
                this.setWorldSize([1000, 1000]);
            }
            getWorldSize() {
                return this.attributeList.get(this._worldSize);
            }
            setWorldSize(size) {
                this.attributeList.set(this._worldSize, size);
            }
        }
        Example.WorldAttributeList = WorldAttributeList;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class WorldServiceList {
            constructor(worldAttributeList) {
                this.worldAttributeList = worldAttributeList;
                this.clientInitializer = new Example.ClientInitializer();
                this.itemListService = new STSEngine.ItemListService();
                this.processListService = new STSEngine.ProcessListService();
                this.clientListService = new STSEngine.ClientListService();
                this.collisionService = new Example.CollisionService(this.worldAttributeList, this.itemListService, this.clientListService);
                this.commandInitializer = new Example.CommandInitializer();
                this.objectInitializer = new Example.ItemInitializer(this.getObjectId.bind(this));
                this.processInitializer = new Example.ProcessInitializer(this.getProcessId.bind(this));
                this.commandDispatcher = new Example.CommandDispatcher(this);
                this.processDispatcher = new Example.ProcessDispatcher(this);
            }
            getWorldAttributeList() {
                return this.worldAttributeList;
            }
            getCommandInitializer() {
                return this.commandInitializer;
            }
            getItemInitializer() {
                return this.objectInitializer;
            }
            getProcessInitializer() {
                return this.processInitializer;
            }
            getProcessDispatcher() {
                return this.processDispatcher;
            }
            getCommandDispatcher() {
                return this.commandDispatcher;
            }
            getItemListService() {
                return this.itemListService;
            }
            getProcessListService() {
                return this.processListService;
            }
            getCollisionService() {
                return this.collisionService;
            }
            getClientListService() {
                return this.clientListService;
            }
            getClientInitializer() {
                return this.clientInitializer;
            }
            getObjectId() {
                var id = this.worldAttributeList.getLastObjectId() + 1;
                this.worldAttributeList.setLastObjectId(id);
                return id;
            }
            getProcessId() {
                var id = this.worldAttributeList.getLastProcessId() + 1;
                this.worldAttributeList.setLastProcessId(id);
                return id;
            }
        }
        Example.WorldServiceList = WorldServiceList;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        (function (MoveDirection) {
            MoveDirection[MoveDirection["Unknow"] = 0] = "Unknow";
            MoveDirection[MoveDirection["Up"] = 1] = "Up";
            MoveDirection[MoveDirection["Right"] = 2] = "Right";
            MoveDirection[MoveDirection["Down"] = 3] = "Down";
            MoveDirection[MoveDirection["Left"] = 4] = "Left";
        })(Example.MoveDirection || (Example.MoveDirection = {}));
        var MoveDirection = Example.MoveDirection;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class PlayerAction extends STSEngine.PlayerAction {
            constructor() {
                super();
                this.commandInitializer = new Example.CommandInitializer();
            }
            addCommand(command) {
                this.commandListService.add(command);
                this.onAction();
            }
            startMoveRight(objectId) {
                var command = this.commandInitializer.createMoveObjectStart();
                command.setMoveDirection(Example.MoveDirection.Right);
                command.setObjectId(objectId);
                this.addCommand(command);
            }
            startMoveLeft(objectId) {
                var command = this.commandInitializer.createMoveObjectStart();
                command.setMoveDirection(Example.MoveDirection.Left);
                command.setObjectId(objectId);
                this.addCommand(command);
            }
            startMoveUp(objectId) {
                var command = this.commandInitializer.createMoveObjectStart();
                command.setMoveDirection(Example.MoveDirection.Up);
                command.setObjectId(objectId);
                this.addCommand(command);
            }
            startMoveDown(objectId) {
                var command = this.commandInitializer.createMoveObjectStart();
                command.setMoveDirection(Example.MoveDirection.Down);
                command.setObjectId(objectId);
                this.addCommand(command);
            }
            stopMoveRight(objectId) {
                var command = this.commandInitializer.createMoveObjectStop();
                command.setMoveDirection(Example.MoveDirection.Right);
                command.setObjectId(objectId);
                this.addCommand(command);
            }
            stopMoveLeft(objectId) {
                var command = this.commandInitializer.createMoveObjectStop();
                command.setMoveDirection(Example.MoveDirection.Left);
                command.setObjectId(objectId);
                this.addCommand(command);
            }
            stopMoveUp(objectId) {
                var command = this.commandInitializer.createMoveObjectStop();
                command.setMoveDirection(Example.MoveDirection.Up);
                command.setObjectId(objectId);
                this.addCommand(command);
            }
            stopMoveDown(objectId) {
                var command = this.commandInitializer.createMoveObjectStop();
                command.setMoveDirection(Example.MoveDirection.Down);
                command.setObjectId(objectId);
                this.addCommand(command);
            }
            fire(objectId) {
                var command = this.commandInitializer.createFire();
                command.setObjectId(objectId);
                this.addCommand(command);
            }
        }
        Example.PlayerAction = PlayerAction;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class View extends STSEngine.View {
            constructor(rootElement, world) {
                super(rootElement, world);
                this.cellSize = 8;
                this.width = rootElement.clientWidth;
                this.height = 59 * this.cellSize;
                this.renderer = PIXI.autoDetectRenderer(this.width, this.height);
                this.renderer.roundPixels = true;
                this.rootElement.appendChild(this.renderer.view);
                this.objectMap = new Map();
                this.clientInfoTextMap = new Map();
                this.stage = new PIXI.Container();
                this.grid = this.drawGrid();
                this.worldLimit = this.drawWordLimit();
                this.stage.addChild(this.grid);
                this.stage.addChild(this.worldLimit);
                this.stepNumber = -1;
            }
            getClientInfoText(client) {
                if (!this.clientInfoTextMap.has(client.getId())) {
                    let text = new PIXI.Text();
                    text.style.fill = 0xff1010;
                    text.style.font.fontsize(16);
                    text.width = 100;
                    text.height = 20;
                    text.position.y = text.height * (this.clientInfoTextMap.size + 1);
                    this.stage.addChild(text);
                    this.clientInfoTextMap.set(client.getId(), new PIXI.Text());
                }
                return this.clientInfoTextMap.get(client.getId());
            }
            updateClientInfo(client) {
                let text = this.getClientInfoText(client);
                text.text = client.getId() + " " + client.getScore();
            }
            updateAllClientInfo() {
                for (var client of this.clientListService.getIterator()) {
                    if (client instanceof Example.ClientActive) {
                        this.updateClientInfo(client);
                    }
                }
            }
            drawObjectRectangle(o) {
                let position = o.getPosition();
                let size = o.getSize();
                let cellSize = this.cellSize;
                let objectWidth = Math.floor(size[0]);
                let objectHeight = Math.floor(size[1]);
                var graphics = new PIXI.Graphics();
                if (o.getPlayerId() == this.playerId) {
                    graphics.beginFill(0xFFFF00);
                    graphics.lineStyle(1, 0x0000AA);
                }
                else {
                    graphics.beginFill(0xFFFF00);
                    graphics.lineStyle(1, 0x770000);
                }
                graphics.pivot.x = objectWidth * cellSize / 2;
                graphics.pivot.y = objectHeight * cellSize / 2;
                graphics.drawRect(0, 0, objectWidth * cellSize, objectHeight * cellSize);
                graphics.drawRect((objectWidth - 1) * cellSize / 2, 0, 1 * cellSize, 1 * cellSize);
                graphics.pivot.x = objectWidth * cellSize / 2;
                graphics.pivot.y = objectHeight * cellSize / 2;
                graphics.filters = [new PIXI.filters.BlurFilter()];
                return graphics;
            }
            getObjectSprite(o) {
                var objectSprite = this.objectMap.get(o.getId());
                if (!objectSprite) {
                    objectSprite = this.drawObjectRectangle(o);
                    this.objectMap.set(o.getId(), objectSprite);
                    this.stage.addChild(objectSprite);
                }
                return objectSprite;
            }
            clearStage() {
                for (var id of this.objectMap.keys()) {
                    if (!this.itemListService.has(id)) {
                        var child = this.objectMap.get(id);
                        this.stage.removeChild(child);
                        child.destroy();
                        this.objectMap.delete(id);
                    }
                }
            }
            refresh() {
                let iterator = this.itemListService.getIterator();
                if (this.worldAttributeList.getStepNumber() == this.stepNumber) {
                    return;
                }
                this.stepNumber = this.worldAttributeList.getStepNumber();
                this.clearStage();
                for (let o of iterator) {
                    if (o instanceof Example.ItemRectangle) {
                        let objectSprite = this.getObjectSprite(o);
                        let x = this.getDrawPoint(o.getPosition(0)) + objectSprite.pivot.x;
                        let y = this.getDrawPoint(o.getPosition(1)) + objectSprite.pivot.y;
                        if (o instanceof Example.ItemPlayer && o.getPlayerId() == this.playerId) {
                            this.stage.pivot.set(x - this.width / 2, y - this.height / 2);
                            this.grid.position.set(x - this.width / 2, y - this.height / 2);
                        }
                        (objectSprite.filters[0]).blurX = Math.abs(objectSprite.position.x - x) / 10;
                        (objectSprite.filters[0]).blurY = Math.abs(objectSprite.position.y - y) / 10;
                        objectSprite.position.x = x;
                        objectSprite.position.y = y;
                        switch (o.getMoveDirection()) {
                            case Example.MoveDirection.Up:
                                objectSprite.rotation = 0;
                                break;
                            case Example.MoveDirection.Right:
                                objectSprite.rotation = Math.PI / 2;
                                break;
                            case Example.MoveDirection.Down:
                                objectSprite.rotation = Math.PI;
                                break;
                            case Example.MoveDirection.Left:
                                objectSprite.rotation = Math.PI / 2 * 3;
                                break;
                        }
                        objectSprite.rotation;
                    }
                }
                this.updateAllClientInfo();
                this.renderer.render(this.stage);
            }
            getDrawPoint(p) {
                return Math.floor(p) * this.cellSize;
            }
            drawWordLimit() {
                var graphics = new PIXI.Graphics();
                var size = this.worldAttributeList.getWorldSize();
                graphics.lineStyle(2, 0x000000);
                graphics.drawRect(0, 0, size[0] * this.cellSize, size[1] * this.cellSize);
                return graphics;
            }
            drawGrid() {
                var graphics = new PIXI.Graphics();
                graphics.beginFill(0xFFFFFF);
                graphics.lineStyle(0);
                graphics.drawRect(0, 0, this.width, this.height);
                graphics.lineStyle(1, 0xCCCCCC, 0.5);
                let cellSize = this.cellSize;
                var x = ((this.width) % this.cellSize) / 2;
                var y = ((this.height) % this.cellSize) / 2;
                if (Math.floor(this.width / this.cellSize) % 2 == 0) {
                    x = x - this.cellSize / 2;
                }
                if (Math.floor(this.height / this.cellSize) % 2 == 0) {
                    y = y - this.cellSize / 2;
                }
                while (x < this.width) {
                    graphics.moveTo(x, 0);
                    graphics.lineTo(x, this.height);
                    x += cellSize;
                }
                while (y < this.height) {
                    graphics.moveTo(0, y);
                    graphics.lineTo(this.width, y);
                    y += cellSize;
                }
                var noiseFilter = new PIXI.filters.NoiseFilter();
                noiseFilter.noise = 0.1;
                graphics.filters = [noiseFilter];
                return graphics;
            }
        }
        Example.View = View;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class WebSocketGameClient extends STSEngine.WebSocketGameClient {
            constructor(socket, sid, playerAction) {
                let clientServerMessageInitializer = new STSEngine.ClientServerMessageInitializer();
                let worldAttributeList = new Example.WorldAttributeList();
                let worldServiceList = new Example.WorldServiceList(worldAttributeList);
                super(socket, sid, playerAction, worldServiceList, clientServerMessageInitializer);
            }
        }
        Example.WebSocketGameClient = WebSocketGameClient;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));