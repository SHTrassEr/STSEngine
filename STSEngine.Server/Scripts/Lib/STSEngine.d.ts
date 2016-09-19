declare namespace STSEngine {
    interface IPlayerAction {
        getPlayerId(): number;
        startMoveRight(objectId: number): void;
        startMoveLeft(objectId: number): void;
        startMoveUp(objectId: number): void;
        startMoveDown(objectId: number): void;
        stopMoveRight(objectId: number): void;
        stopMoveLeft(objectId: number): void;
        stopMoveUp(objectId: number): void;
        stopMoveDown(objectId: number): void;
    }
}
declare namespace STSEngine {
    class PlayerActionImpl implements IPlayerAction {
        protected commandListService: ICommandListService;
        protected playerId: number;
        constructor(playerId: number, commandListService: ICommandListService);
        getPlayerId(): number;
        protected createAttributeList(): IKeyValuePair[];
        protected addObjectIdAttribute(attributeList: IKeyValuePair[], objectId: number): void;
        startMoveRight(objectId: number): void;
        startMoveLeft(objectId: number): void;
        startMoveUp(objectId: number): void;
        startMoveDown(objectId: number): void;
        stopMoveRight(objectId: number): void;
        stopMoveLeft(objectId: number): void;
        stopMoveUp(objectId: number): void;
        stopMoveDown(objectId: number): void;
    }
}
declare namespace STSEngine {
    interface ICommand extends IAttributeList {
        getCommandType(): CommandType;
        getPlayerId(): number;
    }
}
declare namespace STSEngine {
    interface ICommandDispatcher {
        execute(world: IWorld, command: ICommand): void;
    }
}
declare namespace STSEngine {
    interface ICommandHandler {
        execute(world: IWorld, command: ICommand): void;
        isValid(world: IWorld, command: ICommand): boolean;
    }
}
declare namespace STSEngine {
    class CommandRegisterPlayerImpl implements ICommandHandler {
        execute(world: IWorld, command: ICommand): void;
        protected createObjectAttributeList(world: IWorld, command: ICommand): IKeyValuePair[];
        protected createProcessAttributeList(world: IWorld, objectAttributeList: IKeyValuePair[]): Map<string, any>;
        isValid(world: IWorld, command: ICommand): boolean;
    }
}
declare namespace STSEngine {
    class CommandCreateObjectImpl implements ICommandHandler {
        execute(world: IWorld, command: ICommand): void;
        protected createObjectAttributeList(world: IWorld, command: ICommand): Map<string, any>;
        protected createProcessAttributeList(world: IWorld, objectAttributeList: Map<string, any>): Map<string, any>;
        isValid(world: IWorld, command: ICommand): boolean;
    }
}
declare namespace STSEngine {
    class CommandListServiceImpl implements ICommandListService {
        protected commandList: ICommand[];
        protected filterService: IFilterService<ICommand>;
        constructor();
        getCommandList(): ICommand[];
        createCommand(commandType: CommandType, playerId: number, attributeList?: Map<string, any> | IKeyValuePair[]): ICommand;
        clear(): void;
        getAll(condition: (item: ICommand) => boolean): ICommand[];
        getFirst(condition: (item: ICommand) => boolean): ICommand;
    }
}
declare namespace STSEngine {
    class CommandStartMoveObjectImpl implements ICommandHandler {
        execute(world: IWorld, command: ICommand): void;
        protected getProcessType(command: ICommand): ProcessType;
        protected createProcessAttributeList(world: IWorld, command: ICommand): Map<string, any>;
        isValid(world: IWorld, command: ICommand): boolean;
    }
}
declare namespace STSEngine {
    class CommandStopMoveObjectImpl implements ICommandHandler {
        execute(world: IWorld, command: ICommand): void;
        protected getProcessType(command: ICommand): ProcessType;
        isValid(world: IWorld, command: ICommand): boolean;
    }
}
declare namespace STSEngine {
    class CommandDispatcherImpl implements ICommandDispatcher {
        protected commandHandlerList: ICommandHandler[];
        constructor();
        protected initCommandHandlerList(): void;
        execute(world: IWorld, command: ICommand): void;
    }
}
declare namespace STSEngine {
    class CommandImpl implements ICommand {
        protected attributeList: IAttributeList;
        constructor(commandType: CommandType, playerId: number, attributeList?: Map<string, any> | IKeyValuePair[]);
        getCommandType(): CommandType;
        protected setCommandType(commandType: CommandType): void;
        getPlayerId(): number;
        protected setPlayerId(playerId: number): void;
        getAttribute(attribute: string, defaultValue?: any): any;
        setAttribute(attribute: string, value: any): void;
        setAttributeList(attributeList: Map<string, any> | IKeyValuePair[]): void;
        hasAttribute(attribute: string): boolean;
        rollback(): void;
        commit(): void;
        isDirty(): boolean;
        removeAttribute(attribute: string): void;
    }
}
declare namespace STSEngine {
    interface ICommandListService extends IFilterable<ICommand> {
        getCommandList(): ICommand[];
        createCommand(commandType: CommandType, playerId: number, attributeList?: Map<string, any> | IKeyValuePair[]): ICommand;
        clear(): void;
    }
}
declare namespace STSEngine {
    interface IAttributeList extends ICommitable {
        getAttribute(attribute: string, defaultValue?: any): any;
        setAttribute(attribute: string, value: any): void;
        setAttributeList(attributeList: Map<string, any> | IKeyValuePair[]): void;
        hasAttribute(attribute: string): boolean;
        removeAttribute(attribute: string): void;
    }
}
declare namespace STSEngine {
    interface IFilterable<T> {
        getAll(condition: (item: T) => boolean): T[];
        getFirst(condition: (item: T) => boolean): T;
    }
}
declare namespace STSEngine {
    interface ICommitable {
        commit(): void;
        rollback(): void;
        isDirty(): boolean;
    }
}
declare namespace STSEngine {
    interface IKeyValuePair {
        getKey(): string;
        getValue(): any;
    }
}
declare namespace STSEngine {
    class AttributeListImpl implements IAttributeList {
        protected attributeList: Map<string, any>;
        protected changedAttributeList: Map<string, any>;
        constructor();
        getAttribute(attribute: string, defaultValue?: any): any;
        setAttribute(attribute: string, value: any): void;
        setAttributeList(attributeList: Map<string, any> | IKeyValuePair[]): void;
        protected setAttributeListMap(attributeList: Map<string, any>): void;
        protected setAttributeListArray(attributeList: IKeyValuePair[]): void;
        hasAttribute(attribute: string): boolean;
        rollback(): void;
        commit(): void;
        isDirty(): boolean;
        removeAttribute(attribute: string): void;
    }
}
declare namespace STSEngine {
    class KeyValuePairImpl implements IKeyValuePair {
        private key;
        private value;
        constructor(key: string, value: any);
        getKey(): string;
        getValue(): any;
    }
}
declare namespace STSEngine {
    class ObjectImpl implements IObject {
        protected attributeList: IAttributeList;
        constructor(id: number, attributeList?: Map<string, any> | IKeyValuePair[]);
        getAttributeList(): IAttributeList;
        getId(): number;
        getObjectType(): ObjectType;
        setObjectType(objectType: ObjectType): void;
        getMoveDirection(): number;
        setMoveDirection(moveDirection: number): void;
        getPosition(): IPoint;
        setPosition(position: IPoint): void;
        getPlayerId(): number;
        setPlayerId(playerId: number): void;
        getAttribute(attribute: string, defaultValue?: any): any;
        setAttribute(attribute: string, value: any): void;
        setAttributeList(attributeList: Map<string, any> | IKeyValuePair[]): void;
        hasAttribute(attribute: string): boolean;
        rollback(): void;
        commit(): void;
        isDirty(): boolean;
        removeAttribute(attribute: string): void;
    }
}
declare namespace STSEngine {
    class PointImpl implements IPoint {
        private x;
        private y;
        constructor(x: number, y: number);
        getX(): number;
        getY(): number;
    }
}
declare namespace STSEngine {
    class WorldImpl implements IWorld {
        protected worldSettings: IWorldSettings;
        protected objectListService: IObjectListService;
        protected processListService: IProcessListService;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        protected attributeList: IAttributeList;
        constructor(worldSettings: IWorldSettings, objectListService: IObjectListService, processListService: IProcessListService);
        getSettings(): IWorldSettings;
        getObjectListService(): IObjectListService;
        getProcessListService(): IProcessListService;
        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;
        getStepNumber(): number;
        setStepNumber(stepNumber: number): void;
        increaseStepNumber(): void;
        commit(): void;
        rollback(): void;
        isDirty(): boolean;
    }
}
declare namespace STSEngine {
    class WorldSettingsImpl implements IWorldSettings {
        private settings;
        constructor(settings: Map<string, number | string>);
        getMoveStepSize(): number;
        getTickLength(): number;
    }
}
declare namespace STSEngine {
    interface ICommitRollback {
        commit(): void;
        rollback(): void;
        isDurty(): boolean;
    }
}
declare namespace STSEngine {
    interface IObject extends IAttributeList {
        getId(): number;
        getObjectType(): ObjectType;
        setObjectType(objectType: ObjectType): void;
        getMoveDirection(): number;
        setMoveDirection(moveDirection: number): void;
        getPosition(): IPoint;
        setPosition(position: IPoint): void;
        getPlayerId(): number;
        setPlayerId(playerId: number): void;
    }
}
declare namespace STSEngine {
    interface IPoint {
        getX(): number;
        getY(): number;
    }
}
declare namespace STSEngine {
    interface IWorld extends ICommitable {
        getSettings(): IWorldSettings;
        getObjectListService(): IObjectListService;
        getProcessListService(): IProcessListService;
        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;
        getStepNumber(): number;
        setStepNumber(stepNumber: number): void;
        increaseStepNumber(): void;
    }
}
declare namespace STSEngine {
    interface IWorldSettings {
        getMoveStepSize(): number;
        getTickLength(): number;
    }
}
declare namespace STSEngine {
    enum CommandType {
        Unknown = 0,
        CreateObject = 1,
        RegisterPlayer = 2,
        StartMoveUp = 3,
        StartMoveDown = 4,
        StartMoveLeft = 5,
        StartMoveRight = 6,
        StopMoveUp = 7,
        StopMoveDown = 8,
        StopMoveLeft = 9,
        StopMoveRight = 10,
    }
}
declare namespace STSEngine {
    enum MoveDirection {
        Up = 1,
        Down = 2,
        Left = 4,
        Right = 8,
    }
}
declare namespace STSEngine {
    class AttributeType {
        static Id: string;
        static StepNumber: string;
        static ObjectType: string;
        static MoveDirection: string;
        static Position: string;
        static PlayerId: string;
        static NewPlayerId: string;
        static ObjectId: string;
        static ProcessStatus: string;
        static ProcessType: string;
        static Speed: string;
        static ObjectAttributeList: string;
        static CommandType: string;
    }
}
declare namespace STSEngine {
    enum ObjectType {
        Square = 0,
    }
}
declare namespace STSEngine {
    class BaseException {
        private message;
        constructor(message?: string);
        getMessage(): string;
    }
}
declare namespace STSEngine {
    class NotImplementedException extends BaseException {
        constructor();
    }
}
declare namespace STSEngine {
    class ProcessDispatcherImpl implements IProcessDispatcher {
        protected processHandlerList: IProcessHandler[];
        constructor();
        protected initProcessHandlerList(): void;
        execute(world: IWorld, process: IProcess): void;
        init(world: IWorld, process: IProcess): void;
        finish(world: IWorld, process: IProcess): void;
        protected getProcessHandler(process: IProcess): IProcessHandler;
    }
}
declare namespace STSEngine {
    class ProcessMoveRightObjectImpl implements IProcessHandler {
        init(world: IWorld, process: IProcess): void;
        execute(world: IWorld, process: IProcess): void;
        finish(world: IWorld, process: IProcess): void;
    }
}
declare namespace STSEngine {
    class ProcessMoveLeftObjectImpl implements IProcessHandler {
        init(world: IWorld, process: IProcess): void;
        execute(world: IWorld, process: IProcess): void;
        finish(world: IWorld, process: IProcess): void;
    }
}
declare namespace STSEngine {
    class ProcessMoveUpObjectImpl implements IProcessHandler {
        init(world: IWorld, process: IProcess): void;
        execute(world: IWorld, process: IProcess): void;
        finish(world: IWorld, process: IProcess): void;
    }
}
declare namespace STSEngine {
    enum ProcessType {
        Unknown = 0,
        CreateObject = 1,
        MoveUp = 2,
        MoveDown = 3,
        MoveLeft = 4,
        MoveRight = 5,
    }
}
declare namespace STSEngine {
    class ProcessImpl implements IProcess {
        protected attributeList: IAttributeList;
        constructor(id: number, processType: ProcessType, attributeList?: Map<string, any> | IKeyValuePair[]);
        getId(): number;
        protected setId(processId: number): void;
        getProcessType(): ProcessType;
        protected setProcessType(processType: ProcessType): void;
        getProcessStatus(): ProcessStatus;
        setProcessStatus(processStatus: ProcessStatus): void;
        getObjectId(): number;
        setObjectId(objectId: number): void;
        getAttribute(attribute: string, defaultValue?: any): any;
        setAttribute(attribute: string, value: any): void;
        setAttributeList(attributeList: Map<string, any> | IKeyValuePair[]): void;
        hasAttribute(attribute: string): boolean;
        rollback(): void;
        commit(): void;
        isDirty(): boolean;
        removeAttribute(attribute: string): void;
    }
}
declare namespace STSEngine {
    interface IProcessDispatcher {
        init(world: IWorld, process: IProcess): void;
        execute(world: IWorld, process: IProcess): void;
        finish(world: IWorld, process: IProcess): void;
    }
}
declare namespace STSEngine {
    interface IProcessHandler {
        init(world: IWorld, process: IProcess): void;
        execute(world: IWorld, process: IProcess): void;
        finish(world: IWorld, process: IProcess): void;
    }
}
declare namespace STSEngine {
    class ProcessCreateObjectImpl implements IProcessHandler {
        init(world: IWorld, process: IProcess): void;
        execute(world: IWorld, process: IProcess): void;
        finish(world: IWorld, process: IProcess): void;
    }
}
declare namespace STSEngine {
    enum ProcessStatus {
        Init = 0,
        Executing = 1,
        Finished = 2,
    }
}
declare namespace STSEngine {
    interface IEngine {
        getWorld(): IWorld;
        step(): void;
        getCommandList(): ICommand[];
    }
}
declare namespace STSEngine {
    interface IFilterService<T> {
        getAll(itemList: Iterable<T>, condition: (item: T) => boolean): T[];
        getFirst(itemList: Iterable<T>, condition: (item: T) => boolean): T;
    }
}
declare namespace STSEngine {
    interface IGameServer {
        start(): void;
        getCommandLog(startStepNumber: number): ICommand[][];
        setOnUpdateWorld(handler: (world: IWorld, currentStepNumber: number, commandList: ICommand[]) => void): void;
    }
}
declare namespace STSEngine {
    interface IMetronome {
        start(startTime?: number): void;
        getStartTime(): number;
        pause(): void;
        resume(): void;
        getTickLength(): number;
        getTickCount(): number;
    }
}
declare namespace STSEngine {
    class EngineImpl implements IEngine {
        protected world: IWorld;
        protected objectListService: IObjectListService;
        protected processListService: IProcessListService;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        protected worldSettings: IWorldSettings;
        protected commandListService: ICommandListService;
        constructor(world: IWorld, commandListService: ICommandListService);
        getWorld(): IWorld;
        step(): void;
        getCommandList(): ICommand[];
        protected processCommandList(): void;
    }
}
declare namespace STSEngine {
    class FilterServiceImpl<T> implements IFilterService<T> {
        getAll(itemList: Iterable<T>, condition: (item: T) => boolean): T[];
        getFirst(itemList: Iterable<T>, condition: (item: T) => boolean): T;
    }
}
declare namespace STSEngine {
    class ProcessMoveDownObjectImpl implements IProcessHandler {
        init(world: IWorld, process: IProcess): void;
        execute(world: IWorld, process: IProcess): void;
        finish(world: IWorld, process: IProcess): void;
    }
}
declare namespace STSEngine {
    interface IProcess extends IAttributeList {
        getId(): number;
        getProcessType(): ProcessType;
        getProcessStatus(): ProcessStatus;
        setProcessStatus(processStatus: ProcessStatus): void;
        getObjectId(): number;
    }
}
declare namespace STSEngine {
    class PointServiceImpl implements IPointService {
        copy(point: IPoint): IPoint;
        add(p1: IPoint, p2: IPoint): IPoint;
        substract(p1: IPoint, p2: IPoint): IPoint;
    }
}
declare namespace STSEngine {
    interface IPointService {
        copy(point: IPoint): IPoint;
        add(p1: IPoint, p2: IPoint): IPoint;
        substract(p1: IPoint, p2: IPoint): IPoint;
    }
}
declare namespace STSEngine {
    class GameServerImpl implements IGameServer {
        protected emptyCommandList: ICommand[];
        protected engine: IEngine;
        protected metronome: IMetronome;
        protected commandLog: ICommand[][];
        protected timerId: number;
        protected onUpdateWorld: (world: IWorld, currentStepNumber: number, commandList: ICommand[]) => void;
        constructor(engine: IEngine);
        start(): void;
        getCommandLog(startStepNumber: number): ICommand[][];
        protected updateWorld(): void;
        protected getStepNumber(): number;
        setOnUpdateWorld(handler: (world: IWorld, currentStepNumber: number, commandList: ICommand[]) => void): void;
    }
}
declare namespace STSEngine {
    class MetronomeImpl implements IMetronome {
        protected tickLength: number;
        protected startTime: number;
        protected pauseStart: number;
        protected pauseLength: number;
        protected isPaused: boolean;
        constructor(tickLength: number);
        start(startTime?: number): void;
        getStartTime(): number;
        pause(): void;
        resume(): void;
        getTickLength(): number;
        getTickCount(): number;
    }
}
declare namespace STSEngine {
    class ObjectListServiceImpl implements IObjectListService {
        protected objectList: Map<number, IObject>;
        protected changedObjectList: Map<number, IObject>;
        protected attributeList: IAttributeList;
        protected filterService: IFilterService<IObject>;
        constructor();
        protected getNewObjectId(): number;
        protected getLastId(): number;
        protected setLastId(id: number): void;
        getObject(objectId: number): IObject;
        addObject(object: IObject): void;
        createObject(attributeList?: Map<string, any> | IKeyValuePair[]): IObject;
        removeObject(objectId: number): void;
        commit(): void;
        rollback(): void;
        isDirty(): boolean;
        getAll(condition: (item: IObject) => boolean): IObject[];
        getFirst(condition: (item: IObject) => boolean): IObject;
    }
}
declare namespace STSEngine {
    class ProcessListServiceImpl implements IProcessListService {
        protected commitedProcessList: IProcess[];
        protected processList: IProcess[];
        protected filterService: IFilterService<IProcess>;
        protected attributeList: IAttributeList;
        constructor();
        getProcessList(): IProcess[];
        protected addProcess(process: IProcess): void;
        createProcess(processType: ProcessType, attributeList?: Map<string, any> | IKeyValuePair[]): IProcess;
        protected getNewProcessId(): number;
        protected getLastId(): number;
        protected setLastId(id: number): void;
        removeFinished(): void;
        commit(): void;
        rollback(): void;
        isDirty(): boolean;
        getAll(condition: (item: IProcess) => boolean): IProcess[];
        getFirst(condition: (item: IProcess) => boolean): IProcess;
    }
}
declare namespace STSEngine {
    interface IObjectListService extends ICommitable, IFilterable<IObject> {
        getObject(id: number): IObject;
        createObject(attributeList?: Map<string, any> | IKeyValuePair[]): IObject;
        removeObject(id: number): void;
    }
}
declare namespace STSEngine {
    interface IProcessListService extends ICommitable, IFilterable<IProcess> {
        getProcessList(): IProcess[];
        createProcess(processType: ProcessType, attributeList?: Map<string, any> | IKeyValuePair[]): IProcess;
        removeFinished(): void;
    }
}
declare namespace STSEngine {
    class ServiceAttributeType {
        static LastId: string;
    }
}
declare var module: any;
