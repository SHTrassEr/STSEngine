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
        constructor(id, objectType) {
            this.id = id;
            this.objectType = objectType;
        }
        getId() {
            return this.id;
        }
        getObjectType() {
            return this.objectType;
        }
        setObjectType(objectType) {
            this.objectType = objectType;
        }
        getMoveDirection() {
            return this.moveDirection;
        }
        setMoveDirection(moveDirection) {
            this.moveDirection = moveDirection;
        }
        getPosition() {
            return this.position;
        }
        setPosition(position) {
            this.position = position;
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
        setObject(objectStatus) {
            this.objectListService.setObject(objectStatus);
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
            this.currentObjectList = new Map();
            this.newObjectList = new Map();
        }
        getCurrentObject(id) {
            return this.currentObjectList.get(id);
        }
        getObject(id) {
            return this.newObjectList.get(id);
        }
        setObject(object) {
            var objectId = object.getId();
            this.newObjectList.set(objectId, object);
        }
        commitChanges() {
            for (var newObject of this.newObjectList.values()) {
                var objectId = newObject.getId();
                this.currentObjectList.set(objectId, newObject);
            }
            this.newObjectList.clear();
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