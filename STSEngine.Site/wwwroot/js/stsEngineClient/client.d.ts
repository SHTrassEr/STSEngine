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
    interface ICommandListService extends IFilterable<ICommand> {
        getCommandList(): ICommand[];
        createCommand(attributeList: IKeyValuePair[]): ICommand;
        setCommandList(commandList: IKeyValuePair[][]): void;
        clear(): void;
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
        static SID: string;
        static CurrentStep: string;
        static CommandList: string;
    }
}
declare namespace STSEngine {
    enum ClientMessageType {
        Unknown = 0,
        ResponseAuthentication = 1,
    }
}
declare namespace STSEngine {
    interface IAttributeList extends ICommitable {
        getAttribute(attribute: string, defaultValue?: any): any;
        setAttribute(attribute: string, value: any): void;
        setAttributeList(attributeList: Map<string, any> | IKeyValuePair[]): void;
        hasAttribute(attribute: string): boolean;
        removeAttribute(attribute: string): void;
        getKeyValuePairList(): IKeyValuePair[];
    }
}
declare namespace STSEngine {
    interface IClientServerMessage {
        messageType: number;
        attributeList: IKeyValuePair[];
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
    interface ICommitRollback {
        commit(): void;
        rollback(): void;
        isDurty(): boolean;
    }
}
declare namespace STSEngine {
    interface IFilterable<T> {
        getAll(condition: (item: T) => boolean): T[];
        getFirst(condition: (item: T) => boolean): T;
    }
}
declare namespace STSEngine {
    interface IKeyValuePair {
        key: string;
        value: any;
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
    interface ITestInterface {
        getAttribute(attribute: string, defaultValue?: any): any;
        setAttribute(attribute: string, value: any): void;
        hasAttribute(attribute: string): boolean;
        removeAttribute(attribute: string): void;
        getKeyValuePairList(): IKeyValuePair[];
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
    enum ObjectType {
        Square = 0,
    }
}
declare namespace STSEngine {
    enum ServerMessageType {
        Unknown = 0,
        RequestAuthentication = 1,
        Tick = 2,
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
    interface IObjectListService extends ICommitable, IFilterable<IObject> {
        getObject(id: number): IObject;
        createObject(attributeList: IKeyValuePair[]): IObject;
        setObjectList(objectList: IKeyValuePair[][]): void;
        removeObject(id: number): void;
    }
}
declare namespace STSEngine {
    class ServiceAttributeType {
        static LastId: string;
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
    class NotImplementedException {
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
    interface IProcessListService extends ICommitable, IFilterable<IProcess> {
        getProcessList(): IProcess[];
        createProcess(processType: IKeyValuePair[]): IProcess;
        setProcessList(processList: IKeyValuePair[][]): void;
        removeFinished(): void;
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
    class PlayerAction implements IPlayerAction {
        protected commandListService: ICommandListService;
        protected playerId: number;
        constructor(playerId: number, commandListService: ICommandListService);
        getPlayerId(): number;
        protected createAttributeList(commandType: CommandType): IKeyValuePair[];
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
    class Command implements ICommand {
        protected attributeList: IAttributeList;
        constructor(attributeList: IKeyValuePair[]);
        getCommandType(): CommandType;
        getPlayerId(): number;
        getAttribute(attribute: string, defaultValue?: any): any;
        setAttribute(attribute: string, value: any): void;
        setAttributeList(attributeList: Map<string, any> | IKeyValuePair[]): void;
        hasAttribute(attribute: string): boolean;
        rollback(): void;
        commit(): void;
        isDirty(): boolean;
        removeAttribute(attribute: string): void;
        getKeyValuePairList(): IKeyValuePair[];
    }
}
declare namespace STSEngine {
    class CommandCreateObject implements ICommandHandler {
        execute(world: IWorld, command: ICommand): void;
        protected getObjectAttributeList(command: ICommand): IKeyValuePair[];
        protected createProcessAttributeList(world: IWorld, objectAttributeList: IKeyValuePair[]): IKeyValuePair[];
        isValid(world: IWorld, command: ICommand): boolean;
    }
}
declare namespace STSEngine {
    class CommandDispatcher implements ICommandDispatcher {
        protected commandHandlerList: ICommandHandler[];
        constructor();
        protected initCommandHandlerList(): void;
        execute(world: IWorld, command: ICommand): void;
    }
}
declare namespace STSEngine {
    class CommandListService implements ICommandListService {
        protected commandList: ICommand[];
        protected filterService: IFilterService<ICommand>;
        constructor();
        getCommandList(): ICommand[];
        createCommand(attributeList: IKeyValuePair[]): ICommand;
        setCommandList(commandList: IKeyValuePair[][]): void;
        clear(): void;
        getAll(condition: (item: ICommand) => boolean): ICommand[];
        getFirst(condition: (item: ICommand) => boolean): ICommand;
    }
}
declare namespace STSEngine {
    class CommandRegisterPlayer implements ICommandHandler {
        execute(world: IWorld, command: ICommand): void;
        protected createObjectAttributeList(world: IWorld, command: ICommand): IKeyValuePair[];
        protected createProcessAttributeList(world: IWorld, objectAttributeList: IKeyValuePair[]): IKeyValuePair[];
        isValid(world: IWorld, command: ICommand): boolean;
    }
}
declare namespace STSEngine {
    class CommandStartMoveObject implements ICommandHandler {
        execute(world: IWorld, command: ICommand): void;
        protected getProcessType(command: ICommand): ProcessType;
        protected createProcessAttributeList(processType: ProcessType, command: ICommand): IKeyValuePair[];
        isValid(world: IWorld, command: ICommand): boolean;
    }
}
declare namespace STSEngine {
    class CommandStopMoveObject implements ICommandHandler {
        execute(world: IWorld, command: ICommand): void;
        protected getProcessType(command: ICommand): ProcessType;
        isValid(world: IWorld, command: ICommand): boolean;
    }
}
declare namespace STSEngine {
    class AttributeList implements IAttributeList {
        protected commitedAttributeList: Map<string, any>;
        protected attributeList: Map<string, any>;
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
        getKeyValuePairList(): IKeyValuePair[];
    }
}
declare namespace STSEngine {
    class ClientServerMessage implements IClientServerMessage {
        messageType: number;
        attributeList: IKeyValuePair[];
        constructor(messageType: number, attributeList: IKeyValuePair[]);
    }
}
declare namespace STSEngine {
    class KeyValuePair implements IKeyValuePair {
        key: string;
        value: any;
        constructor(key: string, value: any);
    }
}
declare namespace STSEngine {
    class ObjectImpl implements IObject {
        protected attributeList: IAttributeList;
        constructor(attributeList: IKeyValuePair[]);
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
        getKeyValuePairList(): IKeyValuePair[];
    }
}
declare namespace STSEngine {
    class Point implements IPoint {
        private x;
        private y;
        constructor(x: number, y: number);
        getX(): number;
        getY(): number;
    }
}
declare namespace STSEngine {
    class World implements IWorld {
        protected worldSettings: IWorldSettings;
        protected objectListService: IObjectListService;
        protected processListService: IProcessListService;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        protected attributeList: IAttributeList;
        constructor(worldSettings: IWorldSettings);
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
    class WorldSettings implements IWorldSettings {
        protected settings: Map<string, any>;
        constructor(settings: IKeyValuePair[]);
        protected setSettilgs(settings: IKeyValuePair[]): void;
        getMoveStepSize(): number;
        getTickLength(): number;
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
    class Engine implements IEngine {
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
    class FilterService<T> implements IFilterService<T> {
        getAll(itemList: Iterable<T>, condition: (item: T) => boolean): T[];
        getFirst(itemList: Iterable<T>, condition: (item: T) => boolean): T;
    }
}
declare namespace STSEngine {
    class GameServer implements IGameServer {
        protected emptyCommandList: ICommand[];
        protected engine: IEngine;
        protected metronome: IMetronome;
        protected commandLog: ICommand[][];
        protected timerId: any;
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
    class Metronome implements IMetronome {
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
    class ObjectListService implements IObjectListService {
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
        createObject(attributeList: IKeyValuePair[]): IObject;
        setObjectList(objectList: IKeyValuePair[][]): void;
        removeObject(objectId: number): void;
        commit(): void;
        rollback(): void;
        isDirty(): boolean;
        getAll(condition: (item: IObject) => boolean): IObject[];
        getFirst(condition: (item: IObject) => boolean): IObject;
    }
}
declare namespace STSEngine {
    class ProcessCreateObject implements IProcessHandler {
        init(world: IWorld, process: IProcess): void;
        execute(world: IWorld, process: IProcess): void;
        finish(world: IWorld, process: IProcess): void;
    }
}
declare namespace STSEngine {
    class ProcessDispatcher implements IProcessDispatcher {
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
    class ProcessImpl implements IProcess {
        protected attributeList: IAttributeList;
        constructor(attributeList: IKeyValuePair[]);
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
        getKeyValuePairList(): IKeyValuePair[];
    }
}
declare namespace STSEngine {
    class ProcessListService implements IProcessListService {
        protected commitedProcessList: IProcess[];
        protected processList: IProcess[];
        protected filterService: IFilterService<IProcess>;
        protected attributeList: IAttributeList;
        constructor();
        getProcessList(): IProcess[];
        protected addProcess(process: IProcess): void;
        createProcess(attributeList: IKeyValuePair[]): IProcess;
        setProcessList(processList: IKeyValuePair[][]): void;
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
    class ProcessMoveDownObject implements IProcessHandler {
        init(world: IWorld, process: IProcess): void;
        execute(world: IWorld, process: IProcess): void;
        finish(world: IWorld, process: IProcess): void;
    }
}
declare namespace STSEngine {
    class ProcessMoveLeftObject implements IProcessHandler {
        init(world: IWorld, process: IProcess): void;
        execute(world: IWorld, process: IProcess): void;
        finish(world: IWorld, process: IProcess): void;
    }
}
declare namespace STSEngine {
    class ProcessMoveRightObject implements IProcessHandler {
        init(world: IWorld, process: IProcess): void;
        execute(world: IWorld, process: IProcess): void;
        finish(world: IWorld, process: IProcess): void;
    }
}
declare namespace STSEngine {
    class ProcessMoveUpObject implements IProcessHandler {
        init(world: IWorld, process: IProcess): void;
        execute(world: IWorld, process: IProcess): void;
        finish(world: IWorld, process: IProcess): void;
    }
}
declare namespace STSEngine {
    class PointService implements IPointService {
        copy(point: IPoint): IPoint;
        add(p1: IPoint, p2: IPoint): IPoint;
        substract(p1: IPoint, p2: IPoint): IPoint;
    }
}
declare namespace STSEngine {
    interface IWebSocketGameClient {
        start(): void;
    }
}
declare namespace STSEngine {
    class WebSocketGameClient {
        protected commandListService: ICommandListService;
        protected socket: WebSocket;
        protected sid: string;
        protected engine: IEngine;
        constructor(socket: WebSocket, sid: string);
        protected init(): void;
        protected onOpen(ev: Event): void;
        protected onMessage(ev: MessageEvent): void;
        protected processServerMessage(message: IClientServerMessage): void;
        protected sendAuthentication(): void;
        protected processTick(attributeList: IKeyValuePair[]): void;
        protected createWorld(): IWorld;
        protected createWorldSettings(): IWorldSettings;
        protected onClose(ev: CloseEvent): void;
        protected onError(ev: Event): void;
        protected sendMessage(message: IClientServerMessage): void;
    }
}
