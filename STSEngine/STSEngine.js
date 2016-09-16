var settings = new Map();
var worldSettings = new STSEngine.WorldSettingsImpl(settings);
settings.set("moveStepSize", 10);
var objectStateListService = new STSEngine.ObjectListServiceImpl();
var world = new STSEngine.WorldImpl(worldSettings, objectStateListService);
// 7, add, blow
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class CommandImpl {
        constructor(commandType, paramList) {
            this.paramList = paramList;
            this.commandType = commandType;
        }
        getParamList() {
            return this.paramList;
        }
        getCommandType() {
            return this.commandType;
        }
    }
    STSEngine.CommandImpl = CommandImpl;
})(STSEngine || (STSEngine = {}));
var CommonConstants;
(function (CommonConstants) {
    "use strict";
    class Position {
        static getGridSize() {
            return 10;
        }
    }
    CommonConstants.Position = Position;
})(CommonConstants || (CommonConstants = {}));
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
    class AttributeListImpl {
        constructor() {
            this.attributeList = new Map();
            this.changedAttributeList = new Map();
        }
        getAttribute(attribute, defaultValue) {
            if (this.changedAttributeList.has(attribute)) {
                return this.changedAttributeList.get(attribute);
            }
            if (this.attributeList.has(attribute)) {
                return this.attributeList.get(attribute);
            }
            return defaultValue;
        }
        setAttribute(attribute, value) {
            this.attributeList.set(attribute, value);
        }
        hasAttribute(attribute) {
            if (this.changedAttributeList.has(attribute)) {
                return true;
            }
            if (this.attributeList.has(attribute)) {
                return true;
            }
            return false;
        }
        rollback() {
            this.changedAttributeList.clear();
        }
        commit() {
            if (this.isDirty()) {
                for (var kvp of this.changedAttributeList) {
                    var key = kvp[0];
                    var value = kvp[1];
                    if (value === null || value === undefined) {
                        this.attributeList.delete(key);
                    }
                    else {
                        this.attributeList.set(key, value);
                    }
                }
                this.changedAttributeList.clear();
            }
        }
        isDirty() {
            return this.changedAttributeList.size > 0;
        }
        removeAttribute(attribute) {
            this.setAttribute(attribute, undefined);
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
        getKey() {
            return this.key;
        }
        getValue() {
            return this.value;
        }
    }
    STSEngine.KeyValuePairImpl = KeyValuePairImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class ObjectImpl {
        constructor(id) {
            this.attributeList = new STSEngine.AttributeListImpl();
            this.attributeList.setAttribute(STSEngine.ObjectAttributeType.Id, id);
        }
        getAttributeList() {
            return this.attributeList;
        }
        setAttributeList(attributeList) {
            this.attributeList = attributeList;
        }
        getId() {
            return this.attributeList.getAttribute(STSEngine.ObjectAttributeType.Id);
        }
        getObjectType() {
            return this.attributeList.getAttribute(STSEngine.ObjectAttributeType.ObjectType);
        }
        setObjectType(objectType) {
            this.attributeList.setAttribute(STSEngine.ObjectAttributeType.ObjectType, objectType);
        }
        getMoveDirection() {
            return this.attributeList.getAttribute(STSEngine.ObjectAttributeType.MoveDirection);
        }
        setMoveDirection(moveDirection) {
            this.attributeList.setAttribute(STSEngine.ObjectAttributeType.MoveDirection, moveDirection);
        }
        getPosition() {
            return this.attributeList.getAttribute(STSEngine.ObjectAttributeType.Position);
        }
        setPosition(position) {
            this.attributeList.setAttribute(STSEngine.ObjectAttributeType.Position, position);
        }
        //IAttributeList
        getAttribute(attribute, defaultValue) {
            return this.attributeList.getAttribute(attribute, defaultValue);
        }
        setAttribute(attribute, value) {
            this.attributeList.setAttribute(attribute, value);
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
        constructor(worldSettings, objectStateListService) {
            this.worldSettings = worldSettings;
            this.objectStateListService = objectStateListService;
        }
        getSettins() {
            return this.worldSettings;
        }
        getObjectStateListService() {
            return this.objectStateListService;
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
            return (this.settings.get("moveStepSize"));
        }
    }
    STSEngine.WorldSettingsImpl = WorldSettingsImpl;
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
    (function (CommandType) {
        CommandType[CommandType["MoveUp"] = 0] = "MoveUp";
        CommandType[CommandType["MoveDown"] = 1] = "MoveDown";
        CommandType[CommandType["MoveLeft"] = 2] = "MoveLeft";
        CommandType[CommandType["MoveRight"] = 3] = "MoveRight";
    })(STSEngine.CommandType || (STSEngine.CommandType = {}));
    var CommandType = STSEngine.CommandType;
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
    class ObjectAttributeType {
    }
    ObjectAttributeType.Id = "Id";
    ObjectAttributeType.ObjectType = "ObjectType";
    ObjectAttributeType.MoveDirection = "MoveDirection";
    ObjectAttributeType.Position = "Position";
    STSEngine.ObjectAttributeType = ObjectAttributeType;
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
    "use strict";
    class BaseProcessImpl {
        constructor(id, world) {
            this.attributeList = new STSEngine.AttributeListImpl();
            this.id = id;
            this.world = world;
            this.objectListService = world.getObjectStateListService();
            this.worldSettings = world.getSettins();
            this.status = STSEngine.ProcessStatus.Init;
        }
        init() {
        }
        finish() {
        }
        getStatus() {
            return this.status;
        }
        step() {
        }
        isFinished(state) {
            return true;
        }
        getId() {
            return this.id;
        }
        setStatus(status) {
            this.status = status;
        }
        getWorld() {
            return this.world;
        }
        getObjectById(objectId) {
            return this.objectListService.getObject(objectId);
        }
        //IAttributeList
        getAttribute(attribute, defaultValue) {
            return this.attributeList.getAttribute(attribute, defaultValue);
        }
        setAttribute(attribute, value) {
            this.attributeList.setAttribute(attribute, value);
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
    }
    STSEngine.BaseProcessImpl = BaseProcessImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    (function (ProcessStatus) {
        ProcessStatus[ProcessStatus["Init"] = 0] = "Init";
        ProcessStatus[ProcessStatus["Executing"] = 1] = "Executing";
        ProcessStatus[ProcessStatus["Finished"] = 2] = "Finished";
        ProcessStatus[ProcessStatus["Treminated"] = 3] = "Treminated";
    })(STSEngine.ProcessStatus || (STSEngine.ProcessStatus = {}));
    var ProcessStatus = STSEngine.ProcessStatus;
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
    class EngineImpl {
        constructor(world) {
            this.world = world;
        }
        getWorld() {
            return this.world;
        }
        update(commandList) {
        }
    }
    STSEngine.EngineImpl = EngineImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class FilterProcessListServiceImpl {
        filterProcessList(state, isValid) {
            var processList = [];
            var filteredProcesssList = [];
            for (var p of processList) {
                if (isValid(state, p)) {
                    filteredProcesssList.push(p);
                }
            }
            return filteredProcesssList;
        }
    }
    STSEngine.FilterProcessListServiceImpl = FilterProcessListServiceImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class MoveDownObjectProcessImpl extends STSEngine.BaseProcessImpl {
        constructor(id, world, objectId) {
            super(id, world);
            this.objectId = objectId;
        }
        init() {
            var objectStatus = this.getObjectById(this.objectId);
            if (objectStatus.getMoveDirection() & STSEngine.MoveDirection.Down) {
                this.setStatus(STSEngine.ProcessStatus.Finished);
            }
        }
        step() {
        }
        isFinished(state) {
            var position = state.getPosition();
            var gridSize = this.getWorld().getSettins().getMoveStepSize();
            return (position.getY() % gridSize) === 0;
        }
    }
    STSEngine.MoveDownObjectProcessImpl = MoveDownObjectProcessImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class MoveLeftObjectProcessImpl extends STSEngine.BaseProcessImpl {
        step() {
        }
        isFinished(state) {
            var position = state.getPosition();
            var gridSize = this.getWorld().getSettins().getMoveStepSize();
            return (position.getX() % gridSize) === 0;
        }
    }
    STSEngine.MoveLeftObjectProcessImpl = MoveLeftObjectProcessImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class MoveRightObjectProcessImpl extends STSEngine.BaseProcessImpl {
        step() {
            ;
        }
        isFinished(state) {
            var position = state.getPosition();
            var gridSize = this.getWorld().getSettins().getMoveStepSize();
            return (position.getX() % gridSize) === 0;
        }
    }
    STSEngine.MoveRightObjectProcessImpl = MoveRightObjectProcessImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class MoveUpObjectProcessImpl extends STSEngine.BaseProcessImpl {
        step() {
        }
        isFinished(state) {
            var position = state.getPosition();
            var gridSize = this.getWorld().getSettins().getMoveStepSize();
            return (position.getY() % gridSize) === 0;
        }
    }
    STSEngine.MoveUpObjectProcessImpl = MoveUpObjectProcessImpl;
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
    class ObjectListServiceImpl {
        constructor() {
            this.objectList = new Map();
            this.changedObjectList = new Map();
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
    }
    STSEngine.ObjectListServiceImpl = ObjectListServiceImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
    class ProcessListServiceImpl {
    }
    STSEngine.ProcessListServiceImpl = ProcessListServiceImpl;
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
var STSEngine;
(function (STSEngine) {
    "use strict";
})(STSEngine || (STSEngine = {}));
//# sourceMappingURL=STSEngine.js.map