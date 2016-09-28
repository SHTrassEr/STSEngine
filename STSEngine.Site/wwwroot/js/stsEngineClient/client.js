'use strict';
var STSEngine;
(function (STSEngine) {
    (function (CommandType) {
        CommandType[CommandType["Unknown"] = 0] = "Unknown";
        CommandType[CommandType["CreateObject"] = 1] = "CreateObject";
        CommandType[CommandType["RegisterPlayer"] = 2] = "RegisterPlayer";
        CommandType[CommandType["StartMoveUp"] = 3] = "StartMoveUp";
        CommandType[CommandType["StartMoveDown"] = 4] = "StartMoveDown";
        CommandType[CommandType["StartMoveLeft"] = 5] = "StartMoveLeft";
        CommandType[CommandType["StartMoveRight"] = 6] = "StartMoveRight";
        CommandType[CommandType["StopMoveUp"] = 7] = "StopMoveUp";
        CommandType[CommandType["StopMoveDown"] = 8] = "StopMoveDown";
        CommandType[CommandType["StopMoveLeft"] = 9] = "StopMoveLeft";
        CommandType[CommandType["StopMoveRight"] = 10] = "StopMoveRight";
    })(STSEngine.CommandType || (STSEngine.CommandType = {}));
    var CommandType = STSEngine.CommandType;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class AttributeType {
    }
    AttributeType.Id = "Id";
    AttributeType.StepNumber = "StepNumber";
    AttributeType.ObjectType = "ObjectType";
    AttributeType.MoveDirection = "MoveDirection";
    AttributeType.Position = "Position";
    AttributeType.PlayerId = "PlayerId";
    AttributeType.NewPlayerId = "NewPlayerId";
    AttributeType.ObjectId = "ObjectId";
    AttributeType.ProcessStatus = "ProcessStatus";
    AttributeType.ProcessType = "ProcessType";
    AttributeType.Speed = "Speed";
    AttributeType.ObjectAttributeList = "ObjectAttributeList";
    AttributeType.CommandType = "CommandType";
    AttributeType.SID = "SID";
    AttributeType.CurrentStep = "CurrentStep";
    AttributeType.CommandList = "CommandList";
    STSEngine.AttributeType = AttributeType;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    (function (ClientMessageType) {
        ClientMessageType[ClientMessageType["Unknown"] = 0] = "Unknown";
        ClientMessageType[ClientMessageType["ResponseAuthentication"] = 1] = "ResponseAuthentication";
        ClientMessageType[ClientMessageType["CommandList"] = 2] = "CommandList";
    })(STSEngine.ClientMessageType || (STSEngine.ClientMessageType = {}));
    var ClientMessageType = STSEngine.ClientMessageType;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    (function (ObjectType) {
        ObjectType[ObjectType["Square"] = 0] = "Square";
    })(STSEngine.ObjectType || (STSEngine.ObjectType = {}));
    var ObjectType = STSEngine.ObjectType;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    (function (ServerMessageType) {
        ServerMessageType[ServerMessageType["Unknown"] = 0] = "Unknown";
        ServerMessageType[ServerMessageType["RequestAuthentication"] = 1] = "RequestAuthentication";
        ServerMessageType[ServerMessageType["Tick"] = 2] = "Tick";
    })(STSEngine.ServerMessageType || (STSEngine.ServerMessageType = {}));
    var ServerMessageType = STSEngine.ServerMessageType;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class BaseException {
        constructor(message) {
            this.message = message;
        }
        getMessage() {
            return this.message;
        }
    }
    STSEngine.BaseException = BaseException;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class NotImplementedException {
    }
    STSEngine.NotImplementedException = NotImplementedException;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    (function (ProcessStatus) {
        ProcessStatus[ProcessStatus["Init"] = 0] = "Init";
        ProcessStatus[ProcessStatus["Executing"] = 1] = "Executing";
        ProcessStatus[ProcessStatus["Finished"] = 2] = "Finished";
    })(STSEngine.ProcessStatus || (STSEngine.ProcessStatus = {}));
    var ProcessStatus = STSEngine.ProcessStatus;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    (function (ProcessType) {
        ProcessType[ProcessType["Unknown"] = 0] = "Unknown";
        ProcessType[ProcessType["CreateObject"] = 1] = "CreateObject";
        ProcessType[ProcessType["MoveUp"] = 2] = "MoveUp";
        ProcessType[ProcessType["MoveDown"] = 3] = "MoveDown";
        ProcessType[ProcessType["MoveLeft"] = 4] = "MoveLeft";
        ProcessType[ProcessType["MoveRight"] = 5] = "MoveRight";
    })(STSEngine.ProcessType || (STSEngine.ProcessType = {}));
    var ProcessType = STSEngine.ProcessType;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ServiceAttributeType {
    }
    ServiceAttributeType.LastId = "LastId";
    STSEngine.ServiceAttributeType = ServiceAttributeType;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class PlayerAction {
        constructor(playerId) {
            this.commandListService = new STSEngine.CommandListService();
            this.playerId = playerId;
        }
        getPlayerId() {
            return this.playerId;
        }
        createAttributeList(commandType) {
            var list = [];
            list.push(new STSEngine.KeyValuePair(STSEngine.AttributeType.PlayerId, this.playerId));
            list.push(new STSEngine.KeyValuePair(STSEngine.AttributeType.CommandType, commandType));
            return list;
        }
        addObjectIdAttribute(attributeList, objectId) {
            attributeList.push(new STSEngine.KeyValuePair(STSEngine.AttributeType.ObjectId, objectId));
        }
        startMoveRight(objectId) {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StartMoveRight);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
            this.onAction();
        }
        startMoveLeft(objectId) {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StartMoveLeft);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
            this.onAction();
        }
        startMoveUp(objectId) {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StartMoveUp);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
            this.onAction();
        }
        startMoveDown(objectId) {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StartMoveDown);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
            this.onAction();
        }
        stopMoveRight(objectId) {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StopMoveRight);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
            this.onAction();
        }
        stopMoveLeft(objectId) {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StopMoveLeft);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
            this.onAction();
        }
        stopMoveUp(objectId) {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StopMoveUp);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
            this.onAction();
        }
        stopMoveDown(objectId) {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StopMoveDown);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
            this.onAction();
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
    STSEngine.PlayerAction = PlayerAction;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class Command {
        constructor(attributeList) {
            this.attributeList = new STSEngine.AttributeList();
            if (attributeList) {
                this.setAttributeList(attributeList);
            }
        }
        getCommandType() {
            return this.attributeList.getAttribute(STSEngine.AttributeType.CommandType);
        }
        getPlayerId() {
            return this.attributeList.getAttribute(STSEngine.AttributeType.PlayerId);
        }
        getAttribute(attribute, defaultValue) {
            return this.attributeList.getAttribute(attribute, defaultValue);
        }
        setAttribute(attribute, value) {
            this.attributeList.setAttribute(attribute, value);
        }
        setAttributeList(attributeList) {
            this.attributeList.setAttributeList(attributeList);
        }
        hasAttribute(attribute) {
            return this.attributeList.hasAttribute(attribute);
        }
        rollback() {
            this.attributeList.rollback();
        }
        commit() {
            this.attributeList.commit();
        }
        isDirty() {
            return this.attributeList.isDirty();
        }
        removeAttribute(attribute) {
            this.attributeList.removeAttribute(attribute);
        }
        getKeyValuePairList() {
            return this.attributeList.getKeyValuePairList();
        }
    }
    STSEngine.Command = Command;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class CommandCreateObject {
        execute(world, command) {
            var objectAttributeList = this.getObjectAttributeList(command);
            var processAttributeList = this.createProcessAttributeList(world, objectAttributeList);
            var processListService = world.getProcessListService();
            var process = processListService.createProcess(processAttributeList);
            var processDispatcher = world.getProcessDispatcher();
            processDispatcher.init(world, process);
        }
        getObjectAttributeList(command) {
            var objectAttributeList = command.getAttribute(STSEngine.AttributeType.ObjectAttributeList);
            return objectAttributeList;
        }
        createProcessAttributeList(world, objectAttributeList) {
            var processAttributeList = [];
            processAttributeList.push(new STSEngine.KeyValuePair(STSEngine.AttributeType.ProcessType, STSEngine.ProcessType.CreateObject));
            processAttributeList.push(new STSEngine.KeyValuePair(STSEngine.AttributeType.ObjectAttributeList, objectAttributeList));
            return processAttributeList;
        }
        isValid(world, command) {
            return command.getPlayerId() === 0;
        }
    }
    STSEngine.CommandCreateObject = CommandCreateObject;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class CommandDispatcher {
        constructor() {
            this.initCommandHandlerList();
        }
        initCommandHandlerList() {
            this.commandHandlerList = [];
            this.commandHandlerList[STSEngine.CommandType.CreateObject] = new STSEngine.CommandCreateObject();
            this.commandHandlerList[STSEngine.CommandType.RegisterPlayer] = new STSEngine.CommandRegisterPlayer();
            this.commandHandlerList[STSEngine.CommandType.StartMoveUp] = new STSEngine.CommandStartMoveObject();
            this.commandHandlerList[STSEngine.CommandType.StartMoveDown] = new STSEngine.CommandStartMoveObject();
            this.commandHandlerList[STSEngine.CommandType.StartMoveLeft] = new STSEngine.CommandStartMoveObject();
            this.commandHandlerList[STSEngine.CommandType.StartMoveRight] = new STSEngine.CommandStartMoveObject();
            this.commandHandlerList[STSEngine.CommandType.StopMoveUp] = new STSEngine.CommandStopMoveObject();
            this.commandHandlerList[STSEngine.CommandType.StopMoveDown] = new STSEngine.CommandStopMoveObject();
            this.commandHandlerList[STSEngine.CommandType.StopMoveLeft] = new STSEngine.CommandStopMoveObject();
            this.commandHandlerList[STSEngine.CommandType.StopMoveRight] = new STSEngine.CommandStopMoveObject();
        }
        execute(world, command) {
            var handler = this.commandHandlerList[command.getCommandType()];
            if (handler.isValid(world, command)) {
                handler.execute(world, command);
            }
        }
    }
    STSEngine.CommandDispatcher = CommandDispatcher;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class CommandListService {
        constructor() {
            this.commandList = [];
        }
        getCommandList() {
            return this.commandList;
        }
        createCommand(attributeList) {
            var command = new STSEngine.Command(attributeList);
            this.commandList.push(command);
            return command;
        }
        setCommandList(commandList) {
            for (var attributeList of commandList) {
                this.createCommand(attributeList);
            }
        }
        getCommandKeyValuePairList() {
            var list = [];
            for (var command of this.commandList) {
                list.push(command.getKeyValuePairList());
            }
            return list;
        }
        clear() {
            this.commandList = [];
        }
        getAll(condition) {
            return this.filterService.getAll(this.commandList, condition);
        }
        getFirst(condition) {
            return this.filterService.getFirst(this.commandList, condition);
        }
    }
    STSEngine.CommandListService = CommandListService;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class CommandRegisterPlayer {
        execute(world, command) {
            var objectAttributeList = this.createObjectAttributeList(world, command);
            var processAttributeList = this.createProcessAttributeList(world, objectAttributeList);
            var processListService = world.getProcessListService();
            var process = processListService.createProcess(processAttributeList);
            var processDispatcher = world.getProcessDispatcher();
            processDispatcher.init(world, process);
        }
        createObjectAttributeList(world, command) {
            var newPlayerId = command.getAttribute(STSEngine.AttributeType.NewPlayerId);
            var objectAttributeList = [];
            objectAttributeList.push(new STSEngine.KeyValuePair(STSEngine.AttributeType.PlayerId, newPlayerId));
            objectAttributeList.push(new STSEngine.KeyValuePair(STSEngine.AttributeType.Position, new STSEngine.Point(0, 0)));
            return objectAttributeList;
        }
        createProcessAttributeList(world, objectAttributeList) {
            var processAttributeList = [];
            processAttributeList.push(new STSEngine.KeyValuePair(STSEngine.AttributeType.ProcessType, STSEngine.ProcessType.CreateObject));
            processAttributeList.push(new STSEngine.KeyValuePair(STSEngine.AttributeType.ObjectAttributeList, objectAttributeList));
            return processAttributeList;
        }
        isValid(world, command) {
            return command.getPlayerId() === 0;
        }
    }
    STSEngine.CommandRegisterPlayer = CommandRegisterPlayer;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class CommandStartMoveObject {
        execute(world, command) {
            var processType = this.getProcessType(command);
            var processAttributeList = this.createProcessAttributeList(processType, command);
            var processListService = world.getProcessListService();
            var process = processListService.createProcess(processAttributeList);
            var processDispatcher = world.getProcessDispatcher();
            processDispatcher.init(world, process);
        }
        getProcessType(command) {
            switch (command.getCommandType()) {
                case STSEngine.CommandType.StartMoveDown:
                    return STSEngine.ProcessType.MoveDown;
                case STSEngine.CommandType.StartMoveUp:
                    return STSEngine.ProcessType.MoveUp;
                case STSEngine.CommandType.StartMoveLeft:
                    return STSEngine.ProcessType.MoveLeft;
                case STSEngine.CommandType.StartMoveRight:
                    return STSEngine.ProcessType.MoveRight;
            }
        }
        createProcessAttributeList(processType, command) {
            var processAttributeList = [];
            processAttributeList.push(new STSEngine.KeyValuePair(STSEngine.AttributeType.ProcessType, processType));
            var objectId = command.getAttribute(STSEngine.AttributeType.ObjectId);
            processAttributeList.push(new STSEngine.KeyValuePair(STSEngine.AttributeType.ObjectId, objectId));
            return processAttributeList;
        }
        isValid(world, command) {
            var playerId = command.getPlayerId();
            if (playerId > 0) {
                var objectId = command.getAttribute(STSEngine.AttributeType.ObjectId);
                var object = world.getObjectListService().getObject(objectId);
                return object.getPlayerId() == playerId;
            }
            return command.getPlayerId() === 0;
        }
    }
    STSEngine.CommandStartMoveObject = CommandStartMoveObject;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class CommandStopMoveObject {
        execute(world, command) {
            var processListService = world.getProcessListService();
            var objectId = command.getAttribute(STSEngine.AttributeType.ObjectId);
            var processType = this.getProcessType(command);
            var processList = processListService.getAll(p => (p.getObjectId() === objectId && p.getProcessType() === processType));
            var processDispatcher = world.getProcessDispatcher();
            for (var process of processList) {
                processDispatcher.finish(world, process);
            }
        }
        getProcessType(command) {
            switch (command.getCommandType()) {
                case STSEngine.CommandType.StopMoveDown:
                    return STSEngine.ProcessType.MoveDown;
                case STSEngine.CommandType.StopMoveUp:
                    return STSEngine.ProcessType.MoveUp;
                case STSEngine.CommandType.StopMoveLeft:
                    return STSEngine.ProcessType.MoveLeft;
                case STSEngine.CommandType.StopMoveRight:
                    return STSEngine.ProcessType.MoveRight;
            }
        }
        isValid(world, command) {
            var playerId = command.getPlayerId();
            if (playerId > 0) {
                var objectId = command.getAttribute(STSEngine.AttributeType.ObjectId);
                var object = world.getObjectListService().getObject(objectId);
                return object.getPlayerId() == playerId;
            }
            return command.getPlayerId() === 0;
        }
    }
    STSEngine.CommandStopMoveObject = CommandStopMoveObject;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class AttributeList {
        constructor() {
            this.commitedAttributeList = new Map();
            this.attributeList = new Map();
        }
        getAttribute(attribute, defaultValue) {
            if (this.attributeList.has(attribute)) {
                return this.attributeList.get(attribute);
            }
            if (this.commitedAttributeList.has(attribute)) {
                return this.commitedAttributeList.get(attribute);
            }
            return defaultValue;
        }
        setAttribute(attribute, value) {
            this.attributeList.set(attribute, value);
        }
        setAttributeList(attributeList) {
            if (attributeList instanceof Array) {
                this.setAttributeListArray(attributeList);
            }
            else {
                this.setAttributeListMap(attributeList);
            }
        }
        setAttributeListMap(attributeList) {
            for (var kvp of attributeList) {
                var key = kvp[0];
                var value = kvp[1];
                this.attributeList.set(key, value);
            }
        }
        setAttributeListArray(attributeList) {
            for (var kvp of attributeList) {
                this.attributeList.set(kvp.key, kvp.value);
            }
        }
        hasAttribute(attribute) {
            if (this.attributeList.has(attribute)) {
                return true;
            }
            if (this.commitedAttributeList.has(attribute)) {
                return true;
            }
            return false;
        }
        rollback() {
            this.attributeList.clear();
        }
        commit() {
            if (this.isDirty()) {
                for (var kvp of this.attributeList) {
                    var key = kvp[0];
                    var value = kvp[1];
                    if (value === null || value === undefined) {
                        this.commitedAttributeList.delete(key);
                    }
                    else {
                        this.commitedAttributeList.set(key, value);
                    }
                }
                this.attributeList.clear();
            }
        }
        isDirty() {
            return this.attributeList.size > 0;
        }
        removeAttribute(attribute) {
            this.setAttribute(attribute, undefined);
        }
        getKeyValuePairList() {
            var list = [];
            for (var kvp of this.attributeList) {
                var key = kvp[0];
                var value = kvp[1];
                if (value !== null && value !== undefined) {
                    list.push(new STSEngine.KeyValuePair(key, value));
                }
            }
            for (var kvp of this.commitedAttributeList) {
                var key = kvp[0];
                var value = kvp[1];
                if (value !== null && value !== undefined) {
                    if (!this.attributeList.has(key)) {
                        list.push(new STSEngine.KeyValuePair(key, value));
                    }
                }
            }
            return list;
        }
    }
    STSEngine.AttributeList = AttributeList;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ClientServerMessage {
        constructor(messageType, attributeList) {
            this.messageType = messageType;
            this.attributeList = attributeList;
        }
    }
    STSEngine.ClientServerMessage = ClientServerMessage;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class KeyValuePair {
        constructor(key, value) {
            this.key = key;
            this.value = value;
        }
    }
    STSEngine.KeyValuePair = KeyValuePair;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ObjectImpl {
        constructor(attributeList) {
            this.attributeList = new STSEngine.AttributeList();
            this.setAttributeList(attributeList);
        }
        getAttributeList() {
            return this.attributeList;
        }
        getId() {
            return this.attributeList.getAttribute(STSEngine.AttributeType.Id);
        }
        getObjectType() {
            return this.attributeList.getAttribute(STSEngine.AttributeType.ObjectType);
        }
        setObjectType(objectType) {
            this.attributeList.setAttribute(STSEngine.AttributeType.ObjectType, objectType);
        }
        getMoveDirection() {
            return this.attributeList.getAttribute(STSEngine.AttributeType.MoveDirection);
        }
        setMoveDirection(moveDirection) {
            this.attributeList.setAttribute(STSEngine.AttributeType.MoveDirection, moveDirection);
        }
        getPosition() {
            return this.attributeList.getAttribute(STSEngine.AttributeType.Position);
        }
        setPosition(position) {
            this.attributeList.setAttribute(STSEngine.AttributeType.Position, position);
        }
        getPlayerId() {
            return this.attributeList.getAttribute(STSEngine.AttributeType.PlayerId);
        }
        setPlayerId(playerId) {
            this.attributeList.setAttribute(STSEngine.AttributeType.PlayerId, playerId);
        }
        getAttribute(attribute, defaultValue) {
            return this.attributeList.getAttribute(attribute, defaultValue);
        }
        setAttribute(attribute, value) {
            this.attributeList.setAttribute(attribute, value);
        }
        setAttributeList(attributeList) {
            this.attributeList.setAttributeList(attributeList);
        }
        hasAttribute(attribute) {
            return this.attributeList.hasAttribute(attribute);
        }
        rollback() {
            this.attributeList.rollback();
        }
        commit() {
            this.attributeList.commit();
        }
        isDirty() {
            return this.attributeList.isDirty();
        }
        removeAttribute(attribute) {
            this.attributeList.removeAttribute(attribute);
        }
        getKeyValuePairList() {
            return this.attributeList.getKeyValuePairList();
        }
    }
    STSEngine.ObjectImpl = ObjectImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        getX() {
            return this.x;
        }
        getY() {
            return this.y;
        }
    }
    STSEngine.Point = Point;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class World {
        constructor(worldSettings) {
            this.objectListService = new STSEngine.ObjectListService();
            this.processListService = new STSEngine.ProcessListService();
            this.worldSettings = worldSettings;
            this.attributeList = new STSEngine.AttributeList();
            this.processDispatcher = new STSEngine.ProcessDispatcher();
            this.commandDispatcher = new STSEngine.CommandDispatcher();
            this.setStepNumber(0);
        }
        getSettings() {
            return this.worldSettings;
        }
        getObjectListService() {
            return this.objectListService;
        }
        getProcessListService() {
            return this.processListService;
        }
        getProcessDispatcher() {
            return this.processDispatcher;
        }
        getCommandDispatcher() {
            return this.commandDispatcher;
        }
        getStepNumber() {
            return this.attributeList.getAttribute(STSEngine.AttributeType.StepNumber);
        }
        setStepNumber(stepNumber) {
            this.attributeList.setAttribute(STSEngine.AttributeType.StepNumber, stepNumber);
        }
        increaseStepNumber() {
            var stepNumber = this.getStepNumber() + 1;
            this.setStepNumber(stepNumber);
        }
        commit() {
            this.objectListService.commit();
            this.processListService.commit();
            this.attributeList.commit();
        }
        rollback() {
            this.objectListService.rollback();
            this.processListService.rollback();
            this.attributeList.rollback();
        }
        isDirty() {
            return this.objectListService.isDirty() ||
                this.processListService.isDirty() ||
                this.attributeList.isDirty();
        }
    }
    STSEngine.World = World;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class WorldSettings {
        constructor(settings) {
            this.settings = new Map();
            this.setSettilgs(settings);
        }
        setSettilgs(settings) {
            for (var kvp of settings) {
                this.settings.set(kvp.key, kvp.value);
            }
        }
        getMoveStepSize() {
            return (this.settings.get("MoveStepSize"));
        }
        getTickLength() {
            return (this.settings.get("TickLength"));
        }
    }
    STSEngine.WorldSettings = WorldSettings;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ProcessCreateObject {
        init(world, process) {
            var objectAttributeList = process.getAttribute(STSEngine.AttributeType.ObjectAttributeList);
            var objectListService = world.getObjectListService();
            var object = objectListService.createObject(objectAttributeList);
            process.setProcessStatus(STSEngine.ProcessStatus.Finished);
        }
        execute(world, process) {
        }
        finish(world, process) {
        }
    }
    STSEngine.ProcessCreateObject = ProcessCreateObject;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ProcessDispatcher {
        constructor() {
            this.initProcessHandlerList();
        }
        initProcessHandlerList() {
            this.processHandlerList = [];
            this.processHandlerList[STSEngine.ProcessType.CreateObject] = new STSEngine.ProcessCreateObject();
            this.processHandlerList[STSEngine.ProcessType.MoveDown] = new STSEngine.ProcessMoveDownObject();
            this.processHandlerList[STSEngine.ProcessType.MoveLeft] = new STSEngine.ProcessMoveLeftObject();
            this.processHandlerList[STSEngine.ProcessType.MoveRight] = new STSEngine.ProcessMoveRightObject();
            this.processHandlerList[STSEngine.ProcessType.MoveUp] = new STSEngine.ProcessMoveUpObject();
        }
        execute(world, process) {
            var processStatus = process.getProcessStatus();
            if (processStatus === STSEngine.ProcessStatus.Executing) {
                var handler = this.getProcessHandler(process);
                handler.execute(world, process);
            }
        }
        init(world, process) {
            var processStatus = process.getProcessStatus();
            if (processStatus === STSEngine.ProcessStatus.Init) {
                var handler = this.getProcessHandler(process);
                handler.init(world, process);
            }
        }
        finish(world, process) {
            var processStatus = process.getProcessStatus();
            if (processStatus !== STSEngine.ProcessStatus.Finished) {
                var handler = this.getProcessHandler(process);
                handler.finish(world, process);
            }
        }
        getProcessHandler(process) {
            return this.processHandlerList[process.getProcessType()];
        }
    }
    STSEngine.ProcessDispatcher = ProcessDispatcher;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ProcessImpl {
        constructor(attributeList) {
            this.attributeList = new STSEngine.AttributeList();
            this.setProcessStatus(STSEngine.ProcessStatus.Init);
            if (attributeList) {
                this.setAttributeList(attributeList);
            }
        }
        getId() {
            return this.getAttribute(STSEngine.AttributeType.Id);
        }
        setId(processId) {
            this.setAttribute(STSEngine.AttributeType.Id, processId);
        }
        getProcessType() {
            return this.getAttribute(STSEngine.AttributeType.ProcessType);
        }
        setProcessType(processType) {
            this.setAttribute(STSEngine.AttributeType.ProcessType, processType);
        }
        getProcessStatus() {
            return this.getAttribute(STSEngine.AttributeType.ProcessStatus);
        }
        setProcessStatus(processStatus) {
            this.setAttribute(STSEngine.AttributeType.ProcessStatus, processStatus);
        }
        getObjectId() {
            return this.getAttribute(STSEngine.AttributeType.ObjectId);
        }
        setObjectId(objectId) {
            this.setAttribute(STSEngine.AttributeType.ObjectId, objectId);
        }
        getAttribute(attribute, defaultValue) {
            return this.attributeList.getAttribute(attribute, defaultValue);
        }
        setAttribute(attribute, value) {
            this.attributeList.setAttribute(attribute, value);
        }
        setAttributeList(attributeList) {
            this.attributeList.setAttributeList(attributeList);
        }
        hasAttribute(attribute) {
            return this.attributeList.hasAttribute(attribute);
        }
        rollback() {
            this.attributeList.rollback();
        }
        commit() {
            this.attributeList.commit();
        }
        isDirty() {
            return this.attributeList.isDirty();
        }
        removeAttribute(attribute) {
            this.attributeList.removeAttribute(attribute);
        }
        getKeyValuePairList() {
            return this.attributeList.getKeyValuePairList();
        }
    }
    STSEngine.ProcessImpl = ProcessImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ProcessListService {
        constructor() {
            this.commitedProcessList = [];
            this.processList = [];
            this.attributeList = new STSEngine.AttributeList();
            this.filterService = new STSEngine.FilterService();
            this.setLastId(0);
        }
        getProcessList() {
            return this.processList;
        }
        addProcess(process) {
            this.processList.push(process);
        }
        createProcess(attributeList) {
            attributeList.push(new STSEngine.KeyValuePair(STSEngine.AttributeType.Id, this.getNewProcessId()));
            var process = new STSEngine.ProcessImpl(attributeList);
            this.addProcess(process);
            return process;
        }
        setProcessList(processList) {
            for (var attributeList of processList) {
                this.createProcess(attributeList);
            }
        }
        getNewProcessId() {
            var lastObjectId = this.getLastId();
            var newObjectId = lastObjectId + 1;
            this.setLastId(newObjectId);
            return newObjectId;
        }
        getLastId() {
            return this.attributeList.getAttribute(STSEngine.ServiceAttributeType.LastId);
        }
        setLastId(id) {
            this.attributeList.setAttribute(STSEngine.ServiceAttributeType.LastId, 0);
        }
        removeFinished() {
            var list;
            for (var process of this.processList) {
                if (process.getProcessStatus() != STSEngine.ProcessStatus.Finished) {
                    if (!list) {
                        list = [];
                    }
                    list.push(process);
                }
            }
            if (list) {
                this.processList = list;
            }
        }
        commit() {
            this.commitedProcessList = this.processList.slice();
            for (var process of this.processList) {
                process.commit();
            }
        }
        rollback() {
            for (var process of this.processList) {
                process.rollback();
            }
            this.processList = this.commitedProcessList.slice();
        }
        isDirty() {
            if (this.processList.length > this.commitedProcessList.length) {
                return true;
            }
            for (var process of this.processList) {
                if (process.isDirty()) {
                    return true;
                }
            }
            return false;
        }
        getAll(condition) {
            return this.filterService.getAll(this.processList, condition);
        }
        getFirst(condition) {
            return this.filterService.getFirst(this.processList, condition);
        }
    }
    STSEngine.ProcessListService = ProcessListService;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ProcessMoveDownObject {
        init(world, process) {
            process.setProcessStatus(STSEngine.ProcessStatus.Executing);
        }
        execute(world, process) {
            var objectListService = world.getObjectListService();
            var object = objectListService.getObject(process.getObjectId());
            var position = object.getPosition();
            var newPosition = new STSEngine.Point(position.getX(), position.getY() - 1);
            object.setPosition(newPosition);
        }
        finish(world, process) {
            process.setProcessStatus(STSEngine.ProcessStatus.Finished);
        }
    }
    STSEngine.ProcessMoveDownObject = ProcessMoveDownObject;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ProcessMoveLeftObject {
        init(world, process) {
            process.setProcessStatus(STSEngine.ProcessStatus.Executing);
        }
        execute(world, process) {
            var objectListService = world.getObjectListService();
            var object = objectListService.getObject(process.getObjectId());
            var position = object.getPosition();
            var newPosition = new STSEngine.Point(position.getX() - 1, position.getY());
            object.setPosition(newPosition);
        }
        finish(world, process) {
            process.setProcessStatus(STSEngine.ProcessStatus.Finished);
        }
    }
    STSEngine.ProcessMoveLeftObject = ProcessMoveLeftObject;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ProcessMoveRightObject {
        init(world, process) {
            process.setProcessStatus(STSEngine.ProcessStatus.Executing);
        }
        execute(world, process) {
            var objectListService = world.getObjectListService();
            var object = objectListService.getObject(process.getObjectId());
            var position = object.getPosition();
            var newPosition = new STSEngine.Point(position.getX() + 1, position.getY());
            object.setPosition(newPosition);
        }
        finish(world, process) {
            process.setProcessStatus(STSEngine.ProcessStatus.Finished);
        }
    }
    STSEngine.ProcessMoveRightObject = ProcessMoveRightObject;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ProcessMoveUpObject {
        init(world, process) {
            process.setProcessStatus(STSEngine.ProcessStatus.Executing);
        }
        execute(world, process) {
            var objectListService = world.getObjectListService();
            var object = objectListService.getObject(process.getObjectId());
            var position = object.getPosition();
            var newPosition = new STSEngine.Point(position.getX(), position.getY() + 1);
            object.setPosition(newPosition);
        }
        finish(world, process) {
            process.setProcessStatus(STSEngine.ProcessStatus.Finished);
        }
    }
    STSEngine.ProcessMoveUpObject = ProcessMoveUpObject;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class Engine {
        constructor(world, commandListService) {
            this.world = world;
            this.commandListService = commandListService;
            this.objectListService = world.getObjectListService();
            this.processListService = world.getProcessListService();
            this.worldSettings = world.getSettings();
            this.processDispatcher = world.getProcessDispatcher();
            this.commandDispatcher = world.getCommandDispatcher();
        }
        getWorld() {
            return this.world;
        }
        step() {
            this.world.increaseStepNumber();
            this.processCommandList();
            for (var i = 0; i < this.processListService.getProcessList().length; i++) {
                var process = this.processListService.getProcessList()[i];
                this.processDispatcher.execute(this.world, process);
            }
            this.processListService.removeFinished();
        }
        getCommandList() {
            return this.commandListService.getCommandList();
        }
        processCommandList() {
            var commandList = this.commandListService.getCommandList();
            for (var command of commandList) {
                this.commandDispatcher.execute(this.world, command);
            }
            this.commandListService.clear();
        }
    }
    STSEngine.Engine = Engine;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class FilterService {
        getAll(itemList, condition) {
            var result = [];
            for (var item of itemList) {
                if (condition(item)) {
                    result.push(item);
                }
            }
            return result;
        }
        getFirst(itemList, condition) {
            for (var item of itemList) {
                if (condition(item)) {
                    return item;
                }
            }
            return null;
        }
    }
    STSEngine.FilterService = FilterService;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class GameServer {
        constructor(engine) {
            this.engine = engine;
            this.metronome = new STSEngine.Metronome(100);
            this.commandLog = [];
            this.emptyCommandList = [];
            this.timerId = 0;
        }
        start() {
            var world = this.engine.getWorld();
            this.metronome.start();
            this.timerId = setInterval(() => this.updateWorld(), 10);
        }
        getCommandLog(startStepNumber) {
            return this.commandLog;
        }
        updateWorld() {
            var metronomeStepNumber = this.metronome.getTickCount();
            var currentStepNumber = this.getStepNumber();
            while (currentStepNumber < metronomeStepNumber) {
                currentStepNumber += 1;
                var commandList = this.engine.getCommandList();
                this.commandLog[currentStepNumber] = commandList;
                if (this.onUpdateWorld) {
                    this.onUpdateWorld(this.engine.getWorld(), currentStepNumber, commandList);
                }
                this.engine.step();
            }
        }
        getStepNumber() {
            var world = this.engine.getWorld();
            return world.getStepNumber();
        }
        setOnUpdateWorld(handler) {
            this.onUpdateWorld = handler;
        }
    }
    STSEngine.GameServer = GameServer;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class Metronome {
        constructor(tickLength) {
            this.tickLength = tickLength;
            this.isPaused = true;
            this.pauseLength = 0;
        }
        start(startTime) {
            if (!startTime) {
                this.startTime = Date.now();
            }
            else {
                this.startTime = startTime;
            }
            this.pauseStart = this.startTime;
            this.resume();
        }
        getStartTime() {
            return this.startTime;
        }
        pause() {
            if (!this.isPaused) {
                this.pauseStart = Date.now();
                this.isPaused = true;
            }
        }
        resume() {
            if (this.isPaused) {
                var pauseEnd = Date.now();
                this.pauseLength += (pauseEnd - this.pauseStart);
                this.isPaused = false;
            }
        }
        getTickLength() {
            return this.tickLength;
        }
        getTickCount() {
            var totalTime = Date.now() - this.startTime - this.pauseLength;
            return Math.floor(totalTime / this.tickLength);
        }
    }
    STSEngine.Metronome = Metronome;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ObjectListService {
        constructor() {
            this.objectList = new Map();
            this.changedObjectList = new Map();
            this.attributeList = new STSEngine.AttributeList();
            this.filterService = new STSEngine.FilterService();
            this.setLastId(0);
        }
        getNewObjectId() {
            var lastObjectId = this.getLastId();
            var newObjectId = lastObjectId + 1;
            this.setLastId(newObjectId);
            return newObjectId;
        }
        getLastId() {
            return this.attributeList.getAttribute(STSEngine.ServiceAttributeType.LastId);
        }
        setLastId(id) {
            this.attributeList.setAttribute(STSEngine.ServiceAttributeType.LastId, id);
        }
        getObject(objectId) {
            if (this.changedObjectList.has(objectId)) {
                return this.changedObjectList.get(objectId);
            }
            return this.objectList.get(objectId);
        }
        addObject(object) {
            var objectId = object.getId();
            this.changedObjectList.set(objectId, object);
        }
        createObject(attributeList) {
            var objectId = this.getNewObjectId();
            attributeList.push(new STSEngine.KeyValuePair(STSEngine.AttributeType.Id, objectId));
            var object = new STSEngine.ObjectImpl(attributeList);
            this.addObject(object);
            return object;
        }
        setObjectList(objectList) {
            for (var attributeList of objectList) {
                this.createObject(attributeList);
            }
        }
        removeObject(objectId) {
            this.changedObjectList.set(objectId, undefined);
        }
        commit() {
            for (var kvp of this.changedObjectList) {
                var key = kvp[0];
                var value = kvp[1];
                if (value === null || value === undefined) {
                    this.objectList.delete(key);
                }
                else {
                    this.objectList.set(key, value);
                }
            }
            this.changedObjectList.clear();
            for (var o of this.objectList.values()) {
                o.commit();
            }
        }
        rollback() {
            this.changedObjectList.clear();
            for (var o of this.objectList.values()) {
                o.rollback();
            }
        }
        isDirty() {
            if (this.changedObjectList.size > 0) {
                return true;
            }
            for (var o of this.objectList.values()) {
                if (o.isDirty()) {
                    return true;
                }
            }
            return false;
        }
        getAll(condition) {
            return this.filterService.getAll(this.changedObjectList.values(), condition);
        }
        getFirst(condition) {
            return this.filterService.getFirst(this.changedObjectList.values(), condition);
        }
    }
    STSEngine.ObjectListService = ObjectListService;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class PointService {
        copy(point) {
            return new STSEngine.Point(point.getX(), point.getY());
        }
        add(p1, p2) {
            return new STSEngine.Point(p1.getX() + p2.getX(), p1.getY() + p2.getY());
        }
        substract(p1, p2) {
            return new STSEngine.Point(p1.getX() - p2.getX(), p1.getY() - p2.getY());
        }
    }
    STSEngine.PointService = PointService;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class WebSocketGameClient {
        constructor(socket, playerAction) {
            this.commandListService = new STSEngine.CommandListService();
            this.socket = socket;
            this.playerAction = playerAction;
            this.sid = playerAction.getPlayerId().toString();
            this.playerAction.setOnAction(this.onPlayerAction.bind(this));
            this.init();
        }
        init() {
            var world = this.createWorld();
            this.engine = new STSEngine.Engine(world, this.commandListService);
            this.socket.onopen = this.onOpen.bind(this);
            this.socket.onmessage = this.onMessage.bind(this);
            this.socket.onclose = this.onClose.bind(this);
            this.socket.onerror = this.onError.bind(this);
        }
        getWorld() {
            return this.engine.getWorld();
        }
        onPlayerAction(playerAction) {
            var commandList = playerAction.getCommandKeyValuePairList();
            playerAction.clear();
            var attributeList = [];
            attributeList.push(new STSEngine.KeyValuePair(STSEngine.AttributeType.CommandList, commandList));
            var message = new STSEngine.ClientServerMessage(STSEngine.ClientMessageType.CommandList, attributeList);
            this.sendMessage(message);
        }
        onOpen(ev) {
        }
        onMessage(ev) {
            var message = JSON.parse(ev.data);
            this.processServerMessage(message);
        }
        processServerMessage(message) {
            switch (message.messageType) {
                case STSEngine.ServerMessageType.RequestAuthentication:
                    this.sendAuthentication();
                    break;
                case STSEngine.ServerMessageType.Tick:
                    this.processTick(message.attributeList);
            }
        }
        sendAuthentication() {
            var attributeList = [];
            attributeList.push(new STSEngine.KeyValuePair(STSEngine.AttributeType.SID, this.sid));
            var message = new STSEngine.ClientServerMessage(STSEngine.ClientMessageType.ResponseAuthentication, attributeList);
            this.sendMessage(message);
        }
        processTick(attributeList) {
            var commandList = attributeList[1].value;
            this.commandListService.setCommandList(commandList);
            this.engine.step();
        }
        createWorld() {
            var settings = this.createWorldSettings();
            return new STSEngine.World(settings);
        }
        createWorldSettings() {
            var settings = [];
            settings.push(new STSEngine.KeyValuePair("moveStepSize", 10));
            return new STSEngine.WorldSettings(settings);
        }
        onClose(ev) {
        }
        onError(ev) {
        }
        sendMessage(message) {
            this.socket.send(JSON.stringify(message));
        }
    }
    STSEngine.WebSocketGameClient = WebSocketGameClient;
})(STSEngine || (STSEngine = {}));
