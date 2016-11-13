'use strict';
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class CommandCreatePlayerObject extends STSEngine.Command {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this.setCommandType(Example.CommandType.CreatePlayerObject);
            }
            getPlayerId() {
                return this.attributeList.get(Example.CommandAttributeType.PlayerId);
            }
            setPlayerId(id) {
                this.attributeList.set(Example.CommandAttributeType.PlayerId, id);
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
            constructor(processInitializer) {
                super();
                this.processInitializer = processInitializer;
            }
            executeCommand(world, command) {
                var process = this.processInitializer.createCreatePlayerObject();
                process.setPlayerId(command.getPlayerId());
                this.startProcess(world, process);
            }
            isValidCommand(world, command) {
                return command.getPlayerId() === 0;
            }
            isValidCommandType(world, command) {
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
            constructor(processInitializer) {
                super();
                this.initCommandHandlerList(processInitializer);
            }
            initCommandHandlerList(processInitializer) {
                this.commandHandlerList[STSEngine.CommandType.RegisterPlayer] = new Example.CommandRegisterPlayerHandler(processInitializer);
                this.commandHandlerList[Example.CommandType.CreatePlayerObject] = new Example.CommandCreatePlayerObjectHandler(processInitializer);
                this.commandHandlerList[Example.CommandType.MoveStart] = new Example.CommandMoveObjectStartHandler(processInitializer);
                this.commandHandlerList[Example.CommandType.MoveStop] = new Example.CommandMoveObjectStopHandler(processInitializer);
                this.commandHandlerList[Example.CommandType.Fire] = new Example.CommandFireHandler(processInitializer);
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
                this.setCommandType(Example.CommandType.Fire);
            }
            getObjectId() {
                return this.attributeList.get(Example.CommandAttributeType.ObjectId);
            }
            setObjectId(id) {
                this.attributeList.set(Example.CommandAttributeType.ObjectId, id);
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
            constructor(processInitializer) {
                super();
                this.processInitializer = processInitializer;
            }
            executeCommand(world, command) {
                var process = this.processInitializer.createFire();
                process.setObjectId(command.getObjectId());
                this.startProcess(world, process);
            }
            isValidCommand(world, command) {
                let playerId = command.getInitiatorId();
                if (playerId > 0) {
                    let objectId = command.getObjectId();
                    let object = this.getObject(world, objectId, Example.ObjectPlayer);
                    if (object) {
                        return (object).getPlayerId() == playerId;
                    }
                }
                return command.getInitiatorId() === 0;
            }
            isValidCommandType(world, command) {
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
        class CommandInitializer extends STSEngine.ItemInitializer {
            create(attr) {
                if (attr instanceof Number) {
                    return this.createByType(attr);
                }
                return this.createByArray(attr);
            }
            *createList(attrList) {
                for (let attr of attrList) {
                    yield this.create(attr);
                }
            }
            createByArray(attr) {
                var processType = this.getProcessType(attr);
                return this.createByType(processType, attr);
            }
            createByType(type, attr) {
                switch (type) {
                    case STSEngine.CommandType.RegisterPlayer:
                        return this.createRegisterPlayer(attr);
                    case Example.CommandType.MoveStart:
                        return this.createMoveObjectStart(attr);
                    case Example.CommandType.MoveStop:
                        return this.createMoveObjectStop(attr);
                    case Example.CommandType.CreatePlayerObject:
                        return this.createPlayerObjectStop(attr);
                    case Example.CommandType.Fire:
                        return this.createFire(attr);
                }
                throw 'Unexpected command type: ' + type;
            }
            getProcessType(attr) {
                for (var kvp of attr) {
                    if (kvp[0] == STSEngine.ProcessAttributeType.Type) {
                        return kvp[1];
                    }
                }
                return 0;
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
            createPlayerObjectStop(attr) {
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
                this.setCommandType(Example.CommandType.MoveStart);
            }
            getObjectId() {
                return this.attributeList.get(Example.CommandAttributeType.ObjectId);
            }
            setObjectId(id) {
                this.attributeList.set(Example.CommandAttributeType.ObjectId, id);
            }
            getMoveDirection() {
                return this.attributeList.get(Example.CommandAttributeType.MoveDirection);
            }
            setMoveDirection(direction) {
                this.attributeList.set(Example.CommandAttributeType.MoveDirection, direction);
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
            constructor(processInitializer) {
                super();
                this.processInitializer = processInitializer;
            }
            executeCommand(world, command) {
                var process = this.processInitializer.createMove();
                process.setObjectId(command.getObjectId());
                process.setMoveDirection(command.getMoveDirection());
                this.startProcess(world, process);
            }
            isValidCommand(world, command) {
                let playerId = command.getInitiatorId();
                if (playerId > 0) {
                    let objectId = command.getObjectId();
                    let object = this.getObject(world, objectId, Example.ObjectPlayer);
                    if (object) {
                        return (object).getPlayerId() == playerId;
                    }
                }
                return command.getInitiatorId() === 0;
            }
            isValidCommandType(world, command) {
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
                this.setCommandType(Example.CommandType.MoveStop);
            }
            getObjectId() {
                return this.attributeList.get(Example.CommandAttributeType.ObjectId);
            }
            setObjectId(id) {
                this.attributeList.set(Example.CommandAttributeType.ObjectId, id);
            }
            getMoveDirection() {
                return this.attributeList.get(Example.CommandAttributeType.MoveDirection);
            }
            setMoveDirection(direction) {
                this.attributeList.set(Example.CommandAttributeType.MoveDirection, direction);
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
            constructor(processInitializer) {
                super();
                this.processInitializer = processInitializer;
            }
            executeCommand(world, command) {
                let processListService = world.getServiceList().getProcessListService();
                let objectId = command.getObjectId();
                let moveDirection = command.getMoveDirection();
                let processList = processListService.getAll(p => ((p instanceof Example.ProcessMoveObject) && p.getObjectId() === objectId) && p.getMoveDirection() === moveDirection);
                for (let process of processList) {
                    this.finishProcess(world, process);
                }
                return null;
            }
            isValidCommand(world, command) {
                let playerId = command.getInitiatorId();
                if (playerId > 0) {
                    let objectId = command.getObjectId();
                    let object = world.getServiceList().getObjectListService().get(objectId);
                    if (object instanceof Example.ObjectPlayer) {
                        return (object).getPlayerId() == playerId;
                    }
                }
                return command.getInitiatorId() === 0;
            }
            isValidCommandType(world, command) {
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
                this.setCommandType(STSEngine.CommandType.RegisterPlayer);
            }
            getPlayerId() {
                return this.attributeList.get(Example.CommandAttributeType.PlayerId);
            }
            setPlayerId(id) {
                this.attributeList.set(Example.CommandAttributeType.PlayerId, id);
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
            constructor(processInitializer) {
                super();
                this.processInitializer = processInitializer;
            }
            executeCommand(world, command) {
                var process = this.processInitializer.createCreatePlayerObject();
                process.setPlayerId(command.getPlayerId());
                this.startProcess(world, process);
            }
            isValidCommand(world, command) {
                return command.getInitiatorId() === 0;
            }
            isValidCommandType(world, command) {
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
        class WorldServiceList extends STSEngine.WorldServiceList {
            constructor(worldAttributeList) {
                let objectListService = new STSEngine.ObjectListService();
                let processListService = new STSEngine.ProcessListService();
                let collisionService = new Example.CollisionService(worldAttributeList, objectListService);
                let commandInitializer = new Example.CommandInitializer();
                let objectInitializer = new Example.ObjectInitializer();
                let processInitializer = new Example.ProcessInitializer();
                let commandDispatcher = new Example.CommandDispatcher(processInitializer);
                let processDispatcher = new Example.ProcessDispatcher(worldAttributeList, collisionService, processInitializer, objectInitializer);
                super(worldAttributeList, commandInitializer, objectInitializer, processInitializer, processDispatcher, commandDispatcher, objectListService, processListService);
                this.collisionService = collisionService;
            }
            getWorldAttributeList() {
                return this.worldAttributeList;
            }
        }
        Example.WorldServiceList = WorldServiceList;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class CollisionService {
            constructor(worldAttributeList, objectListService) {
                this.worldAttributeList = worldAttributeList;
                this.objectListService = objectListService;
            }
            processCollision(moveObject, newPosition) {
                if (moveObject instanceof Example.ObjectPlayer) {
                    this.processCollisionObjectPlayer(moveObject, newPosition);
                }
                else if (moveObject instanceof Example.ObjectBullet) {
                    this.processCollisionObjectBullet(moveObject, newPosition);
                }
            }
            processCollisionObjectPlayer(moveObject, newPosition) {
                this.processCollisionObjectRectangleWorld(moveObject, newPosition);
                let objectList = this.objectListService.getIterator();
                for (var o of objectList) {
                    if (moveObject.getId() != o.getId()) {
                        if (o instanceof Example.ObjectPlayer) {
                            this.processCollisionObjectPlayerObjectPlayer(moveObject, newPosition, o);
                        }
                    }
                }
                moveObject.setPositionPrecise(newPosition);
            }
            processCollisionObjectBullet(moveObject, newPosition) {
                if (this.processCollisionObjectRectangleWorld(moveObject, newPosition)) {
                    this.objectListService.remove(moveObject.getId());
                }
                let objectList = this.objectListService.getIterator();
                for (var o of objectList) {
                    if (moveObject.getId() != o.getId()) {
                        if (o instanceof Example.ObjectPlayer) {
                            this.processCollisionObjectBulletObjectPlayer(moveObject, newPosition, o);
                        }
                    }
                }
                moveObject.setPositionPrecise(newPosition);
            }
            processCollisionObjectPlayerObjectPlayer(moveObject, newPosition, o) {
                let position = moveObject.getPositionPrecise();
                let oPosition = o.getPositionPrecise();
                let moveObjectSize = moveObject.getSize();
                let oSize = o.getSize();
                if (!this.isRectangleObjectCollision(position, moveObjectSize, oPosition, oSize)) {
                    if (this.isRectangleObjectCollision(newPosition, moveObjectSize, oPosition, oSize)) {
                        if (position[0] < newPosition[0]) {
                            newPosition[0] = oPosition[0] - moveObjectSize[0];
                            return true;
                        }
                        else if (position[0] > newPosition[0]) {
                            newPosition[0] = oPosition[0] + oSize[0];
                            return true;
                        }
                        else if (position[1] < newPosition[1]) {
                            newPosition[1] = oPosition[1] - moveObjectSize[1];
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
            processCollisionObjectBulletObjectPlayer(moveObject, newPosition, o) {
                let position = moveObject.getPositionPrecise();
                let oPosition = o.getPositionPrecise();
                let moveObjectSize = moveObject.getSize();
                let oSize = o.getSize();
                if (!this.isRectangleObjectCollision(position, moveObjectSize, oPosition, oSize)) {
                    if (this.isRectangleObjectCollision(newPosition, moveObjectSize, oPosition, oSize)) {
                        this.objectListService.remove(moveObject.getId());
                        return true;
                    }
                }
                return false;
            }
            processCollisionObjectRectangleWorld(moveObject, newPosition) {
                if (newPosition[0] < 0) {
                    newPosition[0] = 0;
                    return true;
                }
                if (newPosition[1] < 0) {
                    newPosition[1] = 0;
                    return true;
                }
                if (newPosition[0] > this.worldAttributeList.getWorldSize()[0] - moveObject.getSize()[0]) {
                    newPosition[0] = this.worldAttributeList.getWorldSize()[0] - moveObject.getSize()[0];
                    return true;
                }
                if (newPosition[1] > this.worldAttributeList.getWorldSize()[1] - moveObject.getSize()[1]) {
                    newPosition[1] = this.worldAttributeList.getWorldSize()[1] - moveObject.getSize()[1];
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
        class ObjectRectangle extends STSEngine.ObjectImpl {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
            }
            getPosition(d) {
                if (typeof d == 'number') {
                    return this.attributeList.get(Example.ObjectAttributeType.Position)[d];
                }
                return this.attributeList.get(Example.ObjectAttributeType.Position);
            }
            getPositionPrecise(d) {
                if (typeof d == 'number') {
                    return this.attributeList.get(Example.ObjectAttributeType.PositionPrecise)[d];
                }
                return this.attributeList.get(Example.ObjectAttributeType.PositionPrecise);
            }
            setPositionPrecise(position) {
                this.attributeList.set(Example.ObjectAttributeType.PositionPrecise, position);
                this.setPosition([Math.floor(position[0]), Math.floor(position[1])]);
            }
            setPosition(position) {
                this.attributeList.set(Example.ObjectAttributeType.Position, position);
            }
            getPlayerId() {
                return this.attributeList.get(Example.ObjectAttributeType.PlayerId);
            }
            setPlayerId(playerId) {
                this.attributeList.set(Example.ObjectAttributeType.PlayerId, playerId);
            }
            getMinSpeed() {
                return this.attributeList.get(Example.ObjectAttributeType.MinSpeed);
            }
            setMinSpeed(speed) {
                this.attributeList.set(Example.ObjectAttributeType.MinSpeed, speed);
            }
            getMaxSpeed() {
                return this.attributeList.get(Example.ObjectAttributeType.MaxSpeed);
            }
            setMaxSpeed(speed) {
                this.attributeList.set(Example.ObjectAttributeType.MaxSpeed, speed);
            }
            getSize(d) {
                if (d) {
                    return this.attributeList.get(Example.ObjectAttributeType.Size)[d];
                }
                return this.attributeList.get(Example.ObjectAttributeType.Size);
            }
            setSize(size) {
                this.attributeList.set(Example.ObjectAttributeType.Size, size);
            }
            getMoveDirection() {
                return this.attributeList.get(Example.ObjectAttributeType.MoveDirection);
            }
            setMoveDirection(direction) {
                this.attributeList.set(Example.ObjectAttributeType.MoveDirection, direction);
            }
        }
        Example.ObjectRectangle = ObjectRectangle;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ObjectBullet extends Example.ObjectRectangle {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this.setObjectType(Example.ObjectType.Bullet);
                this.setSize([1, 1]);
            }
        }
        Example.ObjectBullet = ObjectBullet;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ObjectInitializer extends STSEngine.ItemInitializer {
            create(attr) {
                if (attr instanceof Number) {
                    return this.createByType(attr);
                }
                return this.createByArray(attr);
            }
            *createList(attrList) {
                for (let attr of attrList) {
                    yield this.create(attr);
                }
            }
            createByArray(attr) {
                var processType = this.getProcessType(attr);
                return this.createByType(processType, attr);
            }
            createByType(type, attr) {
                switch (type) {
                    case Example.ObjectType.Player:
                        return this.createPlayer(attr);
                }
            }
            getProcessType(attr) {
                for (var kvp of attr) {
                    if (kvp[0] == STSEngine.ProcessAttributeType.Type) {
                        return kvp[1];
                    }
                }
                return 0;
            }
            createPlayer(attr) {
                var object = new Example.ObjectPlayer(this.createAttributeList(), attr);
                this.setObjectId(object);
                return object;
            }
            createBullet(attr) {
                var object = new Example.ObjectBullet(this.createAttributeList(), attr);
                this.setObjectId(object);
                return object;
            }
            setObjectId(object) {
                object.setId(this.getId());
            }
            createAttributeList() {
                return new STSEngine.AttributeList();
            }
        }
        Example.ObjectInitializer = ObjectInitializer;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ObjectPlayer extends Example.ObjectRectangle {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this.setObjectType(Example.ObjectType.Player);
                this.setMoveDirection(Example.MoveDirection.Up);
                this.setSize([5, 5]);
            }
        }
        Example.ObjectPlayer = ObjectPlayer;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ProcessCreatePlayerObject extends STSEngine.ProcessImpl {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this.setProcessType(Example.ProcessType.CreatePlayerObject);
            }
            getPlayerId() {
                return this.attributeList.get(Example.ProcessAttributeType.PlayerId);
            }
            setPlayerId(id) {
                this.attributeList.set(Example.ProcessAttributeType.PlayerId, id);
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
            constructor(processInitializer, objectInitializer) {
                super();
                this.processInitializer = processInitializer;
                this.objectInitializer = objectInitializer;
            }
            initProcess(world, process) {
                var object = this.objectInitializer.createPlayer();
                object.setPlayerId(process.getPlayerId());
                object.setPositionPrecise([40, 40]);
                object.setMaxSpeed(1);
                this.addObject(world, object);
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
            constructor(worldAttributeList, collisionService, processInitializer, objectInitializer) {
                super();
                this.initProcessHandlerList(worldAttributeList, collisionService, processInitializer, objectInitializer);
            }
            initProcessHandlerList(worldAttributeList, collisionService, processInitializer, objectInitializer) {
                this.processHandlerList = [];
                this.processHandlerList[Example.ProcessType.CreatePlayerObject] = new Example.ProcessCreatePlayerObjectHandler(processInitializer, objectInitializer);
                this.processHandlerList[Example.ProcessType.Move] = new Example.ProcessMoveObjectHandler(worldAttributeList, processInitializer, objectInitializer, collisionService);
                this.processHandlerList[Example.ProcessType.Fire] = new Example.ProcessFireHandler(worldAttributeList, processInitializer, objectInitializer, collisionService);
            }
        }
        Example.ProcessDispatcher = ProcessDispatcher;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class ProcessFire extends STSEngine.ProcessImpl {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this.setProcessType(Example.ProcessType.Fire);
            }
            getObjectId() {
                return this.attributeList.get(Example.ProcessAttributeType.ObjectId);
            }
            setObjectId(id) {
                this.attributeList.set(Example.ProcessAttributeType.ObjectId, id);
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
            constructor(worldAttributeList, processInitializer, objectInitializer, collisionService) {
                super();
                this.worldAttributeList = worldAttributeList;
                this.processInitializer = processInitializer;
                this.objectInitializer = objectInitializer;
                this.collisionService = collisionService;
            }
            initProcess(world, process) {
                process.setProcessStatus(STSEngine.ProcessStatus.Executing);
            }
            executeProcess(world, process) {
                let object = this.getObject(world, process.getObjectId(), Example.ObjectPlayer);
                if (object) {
                    this.fire(world, object, world.getServiceList());
                }
                process.setProcessStatus(STSEngine.ProcessStatus.Finished);
            }
            fire(world, object, worldServiceList) {
                var bullet = this.objectInitializer.createBullet();
                bullet.setPositionPrecise([object.getPosition(0) + (object.getSize()[0] / 2), object.getPosition(1) + (object.getSize()[0] / 2)]);
                bullet.setMaxSpeed(4);
                bullet.setMoveDirection(object.getMoveDirection());
                worldServiceList.getObjectListService().add(bullet);
                var moveProcess = this.processInitializer.createMove();
                moveProcess.setMoveDirection(object.getMoveDirection());
                moveProcess.setObjectId(bullet.getId());
                this.startProcess(world, moveProcess);
            }
            finish(world, process) {
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
        class ProcessInitializer extends STSEngine.ItemInitializer {
            create(attr) {
                if (attr instanceof Number) {
                    return this.createByType(attr);
                }
                return this.createByArray(attr);
            }
            *createList(attrList) {
                for (let attr of attrList) {
                    yield this.create(attr);
                }
            }
            createByArray(attr) {
                var processType = this.getProcessType(attr);
                return this.createByType(processType, attr);
            }
            createByType(type, attr) {
                switch (type) {
                    case Example.ProcessType.Move:
                        return this.createMove(attr);
                }
            }
            getProcessType(attr) {
                for (var kvp of attr) {
                    if (kvp[0] == STSEngine.ProcessAttributeType.Type) {
                        return kvp[1];
                    }
                }
                return 0;
            }
            setProcessId(process) {
                process.setId(this.getId());
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
        class ProcessMoveObject extends STSEngine.ProcessImpl {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this.setProcessType(Example.ProcessType.Move);
            }
            getObjectId() {
                return this.attributeList.get(Example.ProcessAttributeType.ObjectId);
            }
            setObjectId(id) {
                this.attributeList.set(Example.ProcessAttributeType.ObjectId, id);
            }
            getMoveDirection() {
                return this.attributeList.get(Example.CommandAttributeType.MoveDirection);
            }
            setMoveDirection(direction) {
                this.attributeList.set(Example.CommandAttributeType.MoveDirection, direction);
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
            constructor(worldAttributeList, processInitializer, objectInitializer, collisionService) {
                super();
                this.worldAttributeList = worldAttributeList;
                this.processInitializer = processInitializer;
                this.objectInitializer = objectInitializer;
                this.collisionService = collisionService;
            }
            initProcess(world, process) {
                process.setProcessStatus(STSEngine.ProcessStatus.Executing);
                if (!process.getMoveDirection()) {
                    throw new Error('Init process invalid state: move direction is not defined ' + process.getId() + ' ' + process.getObjectId());
                }
            }
            executeProcess(world, process) {
                var object = world.getServiceList().getObjectListService().get(process.getObjectId());
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
                this.collisionService.processCollision(object, newPosition);
            }
            finish(world, process) {
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
        (function (CommandAttributeType) {
            CommandAttributeType[CommandAttributeType["ObjectId"] = 50] = "ObjectId";
            CommandAttributeType[CommandAttributeType["MoveDirection"] = 51] = "MoveDirection";
            CommandAttributeType[CommandAttributeType["PlayerId"] = 52] = "PlayerId";
        })(Example.CommandAttributeType || (Example.CommandAttributeType = {}));
        var CommandAttributeType = Example.CommandAttributeType;
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
        (function (ObjectAttributeType) {
            ObjectAttributeType[ObjectAttributeType["PlayerId"] = 50] = "PlayerId";
            ObjectAttributeType[ObjectAttributeType["Position"] = 51] = "Position";
            ObjectAttributeType[ObjectAttributeType["PositionPrecise"] = 52] = "PositionPrecise";
            ObjectAttributeType[ObjectAttributeType["MinSpeed"] = 53] = "MinSpeed";
            ObjectAttributeType[ObjectAttributeType["MaxSpeed"] = 54] = "MaxSpeed";
            ObjectAttributeType[ObjectAttributeType["Size"] = 55] = "Size";
            ObjectAttributeType[ObjectAttributeType["MoveDirection"] = 56] = "MoveDirection";
        })(Example.ObjectAttributeType || (Example.ObjectAttributeType = {}));
        var ObjectAttributeType = Example.ObjectAttributeType;
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
        (function (ProcessAttributeType) {
            ProcessAttributeType[ProcessAttributeType["ObjectId"] = 50] = "ObjectId";
            ProcessAttributeType[ProcessAttributeType["Status"] = 51] = "Status";
            ProcessAttributeType[ProcessAttributeType["PlayerId"] = 52] = "PlayerId";
            ProcessAttributeType[ProcessAttributeType["ObjectAttributeList"] = 53] = "ObjectAttributeList";
        })(Example.ProcessAttributeType || (Example.ProcessAttributeType = {}));
        var ProcessAttributeType = Example.ProcessAttributeType;
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
        class PlayerAction {
            constructor(playerId) {
                this.commandInitializer = new Example.CommandInitializer();
                this.commandListService = new STSEngine.CommandListService();
                this.playerId = playerId;
            }
            getPlayerId() {
                return this.playerId;
            }
            commandInitializator(attr) {
                return new STSEngine.Command(new STSEngine.AttributeList(), attr);
            }
            addCommand(command) {
                command.setInitiatorId(this.playerId);
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
            getCommandKeyValuePairList() {
                return this.commandListService.getCommandKeyValuePairList();
            }
            clear() {
                this.commandListService.clear();
            }
            setOnAction(handler) {
                this.onActionHandler = handler;
            }
            onAction() {
                if (this.onActionHandler) {
                    this.onActionHandler(this);
                }
            }
        }
        Example.PlayerAction = PlayerAction;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class WebSocketGameClient extends STSEngine.WebSocketGameClient {
            constructor(socket, playerAction) {
                let worldAttributeList = new Example.WorldAttributeList();
                let worldServiceList = new Example.WorldServiceList(worldAttributeList);
                super(socket, playerAction, worldServiceList);
            }
        }
        Example.WebSocketGameClient = WebSocketGameClient;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        class View extends STSEngine.View {
            constructor(rootElement, world, playerId) {
                super(rootElement, world);
                this.playerId = playerId;
                this.cellSize = 8;
                this.width = 59 * this.cellSize;
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
                    if (!this.objectListService.has(id)) {
                        var child = this.objectMap.get(id);
                        this.stage.removeChild(child);
                        child.destroy();
                        this.objectMap.delete(id);
                    }
                }
            }
            refresh() {
                let iterator = this.objectListService.getIterator();
                if (this.world.getStepNumber() == this.stepNumber) {
                    return;
                }
                this.stepNumber = this.world.getStepNumber();
                this.clearStage();
                for (let o of iterator) {
                    if (o instanceof Example.ObjectRectangle) {
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
                var x = 0;
                var y = 0;
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
