'use strict';
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
    class Entity {
        constructor(attributeList, kvpList) {
            this.lastAttributeId = 0;
            this._type = ++this.lastAttributeId;
            this._id = ++this.lastAttributeId;
            if (attributeList) {
                this.attributeList = attributeList;
            }
            else {
                this.attributeList = new STSEngine.AttributeListArray();
            }
            if (kvpList) {
                this.attributeList.setList(kvpList);
            }
        }
        getType() {
            return this.attributeList.get(this._type);
        }
        setType(type) {
            this.attributeList.set(this._type, type);
        }
        getId() {
            return this.attributeList.get(this._id);
        }
        setId(id) {
            this.attributeList.set(this._id, id);
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
    STSEngine.Entity = Entity;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class Client extends STSEngine.Entity {
        constructor(attributeList, kvpList) {
            super(attributeList, kvpList);
            this.attributeNameId = ++this.lastAttributeId;
        }
        getName() {
            return this.attributeList.get(this.attributeNameId);
        }
        setName(name) {
            this.attributeList.set(this.attributeNameId, name);
        }
    }
    STSEngine.Client = Client;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class EntityListService {
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
        getTyped(objectId, type) {
            let object = this.get(objectId);
            if (object instanceof type) {
                return object;
            }
            return undefined;
        }
    }
    STSEngine.EntityListService = EntityListService;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ClientListService extends STSEngine.EntityListService {
    }
    STSEngine.ClientListService = ClientListService;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class Command extends STSEngine.Entity {
        constructor() {
            super(...arguments);
            this._initiatorId = ++this.lastAttributeId;
        }
        getInitiatorId() {
            return this.attributeList.get(this._initiatorId);
        }
        setInitiatorId(id) {
            this.attributeList.set(this._initiatorId, id);
        }
    }
    STSEngine.Command = Command;
    var CommandType;
    (function (CommandType) {
        let lastTypeId = 0;
        function getNewTypeId() {
            return ++lastTypeId;
        }
        CommandType.getNewTypeId = getNewTypeId;
    })(CommandType = STSEngine.CommandType || (STSEngine.CommandType = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class CommandDispatcher {
        constructor() {
            this.commandHandlerList = [];
        }
        execute(command) {
            let handler = this.commandHandlerList[command.getType()];
            if (handler.isValid(command)) {
                handler.execute(command);
            }
        }
    }
    STSEngine.CommandDispatcher = CommandDispatcher;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class CommandHandler {
        constructor(worldServiceList) {
            this.worldServiceList = worldServiceList;
        }
        execute(command) {
            if (this.isValidCommandType(command)) {
                this.executeCommand(command);
            }
        }
        isValid(command) {
            if (this.isValidCommandType(command)) {
                return this.isValidCommand(command);
            }
            return false;
        }
        executeCommand(command) {
        }
        isValidCommand(command) {
            return true;
        }
        isValidCommandType(command) {
            return true;
        }
        startProcess(process) {
            this.worldServiceList.getProcessListService().add(process);
            this.worldServiceList.getProcessDispatcher().init(process);
        }
        finishProcess(process) {
            this.worldServiceList.getProcessDispatcher().finish(process);
        }
    }
    STSEngine.CommandHandler = CommandHandler;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class EntityInitializer {
        constructor(createIdHandler) {
            this.itemAttributeType = 1;
            this.createIdHandler = createIdHandler;
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
        createId() {
            return this.createIdHandler();
        }
    }
    STSEngine.EntityInitializer = EntityInitializer;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class CommandInitializer extends STSEngine.EntityInitializer {
    }
    STSEngine.CommandInitializer = CommandInitializer;
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
    class AttributeListArray {
        constructor() {
            this.attributeList = [];
        }
        get(attribute, defaultValue) {
            if (attribute >= 0 && attribute < this.attributeList.length) {
                let value = this.attributeList[attribute];
                if (value !== undefined) {
                    return this.attributeList[attribute];
                }
            }
            return defaultValue;
        }
        set(attribute, value) {
            this.attributeList[attribute] = value;
        }
        setList(attributeList) {
            for (let kvp of attributeList) {
                this.set(kvp[0], kvp[1]);
            }
        }
        rollback() {
        }
        commit() {
        }
        isDirty() {
            return false;
        }
        *getIterator() {
            for (let key = 0; key < this.attributeList.length; key++) {
                let value = this.attributeList[key];
                if (value !== undefined) {
                    yield [key, value];
                }
            }
        }
        has(attribute) {
            if (attribute >= 0 && attribute < this.attributeList.length) {
                if (this.attributeList[attribute] !== undefined) {
                    return true;
                }
            }
            return false;
        }
        delete(attribute) {
            this.attributeList[attribute] = undefined;
        }
        getList() {
            let list = [];
            for (let key = 0; key < this.attributeList.length; key++) {
                let value = this.attributeList[key];
                if (value !== null && value !== undefined) {
                    list.push([key, value]);
                }
            }
            return list;
        }
    }
    STSEngine.AttributeListArray = AttributeListArray;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class AttributeListMap {
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
    STSEngine.AttributeListMap = AttributeListMap;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class AttributeListMapCommitable {
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
    STSEngine.AttributeListMapCommitable = AttributeListMapCommitable;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class Item extends STSEngine.Entity {
    }
    STSEngine.Item = Item;
    var ItemType;
    (function (ItemType) {
        let lastTypeId = 0;
        function getNewTypeId() {
            return ++lastTypeId;
        }
        ItemType.getNewTypeId = getNewTypeId;
    })(ItemType = STSEngine.ItemType || (STSEngine.ItemType = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ItemInitializer extends STSEngine.EntityInitializer {
    }
    STSEngine.ItemInitializer = ItemInitializer;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ItemListService extends STSEngine.EntityListService {
    }
    STSEngine.ItemListService = ItemListService;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ClientServerMessage extends STSEngine.Entity {
    }
    STSEngine.ClientServerMessage = ClientServerMessage;
    var ClientServerMessageType;
    (function (ClientServerMessageType) {
        let lastTypeId = 0;
        function getNewTypeId() {
            return ++lastTypeId;
        }
        ClientServerMessageType.getNewTypeId = getNewTypeId;
    })(ClientServerMessageType = STSEngine.ClientServerMessageType || (STSEngine.ClientServerMessageType = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ClientServerMessageCommandList extends STSEngine.ClientServerMessage {
        constructor(attributeList, kvpList) {
            super(attributeList, kvpList);
            this._commandList = ++this.lastAttributeId;
            this.setType(ClientServerMessageType.CommandList);
        }
        setCommandList(commandList) {
            this.attributeList.set(this._commandList, commandList);
        }
        getCommandList() {
            return this.attributeList.get(this._commandList);
        }
    }
    STSEngine.ClientServerMessageCommandList = ClientServerMessageCommandList;
    var ClientServerMessageType;
    (function (ClientServerMessageType) {
        ClientServerMessageType.CommandList = ClientServerMessageType.getNewTypeId();
    })(ClientServerMessageType = STSEngine.ClientServerMessageType || (STSEngine.ClientServerMessageType = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ClientServerMessageInit extends STSEngine.ClientServerMessage {
        constructor(attributeList, kvpList) {
            super(attributeList, kvpList);
            this._playerId = ++this.lastAttributeId;
            this.setType(ClientServerMessageType.Init);
        }
        setPlayerId(playerId) {
            this.attributeList.set(this._playerId, playerId);
        }
        getPlayerId() {
            return this.attributeList.get(this._playerId);
        }
    }
    STSEngine.ClientServerMessageInit = ClientServerMessageInit;
    var ClientServerMessageType;
    (function (ClientServerMessageType) {
        ClientServerMessageType.Init = ClientServerMessageType.getNewTypeId();
    })(ClientServerMessageType = STSEngine.ClientServerMessageType || (STSEngine.ClientServerMessageType = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ClientServerMessageInitializer extends STSEngine.EntityInitializer {
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
            return new STSEngine.AttributeListArray();
        }
    }
    STSEngine.ClientServerMessageInitializer = ClientServerMessageInitializer;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ClientServerMessageRequestAuthentication extends STSEngine.ClientServerMessage {
        constructor(attributeList, kvpList) {
            super(attributeList, kvpList);
            this.setType(ClientServerMessageType.RequestAuthentication);
        }
    }
    STSEngine.ClientServerMessageRequestAuthentication = ClientServerMessageRequestAuthentication;
    var ClientServerMessageType;
    (function (ClientServerMessageType) {
        ClientServerMessageType.RequestAuthentication = ClientServerMessageType.getNewTypeId();
    })(ClientServerMessageType = STSEngine.ClientServerMessageType || (STSEngine.ClientServerMessageType = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ClientServerMessageResponseAuthentication extends STSEngine.ClientServerMessage {
        constructor(attributeList, kvpList) {
            super(attributeList, kvpList);
            this._sid = ++this.lastAttributeId;
            this.setType(ClientServerMessageType.ResponseAuthentication);
        }
        setSID(sid) {
            this.attributeList.set(this._sid, sid);
        }
        getSID() {
            return this.attributeList.get(this._sid);
        }
    }
    STSEngine.ClientServerMessageResponseAuthentication = ClientServerMessageResponseAuthentication;
    var ClientServerMessageType;
    (function (ClientServerMessageType) {
        ClientServerMessageType.ResponseAuthentication = ClientServerMessageType.getNewTypeId();
    })(ClientServerMessageType = STSEngine.ClientServerMessageType || (STSEngine.ClientServerMessageType = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ClientServerMessageStep extends STSEngine.ClientServerMessage {
        constructor(attributeList, kvpList) {
            super(attributeList, kvpList);
            this._commandList = ++this.lastAttributeId;
            this._stepNumber = ++this.lastAttributeId;
            this.setType(ClientServerMessageType.Step);
        }
        setCommandList(commandList) {
            let commandAttributeList = [];
            if (commandList) {
                for (let command of commandList) {
                    commandAttributeList.push(command.getList());
                }
            }
            this.attributeList.set(this._commandList, commandAttributeList);
        }
        getCommandList() {
            return this.attributeList.get(this._commandList);
        }
        getStepNumber() {
            return this.attributeList.get(this._stepNumber);
        }
        setStepNumber(stepNumber) {
            this.attributeList.set(this._stepNumber, stepNumber);
        }
    }
    STSEngine.ClientServerMessageStep = ClientServerMessageStep;
    var ClientServerMessageType;
    (function (ClientServerMessageType) {
        ClientServerMessageType.Step = ClientServerMessageType.getNewTypeId();
    })(ClientServerMessageType = STSEngine.ClientServerMessageType || (STSEngine.ClientServerMessageType = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ClientServerMessageStepList extends STSEngine.ClientServerMessage {
        constructor(attributeList, kvpList) {
            super(attributeList, kvpList);
            this._stepList = ++this.lastAttributeId;
            this.setType(ClientServerMessageType.StepList);
        }
        setStepList(stepList) {
            let stepAttributeList = [];
            if (stepList) {
                for (let step of stepList) {
                    stepAttributeList.push(step.getList());
                }
            }
            this.attributeList.set(this._stepList, stepAttributeList);
        }
        getStepList() {
            return this.attributeList.get(this._stepList);
        }
    }
    STSEngine.ClientServerMessageStepList = ClientServerMessageStepList;
    var ClientServerMessageType;
    (function (ClientServerMessageType) {
        ClientServerMessageType.StepList = ClientServerMessageType.getNewTypeId();
    })(ClientServerMessageType = STSEngine.ClientServerMessageType || (STSEngine.ClientServerMessageType = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class Process extends STSEngine.Entity {
        constructor(attributeList, kvpList) {
            super(attributeList, kvpList);
            this._processStatus = ++this.lastAttributeId;
            this._execCount = ++this.lastAttributeId;
            this.setProcessStatus(STSEngine.ProcessStatus.Init);
        }
        getProcessStatus() {
            return this.attributeList.get(this._processStatus);
        }
        setProcessStatus(processStatus) {
            this.attributeList.set(this._processStatus, processStatus);
        }
        getProcessExecCount() {
            return this.attributeList.get(this._execCount, 0);
        }
        setProcessExecCount(execCount) {
            this.attributeList.set(this._execCount, execCount);
        }
    }
    STSEngine.Process = Process;
    var ProcessType;
    (function (ProcessType) {
        let lastTypeId = 0;
        function getNewTypeId() {
            return ++lastTypeId;
        }
        ProcessType.getNewTypeId = getNewTypeId;
    })(ProcessType = STSEngine.ProcessType || (STSEngine.ProcessType = {}));
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ProcessDispatcher {
        execute(process) {
            let processStatus = process.getProcessStatus();
            if (processStatus === STSEngine.ProcessStatus.Executing) {
                let handler = this.getProcessHandler(process);
                handler.execute(process);
            }
        }
        init(process) {
            let processStatus = process.getProcessStatus();
            if (processStatus === STSEngine.ProcessStatus.Init) {
                let handler = this.getProcessHandler(process);
                handler.init(process);
            }
        }
        finish(process) {
            let processStatus = process.getProcessStatus();
            if (processStatus !== STSEngine.ProcessStatus.Finished) {
                let handler = this.getProcessHandler(process);
                handler.finish(process);
            }
        }
        getProcessHandler(process) {
            return this.processHandlerList[process.getType()];
        }
    }
    STSEngine.ProcessDispatcher = ProcessDispatcher;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ProcessHandler {
        constructor(worldServiceList) {
            this.worldServiceList = worldServiceList;
        }
        init(process) {
            if (this.isValidProcessType(process)) {
                this.initProcess(process);
            }
        }
        execute(process) {
            if (this.isValidProcessType(process)) {
                this.executeProcess(process);
                process.setProcessExecCount(process.getProcessExecCount() + 1);
            }
        }
        finish(process) {
            if (this.isValidProcessType(process)) {
                this.finishProcess(process);
            }
        }
        initProcess(process) {
        }
        executeProcess(process) {
        }
        finishProcess(process) {
        }
        isValidProcessType(command) {
            return true;
        }
        startProcess(process) {
            this.worldServiceList.getProcessListService().add(process);
            this.worldServiceList.getProcessDispatcher().init(process);
        }
    }
    STSEngine.ProcessHandler = ProcessHandler;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class ProcessInitializer extends STSEngine.EntityInitializer {
    }
    STSEngine.ProcessInitializer = ProcessInitializer;
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
            this.attributeList.setStepNumber(0);
        }
        getServiceList() {
            return this.worldServiceList;
        }
        getAttributeList() {
            return this.attributeList;
        }
    }
    STSEngine.World = World;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class WorldAttributeList extends STSEngine.Entity {
        constructor() {
            super(...arguments);
            this._tickLength = ++this.lastAttributeId;
            this._processId = ++this.lastAttributeId;
            this._lastObjectId = ++this.lastAttributeId;
            this._stepNumber = ++this.lastAttributeId;
        }
        getTickLength() {
            return this.attributeList.get(this._tickLength, 50);
        }
        setTickLength(tickLength) {
            this.attributeList.set(this._tickLength, tickLength);
        }
        getLastProcessId() {
            return this.attributeList.get(this._processId, 0);
        }
        setLastProcessId(id) {
            this.attributeList.set(this._processId, id);
        }
        getLastObjectId() {
            return this.attributeList.get(this._lastObjectId, 0);
        }
        setLastObjectId(id) {
            this.attributeList.set(this._lastObjectId, id);
        }
        getStepNumber() {
            return this.attributeList.get(this._stepNumber, 0);
        }
        setStepNumber(stepNumber) {
            this.attributeList.set(this._stepNumber, stepNumber);
        }
    }
    STSEngine.WorldAttributeList = WorldAttributeList;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class WorldServiceList {
        getWorldAttributeList() {
            return this.worldAttributeList;
        }
        getCommandInitializer() {
            return this.commandInitializer;
        }
        getItemInitializer() {
            return this.itemInitializer;
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
        getClientListService() {
            return this.clientListService;
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
            this.increaseStepNumber();
            this.processCommandList();
            for (let i = 0; i < this.processListService.getProcessList().length; i++) {
                let process = this.processListService.getProcessList()[i];
                this.processDispatcher.execute(process);
            }
            this.processListService.removeFinished();
        }
        increaseStepNumber() {
            let stepNumber = this.world.getAttributeList().getStepNumber() + 1;
            this.world.getAttributeList().setStepNumber(stepNumber);
        }
        getCommandList() {
            return this.commandListService.getCommandList();
        }
        processCommandList() {
            let commandList = this.commandListService.getCommandList();
            for (let command of commandList) {
                this.commandDispatcher.execute(command);
            }
            this.commandListService.clear();
        }
    }
    STSEngine.Engine = Engine;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    class EntityListServiceCommitable {
        constructor() {
            this.deletedObjectIdList = new Set();
            this.objectListService = new STSEngine.EntityListService();
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
        getTyped(objectId, type) {
            let object = this.get(objectId);
            if (object instanceof type) {
                return object;
            }
            return undefined;
        }
    }
    STSEngine.EntityListServiceCommitable = EntityListServiceCommitable;
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
            return this.engine.getWorld().getAttributeList().getStepNumber();
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
            return new STSEngine.Command(new STSEngine.AttributeListArray(), attr);
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
var STSEngine;
(function (STSEngine) {
    class View {
        constructor(rootElement, world) {
            this.world = world;
            let worldServiceList = world.getServiceList();
            this.rootElement = rootElement;
            this.clearHtmlElement(this.rootElement);
            this.worldAttributeList = worldServiceList.getWorldAttributeList();
            this.itemListService = worldServiceList.getItemListService();
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
