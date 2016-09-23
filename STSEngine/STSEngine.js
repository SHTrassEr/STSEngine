var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class ServiceAttributeType {
    }
    ServiceAttributeType.LastId = "LastId";
    STSEngine.ServiceAttributeType = ServiceAttributeType;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class EngineImpl {
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
    STSEngine.EngineImpl = EngineImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class FilterServiceImpl {
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
    STSEngine.FilterServiceImpl = FilterServiceImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class GameServerImpl {
        constructor(engine) {
            this.engine = engine;
            this.metronome = new STSEngine.MetronomeImpl(100);
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
    STSEngine.GameServerImpl = GameServerImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class MetronomeImpl {
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
    STSEngine.MetronomeImpl = MetronomeImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class ObjectListServiceImpl {
        constructor() {
            this.objectList = new Map();
            this.changedObjectList = new Map();
            this.attributeList = new STSEngine.AttributeListImpl();
            this.filterService = new STSEngine.FilterServiceImpl();
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
            this.attributeList.setAttribute(STSEngine.ServiceAttributeType.LastId, 0);
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
            attributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.Id, objectId));
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
            return this.filterService.getAll(this.objectList.values(), condition);
        }
        getFirst(condition) {
            return this.filterService.getFirst(this.objectList.values(), condition);
        }
    }
    STSEngine.ObjectListServiceImpl = ObjectListServiceImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class PointServiceImpl {
        copy(point) {
            return new STSEngine.PointImpl(point.getX(), point.getY());
        }
        add(p1, p2) {
            return new STSEngine.PointImpl(p1.getX() + p2.getX(), p1.getY() + p2.getY());
        }
        substract(p1, p2) {
            return new STSEngine.PointImpl(p1.getX() - p2.getX(), p1.getY() - p2.getY());
        }
    }
    STSEngine.PointServiceImpl = PointServiceImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    (function (ProcessStatus) {
        ProcessStatus[ProcessStatus["Init"] = 0] = "Init";
        ProcessStatus[ProcessStatus["Executing"] = 1] = "Executing";
        ProcessStatus[ProcessStatus["Finished"] = 2] = "Finished";
    })(STSEngine.ProcessStatus || (STSEngine.ProcessStatus = {}));
    var ProcessStatus = STSEngine.ProcessStatus;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
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
    "use strict";
    class ProcessCreateObjectImpl {
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
    STSEngine.ProcessCreateObjectImpl = ProcessCreateObjectImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class ProcessDispatcherImpl {
        constructor() {
            this.initProcessHandlerList();
        }
        initProcessHandlerList() {
            this.processHandlerList = [];
            this.processHandlerList[STSEngine.ProcessType.CreateObject] = new STSEngine.ProcessCreateObjectImpl();
            this.processHandlerList[STSEngine.ProcessType.MoveDown] = new STSEngine.ProcessMoveDownObjectImpl();
            this.processHandlerList[STSEngine.ProcessType.MoveLeft] = new STSEngine.ProcessMoveLeftObjectImpl();
            this.processHandlerList[STSEngine.ProcessType.MoveRight] = new STSEngine.ProcessMoveRightObjectImpl();
            this.processHandlerList[STSEngine.ProcessType.MoveUp] = new STSEngine.ProcessMoveUpObjectImpl();
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
    STSEngine.ProcessDispatcherImpl = ProcessDispatcherImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class ProcessImpl {
        constructor(attributeList) {
            this.attributeList = new STSEngine.AttributeListImpl();
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
        //IAttributeList
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
    "use strict";
    class ProcessListServiceImpl {
        constructor() {
            this.commitedProcessList = [];
            this.processList = [];
            this.attributeList = new STSEngine.AttributeListImpl();
            this.filterService = new STSEngine.FilterServiceImpl();
            this.setLastId(0);
        }
        getProcessList() {
            return this.processList;
        }
        addProcess(process) {
            this.processList.push(process);
        }
        createProcess(attributeList) {
            attributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.Id, this.getNewProcessId()));
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
    STSEngine.ProcessListServiceImpl = ProcessListServiceImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class ProcessMoveDownObjectImpl {
        init(world, process) {
            process.setProcessStatus(STSEngine.ProcessStatus.Executing);
        }
        execute(world, process) {
            var objectListService = world.getObjectListService();
            var object = objectListService.getObject(process.getObjectId());
            var position = object.getPosition();
            var newPosition = new STSEngine.PointImpl(position.getX(), position.getY() - 1);
            object.setPosition(newPosition);
        }
        finish(world, process) {
            process.setProcessStatus(STSEngine.ProcessStatus.Finished);
        }
    }
    STSEngine.ProcessMoveDownObjectImpl = ProcessMoveDownObjectImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class ProcessMoveLeftObjectImpl {
        init(world, process) {
            process.setProcessStatus(STSEngine.ProcessStatus.Executing);
        }
        execute(world, process) {
            var objectListService = world.getObjectListService();
            var object = objectListService.getObject(process.getObjectId());
            var position = object.getPosition();
            var newPosition = new STSEngine.PointImpl(position.getX() - 1, position.getY());
            object.setPosition(newPosition);
        }
        finish(world, process) {
            process.setProcessStatus(STSEngine.ProcessStatus.Finished);
        }
    }
    STSEngine.ProcessMoveLeftObjectImpl = ProcessMoveLeftObjectImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class ProcessMoveRightObjectImpl {
        init(world, process) {
            process.setProcessStatus(STSEngine.ProcessStatus.Executing);
        }
        execute(world, process) {
            var objectListService = world.getObjectListService();
            var object = objectListService.getObject(process.getObjectId());
            var position = object.getPosition();
            var newPosition = new STSEngine.PointImpl(position.getX() + 1, position.getY());
            object.setPosition(newPosition);
        }
        finish(world, process) {
            process.setProcessStatus(STSEngine.ProcessStatus.Finished);
        }
    }
    STSEngine.ProcessMoveRightObjectImpl = ProcessMoveRightObjectImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class ProcessMoveUpObjectImpl {
        init(world, process) {
            process.setProcessStatus(STSEngine.ProcessStatus.Executing);
        }
        execute(world, process) {
            var objectListService = world.getObjectListService();
            var object = objectListService.getObject(process.getObjectId());
            var position = object.getPosition();
            var newPosition = new STSEngine.PointImpl(position.getX(), position.getY() + 1);
            object.setPosition(newPosition);
        }
        finish(world, process) {
            process.setProcessStatus(STSEngine.ProcessStatus.Finished);
        }
    }
    STSEngine.ProcessMoveUpObjectImpl = ProcessMoveUpObjectImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
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
/// <reference path="BaseException.ts" />
var STSEngine;
(function (STSEngine) {
    "use strict";
    class NotImplementedException extends STSEngine.BaseException {
        constructor() {
            super();
        }
    }
    STSEngine.NotImplementedException = NotImplementedException;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
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
    STSEngine.AttributeType = AttributeType;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    (function (MoveDirection) {
        MoveDirection[MoveDirection["Up"] = 1] = "Up";
        MoveDirection[MoveDirection["Down"] = 2] = "Down";
        MoveDirection[MoveDirection["Left"] = 4] = "Left";
        MoveDirection[MoveDirection["Right"] = 8] = "Right";
    })(STSEngine.MoveDirection || (STSEngine.MoveDirection = {}));
    var MoveDirection = STSEngine.MoveDirection;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    (function (ObjectType) {
        ObjectType[ObjectType["Square"] = 0] = "Square";
    })(STSEngine.ObjectType || (STSEngine.ObjectType = {}));
    var ObjectType = STSEngine.ObjectType;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class AttributeListImpl {
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
                    list.push(new STSEngine.KeyValuePairImpl(key, value));
                }
            }
            for (var kvp of this.commitedAttributeList) {
                var key = kvp[0];
                var value = kvp[1];
                if (value !== null && value !== undefined) {
                    if (!this.attributeList.has(key)) {
                        list.push(new STSEngine.KeyValuePairImpl(key, value));
                    }
                }
            }
            return list;
        }
    }
    STSEngine.AttributeListImpl = AttributeListImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class KeyValuePairImpl {
        constructor(key, value) {
            this.key = key;
            this.value = value;
        }
    }
    STSEngine.KeyValuePairImpl = KeyValuePairImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class ObjectImpl {
        constructor(attributeList) {
            this.attributeList = new STSEngine.AttributeListImpl();
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
        //IAttributeList
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
    "use strict";
    class PointImpl {
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
    STSEngine.PointImpl = PointImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class WorldImpl {
        constructor(worldSettings, objectListService, processListService) {
            this.worldSettings = worldSettings;
            this.objectListService = objectListService;
            this.processListService = processListService;
            this.attributeList = new STSEngine.AttributeListImpl();
            this.processDispatcher = new STSEngine.ProcessDispatcherImpl();
            this.commandDispatcher = new STSEngine.CommandDispatcherImpl();
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
    STSEngine.WorldImpl = WorldImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class WorldSettingsImpl {
        constructor(settings) {
            this.settings = settings;
        }
        getMoveStepSize() {
            return (this.settings.get("MoveStepSize"));
        }
        getTickLength() {
            return (this.settings.get("TickLength"));
        }
    }
    STSEngine.WorldSettingsImpl = WorldSettingsImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
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
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class CommandCreateObjectImpl {
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
            processAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.ProcessType, STSEngine.ProcessType.CreateObject));
            processAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.ObjectAttributeList, objectAttributeList));
            return processAttributeList;
        }
        isValid(world, command) {
            return command.getPlayerId() === 0;
        }
    }
    STSEngine.CommandCreateObjectImpl = CommandCreateObjectImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class CommandDispatcherImpl {
        constructor() {
            this.initCommandHandlerList();
        }
        initCommandHandlerList() {
            this.commandHandlerList = [];
            this.commandHandlerList[STSEngine.CommandType.CreateObject] = new STSEngine.CommandCreateObjectImpl();
            this.commandHandlerList[STSEngine.CommandType.RegisterPlayer] = new STSEngine.CommandRegisterPlayerImpl();
            this.commandHandlerList[STSEngine.CommandType.StartMoveUp] = new STSEngine.CommandStartMoveObjectImpl();
            this.commandHandlerList[STSEngine.CommandType.StartMoveDown] = new STSEngine.CommandStartMoveObjectImpl();
            this.commandHandlerList[STSEngine.CommandType.StartMoveLeft] = new STSEngine.CommandStartMoveObjectImpl();
            this.commandHandlerList[STSEngine.CommandType.StartMoveRight] = new STSEngine.CommandStartMoveObjectImpl();
            this.commandHandlerList[STSEngine.CommandType.StopMoveUp] = new STSEngine.CommandStopMoveObjectImpl();
            this.commandHandlerList[STSEngine.CommandType.StopMoveDown] = new STSEngine.CommandStopMoveObjectImpl();
            this.commandHandlerList[STSEngine.CommandType.StopMoveLeft] = new STSEngine.CommandStopMoveObjectImpl();
            this.commandHandlerList[STSEngine.CommandType.StopMoveRight] = new STSEngine.CommandStopMoveObjectImpl();
        }
        execute(world, command) {
            var handler = this.commandHandlerList[command.getCommandType()];
            if (handler.isValid(world, command)) {
                handler.execute(world, command);
            }
        }
    }
    STSEngine.CommandDispatcherImpl = CommandDispatcherImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class CommandImpl {
        constructor(attributeList) {
            this.attributeList = new STSEngine.AttributeListImpl();
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
        //IAttributeList
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
    STSEngine.CommandImpl = CommandImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class CommandListServiceImpl {
        constructor() {
            this.commandList = [];
        }
        getCommandList() {
            return this.commandList;
        }
        createCommand(attributeList) {
            var command = new STSEngine.CommandImpl(attributeList);
            this.commandList.push(command);
            return command;
        }
        setCommandList(commandList) {
            for (var attributeList of commandList) {
                this.createCommand(attributeList);
            }
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
    STSEngine.CommandListServiceImpl = CommandListServiceImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class CommandRegisterPlayerImpl {
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
            objectAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.PlayerId, newPlayerId));
            objectAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.Position, new STSEngine.PointImpl(0, 0)));
            return objectAttributeList;
        }
        createProcessAttributeList(world, objectAttributeList) {
            var processAttributeList = [];
            processAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.ProcessType, STSEngine.ProcessType.CreateObject));
            processAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.ObjectAttributeList, objectAttributeList));
            return processAttributeList;
        }
        isValid(world, command) {
            return command.getPlayerId() === 0;
        }
    }
    STSEngine.CommandRegisterPlayerImpl = CommandRegisterPlayerImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class CommandStartMoveObjectImpl {
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
            processAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.ProcessType, processType));
            var objectId = command.getAttribute(STSEngine.AttributeType.ObjectId);
            processAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.ObjectId, objectId));
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
    STSEngine.CommandStartMoveObjectImpl = CommandStartMoveObjectImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class CommandStopMoveObjectImpl {
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
    STSEngine.CommandStopMoveObjectImpl = CommandStopMoveObjectImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
/// <reference path="../IPlayerAction.ts" />
var STSEngine;
(function (STSEngine) {
    class PlayerActionImpl {
        constructor(playerId, commandListService) {
            this.playerId = playerId;
            this.commandListService = commandListService;
        }
        //ds     
        getPlayerId() {
            return this.playerId;
        }
        createAttributeList(commandType) {
            var list = [];
            list.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.PlayerId, this.playerId));
            list.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.CommandType, commandType));
            return list;
        }
        addObjectIdAttribute(attributeList, objectId) {
            attributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.ObjectId, objectId));
        }
        startMoveRight(objectId) {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StartMoveRight);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
        }
        startMoveLeft(objectId) {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StartMoveLeft);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
        }
        startMoveUp(objectId) {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StartMoveUp);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
        }
        startMoveDown(objectId) {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StartMoveDown);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
        }
        stopMoveRight(objectId) {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StopMoveRight);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
        }
        stopMoveLeft(objectId) {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StopMoveLeft);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
        }
        stopMoveUp(objectId) {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StopMoveUp);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
        }
        stopMoveDown(objectId) {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StopMoveDown);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
        }
    }
    STSEngine.PlayerActionImpl = PlayerActionImpl;
})(STSEngine || (STSEngine = {}));
//export = STSEngine;
//# sourceMappingURL=STSEngine.js.map