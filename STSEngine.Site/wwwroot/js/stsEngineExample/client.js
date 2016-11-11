'use strict';
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
            }
        }
        Example.CommandDispatcher = CommandDispatcher;
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
        class ObjectPlayer extends STSEngine.ObjectImpl {
            constructor(attributeList, kvpList) {
                super(attributeList, kvpList);
                this.setObjectType(Example.ObjectType.Player);
            }
            getPosition() {
                return this.attributeList.get(Example.ObjectAttributeType.Position);
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
                object.setPosition(new Example.Point(0, 0));
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
            constructor(processInitializer, objectInitializer) {
                super();
                this.initProcessHandlerList(processInitializer, objectInitializer);
            }
            initProcessHandlerList(processInitializer, objectInitializer) {
                this.processHandlerList = [];
                this.processHandlerList[Example.ProcessType.CreatePlayerObject] = new Example.ProcessCreatePlayerObjectHandler(processInitializer, objectInitializer);
                this.processHandlerList[Example.ProcessType.Move] = new Example.ProcessMoveObjectHandler(processInitializer, objectInitializer);
            }
        }
        Example.ProcessDispatcher = ProcessDispatcher;
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
            constructor(processInitializer, objectInitializer) {
                super();
                this.processInitializer = processInitializer;
                this.objectInitializer = objectInitializer;
            }
            initProcess(world, process) {
                process.setProcessStatus(STSEngine.ProcessStatus.Executing);
            }
            executeProcess(world, process) {
                let object = this.getObject(world, process.getObjectId(), Example.ObjectPlayer);
                if (object) {
                    this.moveObject(object, process.getMoveDirection());
                }
            }
            moveObject(object, direction) {
                let position = object.getPosition();
                switch (direction) {
                    case Example.MoveDirection.Down:
                        object.setPosition(new Example.Point(position.x, position.y - 1));
                        break;
                    case Example.MoveDirection.Up:
                        object.setPosition(new Example.Point(position.x, position.y + 1));
                        break;
                    case Example.MoveDirection.Left:
                        object.setPosition(new Example.Point(position.x - 1, position.y));
                        break;
                    case Example.MoveDirection.Right:
                        object.setPosition(new Example.Point(position.x + 1, position.y));
                        break;
                }
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
        class ExampleWorldServiceList extends STSEngine.WorldServiceList {
            constructor(worldAttributeList) {
                let commandInitializer = new Example.CommandInitializer();
                let objectInitializer = new Example.ObjectInitializer();
                let processInitializer = new Example.ProcessInitializer();
                let commandDispatcher = new Example.CommandDispatcher(processInitializer);
                let processDispatcher = new Example.ProcessDispatcher(processInitializer, objectInitializer);
                super(worldAttributeList, commandInitializer, objectInitializer, processInitializer, processDispatcher, commandDispatcher);
            }
        }
        Example.ExampleWorldServiceList = ExampleWorldServiceList;
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
        })(Example.CommandType || (Example.CommandType = {}));
        var CommandType = Example.CommandType;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    var Example;
    (function (Example) {
        (function (ObjectAttributeType) {
            ObjectAttributeType[ObjectAttributeType["PlayerId"] = 50] = "PlayerId";
            ObjectAttributeType[ObjectAttributeType["Position"] = 51] = "Position";
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
        class ExampleWebSocketGameClient extends STSEngine.WebSocketGameClient {
            constructor(socket, playerAction) {
                let worldAttributeList = new STSEngine.WorldAttributeList();
                let worldServiceList = new Example.ExampleWorldServiceList(worldAttributeList);
                super(socket, playerAction, worldServiceList);
            }
        }
        Example.ExampleWebSocketGameClient = ExampleWebSocketGameClient;
    })(Example = STSEngine.Example || (STSEngine.Example = {}));
})(STSEngine || (STSEngine = {}));
