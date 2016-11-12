declare namespace STSEngine {
    enum CommandAttributeType {
        Unknown = 0,
        Type = 1,
        Id = 2,
        InitiatorId = 3,
        ObjectId = 4,
    }
}
declare namespace STSEngine {
    enum CommandType {
        Unknown = 0,
        RegisterPlayer = 1,
    }
}
declare namespace STSEngine {
    interface ICommand extends IterableKeyValuePair {
        getCommandType(): number;
        setCommandType(commandType: number): void;
        getInitiatorId(): number;
        setInitiatorId(id: number): void;
        getAttributeList(): IAttributeList;
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
        add(commahd: ICommand): void;
        setCommandList(commandList: Iterable<ICommand>): void;
        getCommandKeyValuePairList(): [number, any][][];
        clear(): void;
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
    interface IAttributeList extends IterableKeyValuePair, ICommitable {
        get(attribute: number, defaultValue?: any): any;
        set(attribute: number, value: any): void;
        setList(attributeList: Iterable<[number, any]>): void;
        has(attribute: number): boolean;
        delete(attribute: number): void;
    }
}
declare namespace STSEngine {
    interface IFilterable<T> {
        getAll(condition: (item: T) => boolean): IterableIterator<T>;
        getFirst(condition: (item: T) => boolean): T;
    }
}
declare namespace STSEngine {
    interface IterableKeyValuePair extends Iterable<[number, any]> {
        getList(): [number, any][];
        getIterator(): IterableIterator<[number, any]>;
    }
}
declare namespace STSEngine {
    enum ClientMessageAttributeType {
        Unknown = 0,
        CommandList = 1,
        SID = 2,
    }
}
declare namespace STSEngine {
    enum ClientMessageType {
        Unknown = 0,
        ResponseAuthentication = 1,
        CommandList = 2,
    }
}
declare namespace STSEngine {
    interface IClientServerMessage {
        messageType: number;
        attributeList: [number, any][];
    }
}
declare namespace STSEngine {
    enum ServerMessageAttributeType {
        Unknown = 0,
        StepNumber = 1,
        CommandList = 2,
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
    interface IObject extends IterableKeyValuePair {
        getId(): number;
        setId(id: number): void;
        getObjectType(): number;
        setObjectType(objectType: number): void;
        getAttributeList(): IAttributeList;
    }
}
declare namespace STSEngine {
    interface IObjectListService extends IFilterable<IObject> {
        init(objectList: Iterable<IObject>): void;
        get(id: number): IObject;
        has(id: number): boolean;
        getSize(): number;
        add(object: IObject): void;
        remove(id: number): void;
        clear(): void;
        getIterator(): IterableIterator<IObject>;
    }
}
declare namespace STSEngine {
    enum ObjectAttributeType {
        Unknown = 0,
        Type = 1,
        Id = 2,
    }
}
declare namespace STSEngine {
    enum ObjectType {
        Square = 0,
    }
}
declare namespace STSEngine {
    interface IProcess extends IterableKeyValuePair {
        getId(): number;
        setId(id: number): void;
        getProcessType(): number;
        setProcessType(processType: number): void;
        getProcessExecCount(): number;
        setProcessExecCount(execCount: number): void;
        getProcessStatus(): ProcessStatus;
        setProcessStatus(processStatus: ProcessStatus): void;
        getAttributeList(): IAttributeList;
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
    interface IProcessListService extends IFilterable<IProcess> {
        init(objectList: Iterable<Iterable<[number, any]>>): void;
        getProcessList(): IProcess[];
        add(process: IProcess): void;
        removeFinished(): void;
        getIterator(): IterableIterator<IProcess>;
    }
}
declare namespace STSEngine {
    enum ProcessAttributeType {
        Unknown = 0,
        Type = 1,
        Id = 2,
        Status = 3,
        ExecCount = 4,
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
    interface IEngine {
        getWorld(): IWorld;
        step(): void;
        getCommandList(): ICommand[];
    }
}
declare namespace STSEngine {
    interface IFilterService<T> {
        getAll(itemList: Iterable<T>, condition: (item: T) => boolean): IterableIterator<T>;
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
    interface IItemInitializer<T> {
        create(attr: Iterable<[number, any]> | number): T;
        createList(attr: Iterable<Iterable<[number, any]>>): Iterable<T>;
        setGetIdHandler(getId: () => number): any;
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
    class ServiceAttributeType {
        static LastId: string;
    }
}
declare namespace STSEngine {
    interface IWorld {
        getServiceList(): IWorldServiceList;
        getAttributeList(): IWorldAttributeList;
        getStepNumber(): number;
        setStepNumber(stepNumber: number): void;
        increaseStepNumber(): void;
        getCommandInitializer<T extends IItemInitializer<ICommand>>(): T;
        getProcessInitializer<T extends IItemInitializer<IProcess>>(): T;
        getObjectInitializer<T extends IItemInitializer<IObject>>(): T;
    }
}
declare namespace STSEngine {
    interface IWorldAttributeList extends IterableKeyValuePair {
        getTickLength(): number;
        getLastProcessId(): number;
        setLastProcessId(id: number): any;
        getLastObjectId(): number;
        setLastObjectId(id: number): any;
    }
}
declare namespace STSEngine {
    interface IWorldServiceList {
        getWorldAttributeList(): IWorldAttributeList;
        getCommandInitializer(): IItemInitializer<ICommand>;
        getObjectInitializer(): IItemInitializer<IObject>;
        getProcessInitializer(): IItemInitializer<IProcess>;
        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;
        getObjectListService(): IObjectListService;
        getProcessListService(): IProcessListService;
    }
}
declare namespace STSEngine {
    class Command implements ICommand {
        protected attributeList: IAttributeList;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getCommandType(): number;
        setCommandType(commandType: number): void;
        getInitiatorId(): number;
        setInitiatorId(id: number): void;
        getList(): [number, any][];
        [Symbol.iterator]: any;
        getIterator(): IterableIterator<[number, any]>;
        getAttributeList(): IAttributeList;
    }
}
declare namespace STSEngine {
    class CommandDispatcher implements ICommandDispatcher {
        protected commandHandlerList: ICommandHandler[];
        constructor();
        execute(world: IWorld, command: ICommand): void;
    }
}
declare namespace STSEngine {
    class CommandHandler implements ICommandHandler {
        execute(world: IWorld, command: ICommand): void;
        isValid(world: IWorld, command: ICommand): boolean;
        protected executeCommand(world: IWorld, command: ICommand): void;
        protected isValidCommand(world: IWorld, command: ICommand): boolean;
        protected isValidCommandType(world: IWorld, command: ICommand): boolean;
        protected startProcess(world: IWorld, process: IProcess): void;
        protected finishProcess(world: IWorld, process: IProcess): void;
        protected getObject<T extends IObject>(world: IWorld, objectId: number, type: any): T;
    }
}
declare namespace STSEngine {
    class CommandListService implements ICommandListService {
        protected commandList: ICommand[];
        protected filterService: IFilterService<ICommand>;
        constructor();
        getCommandList(): ICommand[];
        add(command: ICommand): void;
        setCommandList(commandList: Iterable<ICommand>): void;
        getCommandKeyValuePairList(): [number, any][][];
        clear(): void;
        getAll(condition: (item: ICommand) => boolean): IterableIterator<ICommand>;
        getFirst(condition: (item: ICommand) => boolean): ICommand;
    }
}
declare namespace STSEngine {
    class AttributeList implements IAttributeList {
        protected attributeList: Map<number, any>;
        constructor();
        get(attribute: number, defaultValue?: any): any;
        set(attribute: number, value: any): void;
        setList(attributeList: Iterable<[number, any]>): void;
        rollback(): void;
        commit(): void;
        isDirty(): boolean;
        [Symbol.iterator]: any;
        getIterator(): IterableIterator<[number, any]>;
        has(attribute: number): boolean;
        delete(attribute: number): void;
        getList(): [number, any][];
    }
}
declare namespace STSEngine {
    class AttributeListCommitable implements IAttributeList {
        protected deletedAttributeList: Set<number>;
        protected commitedAttributeList: Map<number, any>;
        protected attributeList: Map<number, any>;
        constructor();
        get(attribute: number, defaultValue?: any): any;
        set(attribute: number, value: any): void;
        setList(attributeList: Iterable<[number, any]>): void;
        has(attribute: number): boolean;
        rollback(): void;
        commit(): void;
        isDirty(): boolean;
        delete(attribute: number): void;
        [Symbol.iterator]: any;
        getIterator(): IterableIterator<[number, any]>;
        getList(): [number, any][];
    }
}
declare namespace STSEngine {
    class ObjectImpl implements IObject {
        protected attributeList: IAttributeList;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getId(): number;
        setId(id: number): void;
        getObjectType(): number;
        setObjectType(objectType: number): void;
        getList(): [number, any][];
        [Symbol.iterator]: any;
        getIterator(): IterableIterator<[number, any]>;
        getAttributeList(): IAttributeList;
    }
}
declare namespace STSEngine {
    class ObjectListService implements IObjectListService {
        protected objectList: Map<number, IObject>;
        protected filterService: IFilterService<IObject>;
        constructor();
        init(objectList: Iterable<IObject>): void;
        get(objectId: number): IObject;
        getSize(): number;
        add(object: IObject): void;
        has(id: number): boolean;
        remove(id: number): void;
        clear(): void;
        getIterator(): IterableIterator<IObject>;
        getAll(condition: (item: IObject) => boolean): IterableIterator<IObject>;
        getFirst(condition: (item: IObject) => boolean): IObject;
    }
}
declare namespace STSEngine {
    class ObjectListServiceCommitable implements IObjectListService, ICommitable {
        protected objectListService: IObjectListService;
        protected deletedObjectIdList: Set<number>;
        protected newObjectIdList: Set<number>;
        protected filterService: IFilterService<IObject>;
        constructor();
        init(objectList: Iterable<IObject>): void;
        get(id: number): IObject;
        has(id: number): boolean;
        getSize(): number;
        add(object: IObject): void;
        protected isObjectNotDeleted(object: IObject): boolean;
        getIterator(): IterableIterator<IObject>;
        remove(id: number): void;
        clear(): void;
        commit(): void;
        rollback(): void;
        isDirty(): boolean;
        getAll(condition: (item: IObject) => boolean): IterableIterator<IObject>;
        getFirst(condition: (item: IObject) => boolean): IObject;
    }
}
declare namespace STSEngine {
    class ClientServerMessage implements IClientServerMessage {
        messageType: number;
        attributeList: [number, any][];
        constructor(messageType: number, attributeList: [number, any][]);
    }
}
declare namespace STSEngine {
    class ProcessDispatcher implements IProcessDispatcher {
        protected processHandlerList: IProcessHandler[];
        execute(world: IWorld, process: IProcess): void;
        init(world: IWorld, process: IProcess): void;
        finish(world: IWorld, process: IProcess): void;
        protected getProcessHandler(process: IProcess): IProcessHandler;
    }
}
declare namespace STSEngine {
    class ProcessHandler implements IProcessHandler {
        init(world: IWorld, process: IProcess): void;
        execute(world: IWorld, process: IProcess): void;
        finish(world: IWorld, process: IProcess): void;
        protected initProcess(world: IWorld, process: IProcess): void;
        protected executeProcess(world: IWorld, process: IProcess): void;
        protected finishProcess(world: IWorld, process: IProcess): void;
        protected isValidProcessType(world: IWorld, command: IProcess): boolean;
        protected addObject(world: IWorld, object: IObject): void;
        protected getObject<T extends IObject>(world: IWorld, objectId: number, type: any): T;
        protected startProcess(world: IWorld, process: IProcess): void;
    }
}
declare namespace STSEngine {
    class ProcessImpl implements IProcess {
        protected attributeList: IAttributeList;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getId(): number;
        setId(id: number): void;
        getProcessType(): number;
        setProcessType(processType: number): void;
        getProcessStatus(): ProcessStatus;
        setProcessStatus(processStatus: ProcessStatus): void;
        getProcessExecCount(): number;
        setProcessExecCount(execCount: number): void;
        getList(): [number, any][];
        [Symbol.iterator]: any;
        getIterator(): IterableIterator<[number, any]>;
        getAttributeList(): IAttributeList;
    }
}
declare namespace STSEngine {
    class ProcessListService implements IProcessListService {
        protected processList: IProcess[];
        protected filterService: IFilterService<IProcess>;
        constructor();
        init(processList: Iterable<IProcess>): void;
        getProcessList(): IProcess[];
        add(process: IProcess): void;
        removeFinished(): void;
        getIterator(): IterableIterator<IProcess>;
        getAll(condition: (item: IProcess) => boolean): IterableIterator<IProcess>;
        getFirst(condition: (item: IProcess) => boolean): IProcess;
    }
}
declare namespace STSEngine {
    class ProcessListServiceCommitable implements IProcessListService, ICommitable {
        protected processList: IProcess[];
        protected filterService: IFilterService<IProcess>;
        protected firstUncommitedIndex: number;
        constructor();
        getProcessList(): IProcess[];
        add(process: IProcess): void;
        init(processList: Iterable<IProcess>): void;
        removeFinished(): void;
        getIterator(): IterableIterator<IProcess>;
        commit(): void;
        rollback(): void;
        isDirty(): boolean;
        getAll(condition: (item: IProcess) => boolean): IterableIterator<IProcess>;
        getFirst(condition: (item: IProcess) => boolean): IProcess;
    }
}
declare namespace STSEngine {
    class Engine implements IEngine {
        protected world: IWorld;
        protected processListService: IProcessListService;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        protected commandListService: ICommandListService;
        constructor(world: IWorld, commandListService: ICommandListService);
        getWorld(): IWorld;
        step(): void;
        getCommandList(): ICommand[];
        protected processCommandList(): void;
        protected addProcessList(processList: Iterable<IProcess>): void;
    }
}
declare namespace STSEngine {
    class FilterService<T> implements IFilterService<T> {
        getAll(itemList: Iterable<T>, condition: (item: T) => boolean): IterableIterator<T>;
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
    abstract class ItemInitializer<T> implements IItemInitializer<T> {
        abstract create(attr: Iterable<[number, any]> | number): T;
        abstract createList(attr: Iterable<Iterable<[number, any]>>): Iterable<T>;
        protected getId: () => number;
        setGetIdHandler(getId: () => number): void;
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
    class World implements IWorld {
        protected worldServiceList: IWorldServiceList;
        protected stepNumber: number;
        protected attributeList: IWorldAttributeList;
        constructor(worldSettings: IWorldServiceList);
        getServiceList(): IWorldServiceList;
        getAttributeList(): IWorldAttributeList;
        getStepNumber(): number;
        setStepNumber(stepNumber: number): void;
        increaseStepNumber(): void;
        getCommandInitializer<T extends IItemInitializer<ICommand>>(): T;
        getProcessInitializer<T extends IItemInitializer<IProcess>>(): T;
        getObjectInitializer<T extends IItemInitializer<IObject>>(): T;
    }
}
declare namespace STSEngine {
    class WorldAttributeList implements IWorldAttributeList {
        protected attributeList: IAttributeList;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getTickLength(): number;
        getList(): [number, any][];
        [Symbol.iterator]: any;
        getIterator(): IterableIterator<[number, any]>;
        getAttributeList(): IAttributeList;
        getLastProcessId(): number;
        setLastProcessId(id: number): void;
        getLastObjectId(): number;
        setLastObjectId(id: number): void;
    }
}
declare namespace STSEngine {
    enum WorldAttributeType {
        Unknown = 0,
        TickLength = 1,
        LastProcessId = 2,
        LastObjectId = 3,
    }
}
declare namespace STSEngine {
    class WorldServiceList implements IWorldServiceList {
        protected worldAttributeList: IWorldAttributeList;
        protected commandInitializer: IItemInitializer<ICommand>;
        protected objectInitializer: IItemInitializer<IObject>;
        protected processInitializer: IItemInitializer<IProcess>;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        protected objectListService: IObjectListService;
        protected processListService: IProcessListService;
        constructor(worldAttributeList: IWorldAttributeList, commandInitializator: IItemInitializer<ICommand>, objectInitializator: IItemInitializer<IObject>, processInitializator: IItemInitializer<IProcess>, processDispatcher: IProcessDispatcher, commandDispatcher: ICommandDispatcher, objectListService: IObjectListService, processListService: IProcessListService);
        getWorldAttributeList(): IWorldAttributeList;
        getCommandInitializer(): IItemInitializer<ICommand>;
        getObjectInitializer(): IItemInitializer<IObject>;
        getProcessInitializer(): IItemInitializer<IProcess>;
        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;
        getObjectListService(): IObjectListService;
        getProcessListService(): IProcessListService;
        protected getObjectId(): number;
        protected getProcessId(): number;
    }
}
declare namespace STSEngine {
    interface IWebSocketGameClient {
        start(): void;
        getWorld(): IWorld;
    }
}
declare namespace STSEngine {
    interface IPlayerAction {
        getPlayerId(): number;
        setOnAction(handler: () => void): any;
        getCommandKeyValuePairList(): [number, any][][];
        clear(): void;
    }
}
declare namespace STSEngine {
    interface IView {
        start(): void;
        stop(): void;
    }
}
declare namespace STSEngine {
    class WebSocketGameClient {
        protected commandListService: ICommandListService;
        protected socket: WebSocket;
        protected sid: string;
        protected engine: IEngine;
        protected playerAction: IPlayerAction;
        protected worldServiceList: IWorldServiceList;
        constructor(socket: WebSocket, playerAction: IPlayerAction, worldServiceList: IWorldServiceList);
        protected commandInitializator(attr: Iterable<[number, any]>): ICommand;
        protected init(): void;
        protected createWorld(): IWorld;
        getWorld(): IWorld;
        protected onPlayerAction(playerAction: IPlayerAction): void;
        protected onOpen(ev: Event): void;
        protected onMessage(ev: MessageEvent): void;
        protected processServerMessage(message: IClientServerMessage): void;
        protected sendAuthentication(): void;
        protected processTick(attributeList: [number, any][]): void;
        protected onClose(ev: CloseEvent): void;
        protected onError(ev: Event): void;
        protected sendMessage(message: IClientServerMessage): void;
    }
}
declare namespace STSEngine {
    class PlayerAction implements IPlayerAction {
        protected commandListService: ICommandListService;
        protected playerId: number;
        protected onActionHandler: (playerAction: IPlayerAction) => void;
        constructor(playerId: number);
        getPlayerId(): number;
        getCommandKeyValuePairList(): [number, any][][];
        clear(): void;
        setOnAction(handler: (playerAction: IPlayerAction) => void): void;
        protected onAction(): void;
    }
}
declare namespace STSEngine {
    abstract class View {
        protected rootElement: HTMLDivElement;
        protected canvas: HTMLCanvasElement;
        protected context: CanvasRenderingContext2D;
        protected worldAttributeList: IWorldAttributeList;
        protected objectListService: IObjectListService;
        protected processListService: IProcessListService;
        protected isStarted: boolean;
        constructor(rootElement: HTMLDivElement, worldServiceList: IWorldServiceList);
        protected clearHtmlElement(element: HTMLElement): void;
        protected createCanvas(): HTMLCanvasElement;
        protected abstract setCanvasSize(): void;
        protected draw(): void;
        protected clearCanvas(): void;
        protected abstract refresh(): void;
        start(): void;
        stop(): void;
    }
}
