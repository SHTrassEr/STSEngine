'use strict';
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class CommandCreatePlayerObject extends STSEngine.Command {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this._playerId = ++this.lastAttributeId;
                this.setType(Example.CommandType.CreatePlayerObject);
            }
            getPlayerId() {
                return this.attributeList.get(this._playerId);
            }
            setPlayerId(id) {
                this.attributeList.set(this._playerId, id);
            }
        }
        Example.CommandCreatePlayerObject = CommandCreatePlayerObject;
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
                this.commandHandlerList[STSEngine.CommandType.RegisterPlayer] = new Example.CommandRegisterPlayerHandler(worldServiceList);
                this.commandHandlerList[Example.CommandType.CreatePlayerObject] = new Example.CommandCreatePlayerObjectHandler(worldServiceList);
                this.commandHandlerList[Example.CommandType.MoveStart] = new Example.CommandMoveObjectStartHandler(worldServiceList);
                this.commandHandlerList[Example.CommandType.MoveStop] = new Example.CommandMoveObjectStopHandler(worldServiceList);
                this.commandHandlerList[Example.CommandType.Fire] = new Example.CommandFireHandler(worldServiceList);
            }
        }
        Example.CommandDispatcher = CommandDispatcher;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class CommandFire extends STSEngine.Command {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this._objectId = ++this.lastAttributeId;
                this.setType(Example.CommandType.Fire);
            }
            getObjectId() {
                return this.attributeList.get(this._objectId);
            }
            setObjectId(id) {
                this.attributeList.set(this._objectId, id);
            }
        }
        Example.CommandFire = CommandFire;
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
                switch (type) {
                    case STSEngine.CommandType.RegisterPlayer:
                        return this.createRegisterPlayer(attr);
                    case Example.CommandType.MoveStart:
                        return this.createMoveObjectStart(attr);
                    case Example.CommandType.MoveStop:
                        return this.createMoveObjectStop(attr);
                    case Example.CommandType.CreatePlayerObject:
                        return this.createPlayerObject(attr);
                    case Example.CommandType.Fire:
                        return this.createFire(attr);
                }
                throw 'Unexpected command type: ' + type;
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
                return new STSEngine.AttributeList();
            }
        }
        Example.CommandInitializer = CommandInitializer;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class CommandMoveObjectStart extends STSEngine.Command {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this._objectId = ++this.lastAttributeId;
                this._moveDirection = ++this.lastAttributeId;
                this.setType(Example.CommandType.MoveStart);
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
                var process = this.worldServiceList.getProcessInitializer().createMove();
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
        class CommandMoveObjectStop extends STSEngine.Command {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this._objectId = ++this.lastAttributeId;
                this._moveDirection = ++this.lastAttributeId;
                this.setType(Example.CommandType.MoveStop);
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
        class CommandRegisterPlayer extends STSEngine.Command {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this._playerId = ++this.lastAttributeId;
                this._playerName = ++this.lastAttributeId;
                this.setType(STSEngine.CommandType.RegisterPlayer);
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
                let player = new Example.Player();
                player.setName(command.getPlayerName());
                player.setId(command.getPlayerId());
                this.worldServiceList.getPlayerListService().add(player);
                let process = this.worldServiceList.getProcessInitializer().createCreatePlayerObject();
                process.setPlayerId(command.getPlayerId());
                this.startProcess(process);
            }
            isValidCommand(command) {
                let playerId = command.getPlayerId();
                if (command.getInitiatorId() === 0) {
                    var player = this.worldServiceList.getPlayerListService().getFirst(p => p.getId() == playerId);
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
        class ItemRectangle extends STSEngine.Item {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
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
                this.setType(Example.ObjectType.Bullet);
                this.setSize([1, 1]);
            }
        }
        Example.ItemBullet = ItemBullet;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ItemPlayer extends Example.ItemRectangle {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this.setType(Example.ObjectType.Player);
                this.setMoveDirection(Example.MoveDirection.Up);
                this.setSize([5, 5]);
            }
        }
        Example.ItemPlayer = ItemPlayer;
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
                switch (type) {
                    case Example.ObjectType.Player:
                        return this.createPlayer(attr);
                }
            }
            createPlayer(attr) {
                var object = new Example.ItemPlayer(this.createAttributeList(), attr);
                this.setItemId(object);
                return object;
            }
            createBullet(attr) {
                var object = new Example.ItemBullet(this.createAttributeList(), attr);
                this.setItemId(object);
                return object;
            }
            setItemId(item) {
                item.setId(this.createId());
            }
            createAttributeList() {
                return new STSEngine.AttributeList();
            }
        }
        Example.ItemInitializer = ItemInitializer;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ProcessCreatePlayerObject extends STSEngine.Process {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this._playerId = ++this.lastAttributeId;
                this.setType(Example.ProcessType.CreatePlayerObject);
            }
            getPlayerId() {
                return this.attributeList.get(this._playerId);
            }
            setPlayerId(id) {
                this.attributeList.set(this._playerId, id);
            }
        }
        Example.ProcessCreatePlayerObject = ProcessCreatePlayerObject;
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
                itemPlayer.setPositionPrecise([40, 40]);
                itemPlayer.setMaxSpeed(1);
                this.worldServiceList.getItemListService().add(itemPlayer);
                process.setProcessStatus(STSEngine.ProcessStatus.Finished);
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
                this.processHandlerList[Example.ProcessType.CreatePlayerObject] = new Example.ProcessCreatePlayerObjectHandler(worldServiceList);
                this.processHandlerList[Example.ProcessType.Move] = new Example.ProcessMoveObjectHandler(worldServiceList);
                this.processHandlerList[Example.ProcessType.Fire] = new Example.ProcessFireHandler(worldServiceList);
            }
        }
        Example.ProcessDispatcher = ProcessDispatcher;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ProcessFire extends STSEngine.Process {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this._objectId = ++this.lastAttributeId;
                this.setType(Example.ProcessType.Fire);
            }
            getObjectId() {
                return this.attributeList.get(this._objectId);
            }
            setObjectId(id) {
                this.attributeList.set(this._objectId, id);
            }
        }
        Example.ProcessFire = ProcessFire;
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
            initProcess(process) {
                process.setProcessStatus(STSEngine.ProcessStatus.Executing);
            }
            executeProcess(process) {
                let object = this.worldServiceList.getItemListService().getTyped(process.getObjectId(), Example.ItemPlayer);
                if (object) {
                    this.fire(object);
                }
                process.setProcessStatus(STSEngine.ProcessStatus.Finished);
            }
            fire(object) {
                var bullet = this.worldServiceList.getItemInitializer().createBullet();
                bullet.setPositionPrecise([object.getPosition(0) + (object.getSize()[0] / 2), object.getPosition(1) + (object.getSize()[0] / 2)]);
                bullet.setMaxSpeed(4);
                bullet.setMoveDirection(object.getMoveDirection());
                this.worldServiceList.getItemListService().add(bullet);
                var moveProcess = this.worldServiceList.getProcessInitializer().createMove();
                moveProcess.setMoveDirection(object.getMoveDirection());
                moveProcess.setObjectId(bullet.getId());
                this.startProcess(moveProcess);
            }
            finish(process) {
                process.setProcessStatus(STSEngine.ProcessStatus.Finished);
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
                switch (type) {
                    case Example.ProcessType.Move:
                        return this.createMove(attr);
                }
            }
            setProcessId(process) {
                process.setId(this.createId());
            }
            createMove(attr) {
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
                return new STSEngine.AttributeList();
            }
        }
        Example.ProcessInitializer = ProcessInitializer;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ProcessMoveObject extends STSEngine.Process {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this._objectId = ++this.lastAttributeId;
                this._moveDirection = ++this.lastAttributeId;
                this.setType(Example.ProcessType.Move);
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
            initProcess(process) {
                process.setProcessStatus(STSEngine.ProcessStatus.Executing);
                if (!process.getMoveDirection()) {
                    throw new Error('Init process invalid state: move direction is not defined ' + process.getId() + ' ' + process.getObjectId());
                }
            }
            executeProcess(process) {
                var object = this.worldServiceList.getItemListService().get(process.getObjectId());
                if (object) {
                    this.moveObject(object, process.getMoveDirection(), process.getProcessExecCount());
                }
                else {
                    process.setProcessStatus(STSEngine.ProcessStatus.Finished);
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
            finish(process) {
                process.setProcessStatus(STSEngine.ProcessStatus.Finished);
            }
        }
        Example.ProcessMoveObjectHandler = ProcessMoveObjectHandler;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class CollisionService {
            constructor(worldAttributeList, itemListService) {
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
        class WorldAttributeList extends STSEngine.WorldAttributeList {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this.setWorldSize([1000, 1000]);
            }
            getWorldSize() {
                return this.attributeList.get(Example.WorldAttributeType.WorldSize);
            }
            setWorldSize(size) {
                this.attributeList.set(Example.WorldAttributeType.WorldSize, size);
            }
        }
        Example.WorldAttributeList = WorldAttributeList;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        (function (WorldAttributeType) {
            WorldAttributeType[WorldAttributeType["WorldSize"] = 50] = "WorldSize";
            WorldAttributeType[WorldAttributeType["LastProcessId"] = 51] = "LastProcessId";
            WorldAttributeType[WorldAttributeType["LastObjectId"] = 52] = "LastObjectId";
        })(Example.WorldAttributeType || (Example.WorldAttributeType = {}));
        var WorldAttributeType = Example.WorldAttributeType;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class WorldServiceList {
            constructor(worldAttributeList) {
                this.worldAttributeList = worldAttributeList;
                this.itemListService = new STSEngine.ItemListService();
                this.processListService = new STSEngine.ProcessListService();
                this.playerListService = new STSEngine.PlayerListService();
                this.collisionService = new Example.CollisionService(this.worldAttributeList, this.itemListService);
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
            getPlayerListService() {
                return this.playerListService;
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
        class Player extends STSEngine.Player {
            constructor() {
                super(...arguments);
                this.attributeScoreId = ++this.lastAttributeId;
            }
            getScore() {
                return this.attributeList.get(this.attributeScoreId);
            }
            setScore(score) {
                this.attributeList.set(this.attributeScoreId, score);
            }
        }
        Example.Player = Player;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        (function (CommandType) {
            CommandType[CommandType["CreatePlayerObject"] = 50] = "CreatePlayerObject";
            CommandType[CommandType["MoveStart"] = 51] = "MoveStart";
            CommandType[CommandType["MoveStop"] = 52] = "MoveStop";
            CommandType[CommandType["Fire"] = 53] = "Fire";
        })(Example.CommandType || (Example.CommandType = {}));
        var CommandType = Example.CommandType;
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
        (function (ObjectType) {
            ObjectType[ObjectType["Player"] = 0] = "Player";
            ObjectType[ObjectType["Bullet"] = 1] = "Bullet";
        })(Example.ObjectType || (Example.ObjectType = {}));
        var ObjectType = Example.ObjectType;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        (function (ProcessType) {
            ProcessType[ProcessType["Unknown"] = 0] = "Unknown";
            ProcessType[ProcessType["CreatePlayerObject"] = 1] = "CreatePlayerObject";
            ProcessType[ProcessType["Move"] = 2] = "Move";
            ProcessType[ProcessType["Fire"] = 3] = "Fire";
        })(Example.ProcessType || (Example.ProcessType = {}));
        var ProcessType = Example.ProcessType;
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
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class PlayerAction extends STSEngine.PlayerAction {
            constructor() {
                super();
                this.commandInitializer = new Example.CommandInitializer();
            }
            commandInitializator(attr) {
                return new STSEngine.Command(new STSEngine.AttributeList(), attr);
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
                this.stage = new PIXI.Container();
                this.grid = this.drawGrid();
                this.worldLimit = this.drawWordLimit();
                this.stage.addChild(this.grid);
                this.stage.addChild(this.worldLimit);
                this.stepNumber = -1;
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
                        if (o.getPlayerId() == this.playerId) {
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
