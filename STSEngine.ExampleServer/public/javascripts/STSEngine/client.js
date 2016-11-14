'use strict';
var STSEngine;
(function (STSEngine) {
    (function (CommandAttributeType) {
        CommandAttributeType[CommandAttributeType["Unknown"] = 0] = "Unknown";
        CommandAttributeType[CommandAttributeType["Type"] = 1] = "Type";
        CommandAttributeType[CommandAttributeType["Id"] = 2] = "Id";
        CommandAttributeType[CommandAttributeType["InitiatorId"] = 3] = "InitiatorId";
        CommandAttributeType[CommandAttributeType["ObjectId"] = 4] = "ObjectId";
    })(STSEngine.CommandAttributeType || (STSEngine.CommandAttributeType = {}));
    var CommandAttributeType = STSEngine.CommandAttributeType;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    (function (CommandType) {
        CommandType[CommandType["Unknown"] = 0] = "Unknown";
        CommandType[CommandType["RegisterPlayer"] = 1] = "RegisterPlayer";
    })(STSEngine.CommandType || (STSEngine.CommandType = {}));
    var CommandType = STSEngine.CommandType;
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
    (function (ClientServerMessageAttributeType) {
        ClientServerMessageAttributeType[ClientServerMessageAttributeType["CommandList"] = 20] = "CommandList";
        ClientServerMessageAttributeType[ClientServerMessageAttributeType["PlayerId"] = 21] = "PlayerId";
        ClientServerMessageAttributeType[ClientServerMessageAttributeType["WorldInfo"] = 22] = "WorldInfo";
        ClientServerMessageAttributeType[ClientServerMessageAttributeType["StepNumber"] = 23] = "StepNumber";
        ClientServerMessageAttributeType[ClientServerMessageAttributeType["StepList"] = 24] = "StepList";
        ClientServerMessageAttributeType[ClientServerMessageAttributeType["SID"] = 25] = "SID";
    })(STSEngine.ClientServerMessageAttributeType || (STSEngine.ClientServerMessageAttributeType = {}));
    var ClientServerMessageAttributeType = STSEngine.ClientServerMessageAttributeType;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    (function (ClientServerMessageType) {
        ClientServerMessageType[ClientServerMessageType["Unknown"] = 0] = "Unknown";
        ClientServerMessageType[ClientServerMessageType["RequestAuthentication"] = 1] = "RequestAuthentication";
        ClientServerMessageType[ClientServerMessageType["Init"] = 2] = "Init";
        ClientServerMessageType[ClientServerMessageType["Step"] = 3] = "Step";
        ClientServerMessageType[ClientServerMessageType["StepList"] = 4] = "StepList";
        ClientServerMessageType[ClientServerMessageType["ResponseAuthentication"] = 5] = "ResponseAuthentication";
        ClientServerMessageType[ClientServerMessageType["CommandList"] = 6] = "CommandList";
    })(STSEngine.ClientServerMessageType || (STSEngine.ClientServerMessageType = {}));
    var ClientServerMessageType = STSEngine.ClientServerMessageType;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    (function (ObjectAttributeType) {
        ObjectAttributeType[ObjectAttributeType["Unknown"] = 0] = "Unknown";
        ObjectAttributeType[ObjectAttributeType["Type"] = 1] = "Type";
        ObjectAttributeType[ObjectAttributeType["Id"] = 2] = "Id";
        ObjectAttributeType[ObjectAttributeType["Name"] = 3] = "Name";
    })(STSEngine.ObjectAttributeType || (STSEngine.ObjectAttributeType = {}));
    var ObjectAttributeType = STSEngine.ObjectAttributeType;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    (function (ObjectType) {
        ObjectType[ObjectType["Square"] = 0] = "Square";
        ObjectType[ObjectType["Player"] = 1] = "Player";
    })(STSEngine.ObjectType || (STSEngine.ObjectType = {}));
    var ObjectType = STSEngine.ObjectType;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    (function (ProcessAttributeType) {
        ProcessAttributeType[ProcessAttributeType["Unknown"] = 0] = "Unknown";
        ProcessAttributeType[ProcessAttributeType["Type"] = 1] = "Type";
        ProcessAttributeType[ProcessAttributeType["Id"] = 2] = "Id";
        ProcessAttributeType[ProcessAttributeType["Status"] = 3] = "Status";
        ProcessAttributeType[ProcessAttributeType["ExecCount"] = 4] = "ExecCount";
    })(STSEngine.ProcessAttributeType || (STSEngine.ProcessAttributeType = {}));
    var ProcessAttributeType = STSEngine.ProcessAttributeType;
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
    class Command {
        constructor(attributeList, kvpList) {
            if (attributeList) {
                this.attributeList = attributeList;
            }
            else {
                this.attributeList = new STSEngine.AttributeList();
            }
            if (kvpList) {
                this.attributeList.setList(kvpList);
            }
        }
        getCommandType() {
            return this.attributeList.get(STSEngine.CommandAttributeType.Type);
        }
        setCommandType(commandType) {
            this.attributeList.set(STSEngine.CommandAttributeType.Type, commandType);
        }
        getInitiatorId() {
            return this.attributeList.get(STSEngine.CommandAttributeType.InitiatorId);
        }
        setInitiatorId(id) {
            this.attributeList.set(STSEngine.CommandAttributeType.InitiatorId, id);
        }
        getList() {
            return this.attributeList.getList();
        }
        getIterator() {
            return this.attributeList.getIterator();
        }
        getAttributeList() {
            return this.attributeList;
        }
    }
    STSEngine.Command = Command;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class CommandDispatcher {
        constructor() {
            this.commandHandlerList = [];
        }
        execute(world, command) {
            let handler = this.commandHandlerList[command.getCommandType()];
            if (handler.isValid(world, command)) {
                handler.execute(world, command);
            }
        }
    }
    STSEngine.CommandDispatcher = CommandDispatcher;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class CommandHandler {
        execute(world, command) {
            if (this.isValidCommandType(world, command)) {
                this.executeCommand(world, command);
            }
        }
        isValid(world, command) {
            if (this.isValidCommandType(world, command)) {
                return this.isValidCommand(world, command);
            }
            return false;
        }
        executeCommand(world, command) {
        }
        isValidCommand(world, command) {
            return true;
        }
        isValidCommandType(world, command) {
            return true;
        }
        startProcess(world, process) {
            world.getServiceList().getProcessListService().add(process);
            world.getServiceList().getProcessDispatcher().init(world, process);
        }
        finishProcess(world, process) {
            world.getServiceList().getProcessDispatcher().finish(world, process);
        }
        getObject(world, objectId, type) {
            let object = world.getServiceList().getObjectListService().get(objectId);
            if (object instanceof type) {
                return object;
            }
            return undefined;
        }
    }
    STSEngine.CommandHandler = CommandHandler;
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
        add(command) {
            this.commandList.push(command);
        }
        setCommandList(commandList) {
            for (let command of commandList) {
                this.add(command);
            }
        }
        getCommandKeyValuePairList() {
            let list = [];
            for (let command of this.commandList) {
                list.push(command.getList());
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
    class AttributeList {
        constructor() {
            this.attributeList = new Map();
        }
        get(attribute, defaultValue) {
            if (this.attributeList.has(attribute)) {
                return this.attributeList.get(attribute);
            }
            return defaultValue;
        }
        set(attribute, value) {
            this.attributeList.set(attribute, value);
        }
        setList(attributeList) {
            for (let kvp of attributeList) {
                this.attributeList.set(kvp[0], kvp[1]);
            }
        }
        rollback() {
        }
        commit() {
        }
        isDirty() {
            return false;
        }
        getIterator() {
            return this.attributeList.entries();
        }
        has(attribute) {
            return this.attributeList.has(attribute);
        }
        delete(attribute) {
            this.attributeList.delete(attribute);
        }
        getList() {
            let list = [];
            for (let kvp of this.attributeList) {
                if (kvp[1] !== null && kvp[1] !== undefined) {
                    list.push(kvp);
                }
            }
            return list;
        }
    }
    STSEngine.AttributeList = AttributeList;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class AttributeListCommitable {
        constructor() {
            this.commitedAttributeList = new Map();
            this.attributeList = new Map();
            this.deletedAttributeList = new Set();
        }
        get(attribute, defaultValue) {
            if (!this.deletedAttributeList.has(attribute)) {
                if (this.attributeList.has(attribute)) {
                    return this.attributeList.get(attribute);
                }
                if (this.commitedAttributeList.has(attribute)) {
                    return this.commitedAttributeList.get(attribute);
                }
            }
            return defaultValue;
        }
        set(attribute, value) {
            this.attributeList.set(attribute, value);
            this.deletedAttributeList.delete(attribute);
        }
        setList(attributeList) {
            for (let kvp of attributeList) {
                this.attributeList.set(kvp[0], kvp[1]);
            }
        }
        has(attribute) {
            if (!this.deletedAttributeList.has(attribute)) {
                if (this.attributeList.has(attribute)) {
                    return true;
                }
                if (this.commitedAttributeList.has(attribute)) {
                    return true;
                }
            }
            return false;
        }
        rollback() {
            this.attributeList.clear();
            this.deletedAttributeList.clear();
        }
        commit() {
            if (this.isDirty()) {
                for (let kvp of this.attributeList) {
                    this.commitedAttributeList.set(kvp[0], kvp[1]);
                }
                for (let attribute of this.deletedAttributeList) {
                    this.commitedAttributeList.delete(attribute);
                }
                this.attributeList.clear();
                this.deletedAttributeList.clear();
            }
        }
        isDirty() {
            return (this.attributeList.size > 0) || (this.deletedAttributeList.size > 0);
        }
        delete(attribute) {
            this.attributeList.delete(attribute);
            if (this.commitedAttributeList.has(attribute)) {
                this.deletedAttributeList.add(attribute);
            }
        }
        getIterator() {
            return this.attributeList.entries();
        }
        getList() {
            let list = [];
            for (let kvp of this.attributeList) {
                list.push(kvp);
            }
            for (let kvp of this.commitedAttributeList) {
                let attribute = kvp[0];
                let value = kvp[1];
                if (!this.attributeList.has(attribute) && !this.deletedAttributeList.has(attribute)) {
                    list.push(kvp);
                }
            }
            return list;
        }
    }
    STSEngine.AttributeListCommitable = AttributeListCommitable;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ObjectImpl {
        constructor(attributeList, kvpList) {
            if (attributeList) {
                this.attributeList = attributeList;
            }
            else {
                this.attributeList = new STSEngine.AttributeList();
            }
            if (kvpList) {
                this.attributeList.setList(kvpList);
            }
        }
        getId() {
            return this.attributeList.get(STSEngine.ObjectAttributeType.Id);
        }
        setId(id) {
            this.attributeList.set(STSEngine.ObjectAttributeType.Id, id);
        }
        getType() {
            return this.attributeList.get(STSEngine.ObjectAttributeType.Type);
        }
        setType(type) {
            this.attributeList.set(STSEngine.ObjectAttributeType.Type, type);
        }
        getList() {
            return this.attributeList.getList();
        }
        getIterator() {
            return this.attributeList.getIterator();
        }
        getAttributeList() {
            return this.attributeList;
        }
    }
    STSEngine.ObjectImpl = ObjectImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ClientServerMessage extends STSEngine.ObjectImpl {
    }
    STSEngine.ClientServerMessage = ClientServerMessage;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ClientServerMessageCommandList extends STSEngine.ClientServerMessage {
        constructor(attributeList, kvpList) {
            super(attributeList, kvpList);
            this.setType(STSEngine.ClientServerMessageType.CommandList);
        }
        setCommandList(commandList) {
            this.attributeList.set(STSEngine.ClientServerMessageAttributeType.CommandList, commandList);
        }
        getCommandList() {
            return this.attributeList.get(STSEngine.ClientServerMessageAttributeType.CommandList);
        }
    }
    STSEngine.ClientServerMessageCommandList = ClientServerMessageCommandList;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ClientServerMessageInit extends STSEngine.ClientServerMessage {
        constructor(attributeList, kvpList) {
            super(attributeList, kvpList);
            this.setType(STSEngine.ClientServerMessageType.Init);
        }
        setPlayerId(playerId) {
            this.attributeList.set(STSEngine.ClientServerMessageAttributeType.PlayerId, playerId);
        }
        getPlayerId() {
            return this.attributeList.get(STSEngine.ClientServerMessageAttributeType.PlayerId);
        }
    }
    STSEngine.ClientServerMessageInit = ClientServerMessageInit;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ItemInitializer {
        constructor(itemAttributeType) {
            this.itemAttributeType = itemAttributeType;
        }
        create(attr) {
            if (attr instanceof Number) {
                return this.createByType(attr);
            }
            return this.createByAttr(attr);
        }
        getItemType(attr) {
            for (var kvp of attr) {
                if (kvp[0] == this.itemAttributeType) {
                    return kvp[1];
                }
            }
            return 0;
        }
        *createList(attrList) {
            for (let attr of attrList) {
                yield this.create(attr);
            }
        }
        createByAttr(attr) {
            var itemType = this.getItemType(attr);
            return this.createByType(itemType, attr);
        }
        setGetIdHandler(getId) {
            this.getId = getId;
        }
    }
    STSEngine.ItemInitializer = ItemInitializer;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ClientServerMessageInitializer extends STSEngine.ItemInitializer {
        constructor() {
            super(STSEngine.ObjectAttributeType.Type);
        }
        createByType(type, attr) {
            switch (type) {
                case STSEngine.ClientServerMessageType.CommandList:
                    return this.createCommandList(attr);
                case STSEngine.ClientServerMessageType.RequestAuthentication:
                    return this.createRequestAuthentication(attr);
                case STSEngine.ClientServerMessageType.ResponseAuthentication:
                    return this.createResponseAuthentication(attr);
                case STSEngine.ClientServerMessageType.Step:
                    return this.createStep(attr);
                case STSEngine.ClientServerMessageType.StepList:
                    return this.createStepList(attr);
                case STSEngine.ClientServerMessageType.Init:
                    return this.createInit(attr);
            }
            throw 'Unexpected command type: ' + type;
        }
        createCommandList(attr) {
            return new STSEngine.ClientServerMessageCommandList(this.createAttributeList(), attr);
        }
        createRequestAuthentication(attr) {
            return new STSEngine.ClientServerMessageRequestAuthentication(this.createAttributeList(), attr);
        }
        createResponseAuthentication(attr) {
            return new STSEngine.ClientServerMessageResponseAuthentication(this.createAttributeList(), attr);
        }
        createStep(attr) {
            return new STSEngine.ClientServerMessageStep(this.createAttributeList(), attr);
        }
        createInit(attr) {
            return new STSEngine.ClientServerMessageInit(this.createAttributeList(), attr);
        }
        createStepList(attr) {
            return new STSEngine.ClientServerMessageStepList(this.createAttributeList(), attr);
        }
        createAttributeList() {
            return new STSEngine.AttributeList();
        }
    }
    STSEngine.ClientServerMessageInitializer = ClientServerMessageInitializer;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ClientServerMessageRequestAuthentication extends STSEngine.ClientServerMessage {
        constructor(attributeList, kvpList) {
            super(attributeList, kvpList);
            this.setType(STSEngine.ClientServerMessageType.RequestAuthentication);
        }
    }
    STSEngine.ClientServerMessageRequestAuthentication = ClientServerMessageRequestAuthentication;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ClientServerMessageResponseAuthentication extends STSEngine.ClientServerMessage {
        constructor(attributeList, kvpList) {
            super(attributeList, kvpList);
            this.setType(STSEngine.ClientServerMessageType.ResponseAuthentication);
        }
        setSID(sid) {
            this.attributeList.set(STSEngine.ClientServerMessageAttributeType.SID, sid);
        }
        getSID() {
            return this.attributeList.get(STSEngine.ClientServerMessageAttributeType.SID);
        }
    }
    STSEngine.ClientServerMessageResponseAuthentication = ClientServerMessageResponseAuthentication;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ClientServerMessageStep extends STSEngine.ClientServerMessage {
        constructor(attributeList, kvpList) {
            super(attributeList, kvpList);
            this.setType(STSEngine.ClientServerMessageType.Step);
        }
        setCommandList(commandList) {
            let commandAttributeList = [];
            if (commandList) {
                for (let command of commandList) {
                    commandAttributeList.push(command.getList());
                }
            }
            this.attributeList.set(STSEngine.ClientServerMessageAttributeType.CommandList, commandAttributeList);
        }
        getCommandList() {
            return this.attributeList.get(STSEngine.ClientServerMessageAttributeType.CommandList);
        }
        getStepNumber() {
            return this.attributeList.get(STSEngine.ClientServerMessageAttributeType.StepNumber);
        }
        setStepNumber(stepNumber) {
            this.attributeList.set(STSEngine.ClientServerMessageAttributeType.StepNumber, stepNumber);
        }
    }
    STSEngine.ClientServerMessageStep = ClientServerMessageStep;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ClientServerMessageStepList extends STSEngine.ClientServerMessage {
        constructor(attributeList, kvpList) {
            super(attributeList, kvpList);
            this.setType(STSEngine.ClientServerMessageType.StepList);
        }
        setStepList(stepList) {
            let stepAttributeList = [];
            if (stepList) {
                for (let step of stepList) {
                    stepAttributeList.push(step.getList());
                }
            }
            this.attributeList.set(STSEngine.ClientServerMessageAttributeType.StepList, stepAttributeList);
        }
        getStepList() {
            return this.attributeList.get(STSEngine.ClientServerMessageAttributeType.StepList);
        }
    }
    STSEngine.ClientServerMessageStepList = ClientServerMessageStepList;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ObjectListService {
        constructor() {
            this.objectList = new Map();
            this.filterService = new STSEngine.FilterService();
        }
        init(objectList) {
            this.objectList.clear();
            for (let object of objectList) {
                this.add(object);
            }
        }
        get(objectId) {
            return this.objectList.get(objectId);
        }
        getSize() {
            return this.objectList.size;
        }
        add(object) {
            let objectId = object.getId();
            this.objectList.set(objectId, object);
        }
        has(id) {
            return this.objectList.has(id);
        }
        remove(id) {
            this.objectList.delete(id);
        }
        clear() {
            this.objectList.clear();
        }
        getIterator() {
            return this.objectList.values();
        }
        getAll(condition) {
            return this.filterService.getAll(this.objectList.values(), condition);
        }
        getFirst(condition) {
            return this.filterService.getFirst(this.objectList.values(), condition);
        }
    }
    STSEngine.ObjectListService = ObjectListService;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ObjectListServiceCommitable {
        constructor() {
            this.deletedObjectIdList = new Set();
            this.objectListService = new STSEngine.ObjectListService();
            this.filterService = new STSEngine.FilterService();
        }
        init(objectList) {
            this.clear();
            this.objectListService.init(objectList);
        }
        get(id) {
            if (!this.deletedObjectIdList.has(id)) {
                return this.objectListService.get(id);
            }
            return undefined;
        }
        has(id) {
            if (!this.deletedObjectIdList.has(id)) {
                return this.objectListService.has(id);
            }
            return false;
        }
        getSize() {
            return (this.objectListService.getSize() - this.deletedObjectIdList.size);
        }
        add(object) {
            this.objectListService.add(object);
            this.newObjectIdList.add(object.getId());
        }
        isObjectNotDeleted(object) {
            return !this.deletedObjectIdList.has(object.getId());
        }
        getIterator() {
            return this.filterService.getAll(this.objectListService.getIterator(), this.isObjectNotDeleted.bind(this));
        }
        remove(id) {
            if (this.objectListService.has(id) && !this.deletedObjectIdList.has(id)) {
                this.deletedObjectIdList.add(id);
            }
        }
        clear() {
            this.objectListService.clear();
            this.deletedObjectIdList.clear();
            this.newObjectIdList.clear();
        }
        commit() {
            for (let objectId of this.deletedObjectIdList) {
                this.objectListService.remove(objectId);
            }
            this.newObjectIdList.clear();
            this.deletedObjectIdList.clear();
            for (let o of this.objectListService.getIterator()) {
                o.getAttributeList().commit();
            }
        }
        rollback() {
            for (let objectId of this.newObjectIdList) {
                this.objectListService.remove(objectId);
            }
            this.newObjectIdList.clear();
            this.deletedObjectIdList.clear();
            for (let o of this.objectListService.getIterator()) {
                o.getAttributeList().rollback();
            }
        }
        isDirty() {
            if (this.newObjectIdList.size > 0) {
                return true;
            }
            if (this.deletedObjectIdList.size > 0) {
                return true;
            }
            for (let o of this.objectListService.getIterator()) {
                if (o.getAttributeList().isDirty()) {
                    return true;
                }
            }
            return false;
        }
        getAll(condition) {
            return this.filterService.getAll(this.getIterator(), condition);
        }
        getFirst(condition) {
            return this.filterService.getFirst(this.getIterator(), condition);
        }
    }
    STSEngine.ObjectListServiceCommitable = ObjectListServiceCommitable;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class Player extends STSEngine.ObjectImpl {
        constructor(attributeList, kvpList) {
            super(attributeList, kvpList);
            this.setType(STSEngine.ObjectType.Player);
        }
        getName() {
            return this.attributeList.get(STSEngine.ObjectAttributeType.Name);
        }
        setName(name) {
            this.attributeList.set(STSEngine.ObjectAttributeType.Name, name);
        }
    }
    STSEngine.Player = Player;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ProcessDispatcher {
        execute(world, process) {
            let processStatus = process.getProcessStatus();
            if (processStatus === STSEngine.ProcessStatus.Executing) {
                let handler = this.getProcessHandler(process);
                handler.execute(world, process);
            }
        }
        init(world, process) {
            let processStatus = process.getProcessStatus();
            if (processStatus === STSEngine.ProcessStatus.Init) {
                let handler = this.getProcessHandler(process);
                handler.init(world, process);
            }
        }
        finish(world, process) {
            let processStatus = process.getProcessStatus();
            if (processStatus !== STSEngine.ProcessStatus.Finished) {
                let handler = this.getProcessHandler(process);
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
    class ProcessHandler {
        init(world, process) {
            if (this.isValidProcessType(world, process)) {
                this.initProcess(world, process);
            }
        }
        execute(world, process) {
            if (this.isValidProcessType(world, process)) {
                this.executeProcess(world, process);
                process.setProcessExecCount(process.getProcessExecCount() + 1);
            }
        }
        finish(world, process) {
            if (this.isValidProcessType(world, process)) {
                this.finishProcess(world, process);
            }
        }
        initProcess(world, process) {
        }
        executeProcess(world, process) {
        }
        finishProcess(world, process) {
        }
        isValidProcessType(world, command) {
            return true;
        }
        addObject(world, object) {
            world.getServiceList().getObjectListService().add(object);
        }
        getObject(world, objectId, type) {
            let object = world.getServiceList().getObjectListService().get(objectId);
            if (object instanceof type) {
                return object;
            }
            return undefined;
        }
        startProcess(world, process) {
            world.getServiceList().getProcessListService().add(process);
            world.getServiceList().getProcessDispatcher().init(world, process);
        }
    }
    STSEngine.ProcessHandler = ProcessHandler;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ProcessImpl {
        constructor(attributeList, kvpList) {
            if (attributeList) {
                this.attributeList = attributeList;
            }
            else {
                this.attributeList = new STSEngine.AttributeList();
            }
            if (kvpList) {
                this.attributeList.setList(kvpList);
            }
            this.setProcessStatus(STSEngine.ProcessStatus.Init);
        }
        getId() {
            return this.attributeList.get(STSEngine.ProcessAttributeType.Id);
        }
        setId(id) {
            this.attributeList.set(STSEngine.ProcessAttributeType.Id, id);
        }
        getProcessType() {
            return this.attributeList.get(STSEngine.ProcessAttributeType.Type);
        }
        setProcessType(processType) {
            this.attributeList.set(STSEngine.ProcessAttributeType.Type, processType);
        }
        getProcessStatus() {
            return this.attributeList.get(STSEngine.ProcessAttributeType.Status);
        }
        setProcessStatus(processStatus) {
            this.attributeList.set(STSEngine.ProcessAttributeType.Status, processStatus);
        }
        getProcessExecCount() {
            return this.attributeList.get(STSEngine.ProcessAttributeType.ExecCount, 0);
        }
        setProcessExecCount(execCount) {
            this.attributeList.set(STSEngine.ProcessAttributeType.ExecCount, execCount);
        }
        getList() {
            return this.attributeList.getList();
        }
        getIterator() {
            return this.attributeList.getIterator();
        }
        getAttributeList() {
            return this.attributeList;
        }
    }
    STSEngine.ProcessImpl = ProcessImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ProcessListService {
        constructor() {
            this.processList = [];
            this.filterService = new STSEngine.FilterService();
        }
        init(processList) {
            this.processList = [];
            for (let p of processList) {
                this.add(p);
            }
        }
        getProcessList() {
            return this.processList;
        }
        add(process) {
            this.processList.push(process);
        }
        removeFinished() {
            let list;
            for (let i = this.processList.length - 1; i >= 0; i--) {
                let process = this.processList[i];
                if (process.getProcessStatus() == STSEngine.ProcessStatus.Finished) {
                    this.processList.splice(i, 1);
                }
            }
        }
        getIterator() {
            return this.processList.values();
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
    class ProcessListServiceCommitable {
        constructor() {
            this.processList = [];
            this.filterService = new STSEngine.FilterService();
            this.firstUncommitedIndex = 0;
        }
        getProcessList() {
            return this.processList;
        }
        add(process) {
            this.processList.push(process);
        }
        init(processList) {
            this.processList = [];
            for (let p of processList) {
                this.add(p);
            }
        }
        removeFinished() {
            let list;
            for (let i = this.firstUncommitedIndex - 1; i >= 0; i--) {
                let process = this.processList[i];
                if (process.getProcessStatus() == STSEngine.ProcessStatus.Finished) {
                    this.processList.splice(i, 1);
                    this.firstUncommitedIndex--;
                }
            }
        }
        getIterator() {
            return this.processList.values();
        }
        commit() {
            for (let process of this.processList) {
                process.getAttributeList().commit();
            }
            this.firstUncommitedIndex = this.processList.length;
        }
        rollback() {
            if (this.processList.length > this.firstUncommitedIndex) {
                this.processList.splice(this.firstUncommitedIndex);
            }
            for (let process of this.processList) {
                process.getAttributeList().rollback();
            }
        }
        isDirty() {
            if (this.processList.length > this.firstUncommitedIndex) {
                return true;
            }
            for (let process of this.processList) {
                if (process.getAttributeList().isDirty()) {
                    return true;
                }
            }
            return false;
        }
        getAll(condition) {
            return this.filterService.getAll(this.processList.values(), condition);
        }
        getFirst(condition) {
            return this.filterService.getFirst(this.processList.values(), condition);
        }
    }
    STSEngine.ProcessListServiceCommitable = ProcessListServiceCommitable;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class World {
        constructor(worldSettings) {
            this.attributeList = worldSettings.getWorldAttributeList();
            this.worldServiceList = worldSettings;
            this.setStepNumber(0);
        }
        getServiceList() {
            return this.worldServiceList;
        }
        getAttributeList() {
            return this.attributeList;
        }
        getStepNumber() {
            return this.stepNumber;
        }
        setStepNumber(stepNumber) {
            this.stepNumber = stepNumber;
        }
        increaseStepNumber() {
            let stepNumber = this.getStepNumber() + 1;
            this.setStepNumber(stepNumber);
        }
        getCommandInitializer() {
            return (this.getServiceList().getCommandInitializer());
        }
        getProcessInitializer() {
            return (this.getServiceList().getProcessInitializer());
        }
        getObjectInitializer() {
            return (this.getServiceList().getObjectInitializer());
        }
    }
    STSEngine.World = World;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class WorldAttributeList {
        constructor(attributeList, kvpList) {
            if (attributeList) {
                this.attributeList = attributeList;
            }
            else {
                this.attributeList = new STSEngine.AttributeList();
            }
            if (kvpList) {
                this.attributeList.setList(kvpList);
            }
        }
        getTickLength() {
            return this.attributeList.get(STSEngine.WorldAttributeType.TickLength, 50);
        }
        getList() {
            return this.attributeList.getList();
        }
        getIterator() {
            return this.attributeList.getIterator();
        }
        getAttributeList() {
            return this.attributeList;
        }
        getLastProcessId() {
            return this.attributeList.get(STSEngine.WorldAttributeType.LastProcessId, 0);
        }
        setLastProcessId(id) {
            this.attributeList.set(STSEngine.WorldAttributeType.LastProcessId, id);
        }
        getLastObjectId() {
            return this.attributeList.get(STSEngine.WorldAttributeType.LastObjectId, 0);
        }
        setLastObjectId(id) {
            this.attributeList.set(STSEngine.WorldAttributeType.LastObjectId, id);
        }
    }
    STSEngine.WorldAttributeList = WorldAttributeList;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    (function (WorldAttributeType) {
        WorldAttributeType[WorldAttributeType["Unknown"] = 0] = "Unknown";
        WorldAttributeType[WorldAttributeType["TickLength"] = 1] = "TickLength";
        WorldAttributeType[WorldAttributeType["LastProcessId"] = 2] = "LastProcessId";
        WorldAttributeType[WorldAttributeType["LastObjectId"] = 3] = "LastObjectId";
    })(STSEngine.WorldAttributeType || (STSEngine.WorldAttributeType = {}));
    var WorldAttributeType = STSEngine.WorldAttributeType;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class WorldServiceList {
        constructor(worldAttributeList, commandInitializator, objectInitializator, processInitializator, processDispatcher, commandDispatcher, objectListService, processListService, playerListService) {
            this.worldAttributeList = worldAttributeList;
            this.commandInitializer = commandInitializator;
            this.objectInitializer = objectInitializator;
            this.objectInitializer.setGetIdHandler(this.getObjectId.bind(this));
            this.processInitializer = processInitializator;
            this.processInitializer.setGetIdHandler(this.getProcessId.bind(this));
            this.processDispatcher = processDispatcher;
            this.commandDispatcher = commandDispatcher;
            this.objectListService = objectListService;
            this.processListService = processListService;
            this.playerListService = playerListService;
        }
        getWorldAttributeList() {
            return this.worldAttributeList;
        }
        getCommandInitializer() {
            return this.commandInitializer;
        }
        getObjectInitializer() {
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
        getObjectListService() {
            return this.objectListService;
        }
        getProcessListService() {
            return this.processListService;
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
    STSEngine.WorldServiceList = WorldServiceList;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class Engine {
        constructor(world, commandListService) {
            this.world = world;
            this.commandListService = commandListService;
            this.processListService = world.getServiceList().getProcessListService();
            this.processDispatcher = world.getServiceList().getProcessDispatcher();
            this.commandDispatcher = world.getServiceList().getCommandDispatcher();
        }
        getWorld() {
            return this.world;
        }
        step() {
            this.world.increaseStepNumber();
            this.processCommandList();
            for (let i = 0; i < this.processListService.getProcessList().length; i++) {
                let process = this.processListService.getProcessList()[i];
                this.processDispatcher.execute(this.world, process);
            }
            this.processListService.removeFinished();
        }
        getCommandList() {
            return this.commandListService.getCommandList();
        }
        processCommandList() {
            let commandList = this.commandListService.getCommandList();
            for (let command of commandList) {
                this.commandDispatcher.execute(this.world, command);
            }
            this.commandListService.clear();
        }
        addProcessList(processList) {
            if (processList) {
                for (var process of processList) {
                    this.processListService.add(process);
                    this.processDispatcher.init(this.world, process);
                }
            }
        }
    }
    STSEngine.Engine = Engine;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class FilterService {
        *getAll(itemList, condition) {
            for (let item of itemList) {
                if (condition(item)) {
                    yield item;
                }
            }
        }
        getFirst(itemList, condition) {
            for (let item of itemList) {
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
            var tickLength = engine.getWorld().getAttributeList().getTickLength();
            this.metronome = new STSEngine.Metronome(tickLength);
            this.commandLog = [];
            this.emptyCommandList = [];
            this.timerId = 0;
        }
        start() {
            let world = this.engine.getWorld();
            this.metronome.start();
            this.timerId = setInterval(() => this.updateWorld(), 10);
        }
        getCommandLog(startStepNumber) {
            return this.commandLog;
        }
        updateWorld() {
            let metronomeStepNumber = this.metronome.getTickCount();
            let currentStepNumber = this.getStepNumber();
            while (currentStepNumber < metronomeStepNumber) {
                currentStepNumber += 1;
                let commandList = this.engine.getCommandList();
                this.commandLog[currentStepNumber] = commandList;
                if (this.onUpdateWorld) {
                    this.onUpdateWorld(this.engine.getWorld(), currentStepNumber, commandList);
                }
                this.engine.step();
            }
        }
        getStepNumber() {
            let world = this.engine.getWorld();
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
                let pauseEnd = Date.now();
                this.pauseLength += (pauseEnd - this.pauseStart);
                this.isPaused = false;
            }
        }
        getTickLength() {
            return this.tickLength;
        }
        getTickCount() {
            let totalTime = Date.now() - this.startTime - this.pauseLength;
            return Math.floor(totalTime / this.tickLength);
        }
    }
    STSEngine.Metronome = Metronome;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class PlayerAction {
        constructor() {
            this.commandListService = new STSEngine.CommandListService();
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
    class View {
        constructor(rootElement, world) {
            this.world = world;
            let worldServiceList = world.getServiceList();
            this.rootElement = rootElement;
            this.clearHtmlElement(this.rootElement);
            this.worldAttributeList = worldServiceList.getWorldAttributeList();
            this.objectListService = worldServiceList.getObjectListService();
            this.processListService = worldServiceList.getProcessListService();
            this.isStarted = false;
        }
        setPlayerId(playerId) {
            this.playerId = playerId;
        }
        clearHtmlElement(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }
        draw() {
            if (this.isStarted) {
                this.refresh();
                requestAnimationFrame(this.draw.bind(this));
            }
        }
        start() {
            this.isStarted = true;
            this.draw();
        }
        stop() {
            this.isStarted = false;
        }
    }
    STSEngine.View = View;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class WebSocketGameClient {
        constructor(socket, sid, playerAction, worldServiceList, clientSeverMessageInitializer) {
            this.clientSeverMessageInitializer = clientSeverMessageInitializer;
            this.worldServiceList = worldServiceList;
            this.commandListService = new STSEngine.CommandListService();
            this.socket = socket;
            this.playerAction = playerAction;
            this.sid = sid;
            this.playerAction.setOnAction(this.onPlayerAction.bind(this));
            this.init();
        }
        getPlayerId() {
            return this.playerId;
        }
        setOnConnected(handler) {
            this.onConnectedHandler = handler;
        }
        commandInitializator(attr) {
            return new STSEngine.Command(new STSEngine.AttributeList(), attr);
        }
        init() {
            let world = this.createWorld();
            this.engine = new STSEngine.Engine(world, this.commandListService);
            this.socket.onopen = this.onOpen.bind(this);
            this.socket.onmessage = this.onMessage.bind(this);
            this.socket.onclose = this.onClose.bind(this);
            this.socket.onerror = this.onError.bind(this);
        }
        createWorld() {
            return new STSEngine.World(this.worldServiceList);
        }
        getWorld() {
            return this.engine.getWorld();
        }
        onPlayerAction(playerAction) {
            let commandList = playerAction.getCommandKeyValuePairList();
            playerAction.clear();
            var message = new STSEngine.ClientServerMessageCommandList();
            message.setCommandList(commandList);
            this.sendMessage(message);
        }
        onOpen(ev) {
        }
        onMessage(ev) {
            let message = JSON.parse(ev.data);
            this.processServerMessage(message);
        }
        processServerMessage(attr) {
            let message = this.clientSeverMessageInitializer.create(attr);
            switch (message.getType()) {
                case STSEngine.ClientServerMessageType.RequestAuthentication:
                    this.sendAuthentication();
                    break;
                case STSEngine.ClientServerMessageType.Init:
                    this.processInit(message);
                    break;
                case STSEngine.ClientServerMessageType.Step:
                    this.processStep(message);
                    break;
                case STSEngine.ClientServerMessageType.StepList:
                    this.processStepList(message);
                    break;
            }
        }
        sendAuthentication() {
            let message = new STSEngine.ClientServerMessageResponseAuthentication();
            message.setSID(this.sid);
            this.sendMessage(message);
        }
        processStep(message) {
            let commandListAttr = message.getCommandList();
            let commandList = this.worldServiceList.getCommandInitializer().createList(commandListAttr);
            this.commandListService.setCommandList(commandList);
            this.engine.step();
        }
        processStepList(message) {
            var stepListAttr = message.getStepList();
            var stepList = this.clientSeverMessageInitializer.createList(stepListAttr);
            for (var step of stepList) {
                this.processStep(step);
            }
        }
        processInit(message) {
            this.playerId = message.getPlayerId();
            if (this.onConnectedHandler) {
                this.onConnectedHandler(this);
            }
        }
        onClose(ev) {
        }
        onError(ev) {
        }
        sendMessage(message) {
            this.socket.send(JSON.stringify(message.getList()));
        }
    }
    STSEngine.WebSocketGameClient = WebSocketGameClient;
})(STSEngine || (STSEngine = {}));
