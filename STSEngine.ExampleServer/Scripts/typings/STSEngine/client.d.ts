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
    enum ClientServerMessageAttributeType {
        CommandList = 20,
        PlayerId = 21,
        WorldInfo = 22,
        StepNumber = 23,
        StepList = 24,
        SID = 25,
    }
}
declare namespace STSEngine {
    enum ClientServerMessageType {
        Unknown = 0,
        RequestAuthentication = 1,
        Init = 2,
        Step = 3,
        StepList = 4,
        ResponseAuthentication = 5,
        CommandList = 6,
    }
}
declare namespace STSEngine {
    interface IClientServerMessage extends IObject {
    }
}
declare namespace STSEngine {
    interface IClientServerMessageInitializer extends ItemInitializer<IClientServerMessage> {
    }
}
declare namespace STSEngine {
    interface IObject extends IterableKeyValuePair {
        getId(): number;
        setId(id: number): void;
        getType(): number;
        setType(type: number): void;
        getAttributeList(): IAttributeList;
    }
}
declare namespace STSEngine {
    interface IObjectListService<T extends IObject> extends IFilterable<T> {
        init(objectList: Iterable<T>): void;
        get(id: number): T;
        has(id: number): boolean;
        getSize(): number;
        add(object: T): void;
        remove(id: number): void;
        clear(): void;
        getIterator(): IterableIterator<T>;
    }
}
declare namespace STSEngine {
    interface IPlayer extends IObject {
        getName(): string;
        setName(name: string): void;
    }
}
declare namespace STSEngine {
    enum ObjectAttributeType {
        Unknown = 0,
        Type = 1,
        Id = 2,
        Name = 3,
    }
}
declare namespace STSEngine {
    enum ObjectType {
        Square = 0,
        Player = 1,
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
        getObjectListService(): IObjectListService<IObject>;
        getProcessListService(): IProcessListService;
        getPlayerListService(): IObjectListService<IPlayer>;
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
        getType(): number;
        setType(type: number): void;
        getList(): [number, any][];
        [Symbol.iterator]: any;
        getIterator(): IterableIterator<[number, any]>;
        getAttributeList(): IAttributeList;
    }
}
declare namespace STSEngine {
    abstract class ClientServerMessage extends ObjectImpl implements IClientServerMessage {
    }
}
declare namespace STSEngine {
    class ClientServerMessageCommandList extends ClientServerMessage {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        setCommandList(commandList: [number, any][][]): void;
        getCommandList(): [number, any][][];
    }
}
declare namespace STSEngine {
    class ClientServerMessageInit extends ClientServerMessage {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        setPlayerId(playerId: number): void;
        getPlayerId(): number;
    }
}
declare namespace STSEngine {
    abstract class ItemInitializer<T> implements IItemInitializer<T> {
        protected getId: () => number;
        protected itemAttributeType: number;
        constructor(itemAttributeType: number);
        create(attr: Iterable<[number, any]> | number): T;
        protected getItemType(attr: Iterable<[number, any]>): number;
        createList(attrList: Iterable<Iterable<[number, any]>>): Iterable<T>;
        protected abstract createByType(type: number, attr?: Iterable<[number, any]>): T;
        protected createByAttr(attr: Iterable<[number, any]>): T;
        setGetIdHandler(getId: () => number): void;
    }
}
declare namespace STSEngine {
    class ClientServerMessageInitializer extends ItemInitializer<IClientServerMessage> implements IClientServerMessageInitializer {
        constructor();
        createByType(type: number, attr?: Iterable<[number, any]>): IClientServerMessage;
        createCommandList(attr?: Iterable<[number, any]>): ClientServerMessageCommandList;
        createRequestAuthentication(attr?: Iterable<[number, any]>): ClientServerMessageRequestAuthentication;
        createResponseAuthentication(attr?: Iterable<[number, any]>): ClientServerMessageResponseAuthentication;
        createStep(attr?: Iterable<[number, any]>): ClientServerMessageStep;
        createInit(attr?: Iterable<[number, any]>): ClientServerMessageInit;
        createStepList(attr?: Iterable<[number, any]>): ClientServerMessageStepList;
        protected createAttributeList(): IAttributeList;
    }
}
declare namespace STSEngine {
    class ClientServerMessageRequestAuthentication extends ClientServerMessage {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
    }
}
declare namespace STSEngine {
    class ClientServerMessageResponseAuthentication extends ClientServerMessage {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        setSID(sid: string): void;
        getSID(): string;
    }
}
declare namespace STSEngine {
    class ClientServerMessageStep extends ClientServerMessage {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        setCommandList(commandList: ICommand[]): void;
        getCommandList(): [number, any][][];
        getStepNumber(): number;
        setStepNumber(stepNumber: number): void;
    }
}
declare namespace STSEngine {
    class ClientServerMessageStepList extends ClientServerMessage {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        setStepList(stepList: IObject[]): void;
        getStepList(): [number, any][][];
    }
}
declare namespace STSEngine {
    class ObjectListService<T extends IObject> implements IObjectListService<T> {
        protected objectList: Map<number, T>;
        protected filterService: IFilterService<T>;
        constructor();
        init(objectList: Iterable<T>): void;
        get(objectId: number): T;
        getSize(): number;
        add(object: T): void;
        has(id: number): boolean;
        remove(id: number): void;
        clear(): void;
        getIterator(): IterableIterator<T>;
        getAll(condition: (item: IObject) => boolean): IterableIterator<T>;
        getFirst(condition: (item: IObject) => boolean): T;
    }
}
declare namespace STSEngine {
    class ObjectListServiceCommitable<T extends IObject> implements IObjectListService<T>, ICommitable {
        protected objectListService: IObjectListService<T>;
        protected deletedObjectIdList: Set<number>;
        protected newObjectIdList: Set<number>;
        protected filterService: IFilterService<T>;
        constructor();
        init(objectList: Iterable<T>): void;
        get(id: number): T;
        has(id: number): boolean;
        getSize(): number;
        add(object: T): void;
        protected isObjectNotDeleted(object: T): boolean;
        getIterator(): IterableIterator<T>;
        remove(id: number): void;
        clear(): void;
        commit(): void;
        rollback(): void;
        isDirty(): boolean;
        getAll(condition: (item: T) => boolean): IterableIterator<T>;
        getFirst(condition: (item: T) => boolean): T;
    }
}
declare namespace STSEngine {
    class Player extends ObjectImpl implements IPlayer {
        protected attributeList: IAttributeList;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getName(): string;
        setName(name: string): void;
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
        protected objectListService: IObjectListService<IObject>;
        protected processListService: IProcessListService;
        protected playerListService: IObjectListService<IPlayer>;
        constructor(worldAttributeList: IWorldAttributeList, commandInitializator: IItemInitializer<ICommand>, objectInitializator: IItemInitializer<IObject>, processInitializator: IItemInitializer<IProcess>, processDispatcher: IProcessDispatcher, commandDispatcher: ICommandDispatcher, objectListService: IObjectListService<IObject>, processListService: IProcessListService, playerListService: IObjectListService<IPlayer>);
        getWorldAttributeList(): IWorldAttributeList;
        getCommandInitializer(): IItemInitializer<ICommand>;
        getObjectInitializer(): IItemInitializer<IObject>;
        getProcessInitializer(): IItemInitializer<IProcess>;
        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;
        getObjectListService(): IObjectListService<IObject>;
        getProcessListService(): IProcessListService;
        getPlayerListService(): IObjectListService<IPlayer>;
        protected getObjectId(): number;
        protected getProcessId(): number;
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
    interface IPlayerAction {
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
    interface IWebSocketGameClient {
        getWorld(): IWorld;
        getPlayerId(): number;
        setOnConnected(handler: (webSocketClient: IWebSocketGameClient) => void): void;
    }
}
declare namespace STSEngine {
    class PlayerAction implements IPlayerAction {
        protected commandListService: ICommandListService;
        protected onActionHandler: (playerAction: IPlayerAction) => void;
        constructor();
        getCommandKeyValuePairList(): [number, any][][];
        clear(): void;
        setOnAction(handler: (playerAction: IPlayerAction) => void): void;
        protected onAction(): void;
    }
}
declare namespace STSEngine {
    abstract class View {
        protected rootElement: HTMLDivElement;
        protected worldAttributeList: IWorldAttributeList;
        protected objectListService: IObjectListService<IObject>;
        protected processListService: IProcessListService;
        protected isStarted: boolean;
        protected world: IWorld;
        protected playerId: number;
        constructor(rootElement: HTMLDivElement, world: IWorld);
        setPlayerId(playerId: number): void;
        protected clearHtmlElement(element: HTMLElement): void;
        protected draw(): void;
        protected abstract refresh(): void;
        start(): void;
        stop(): void;
    }
}
declare namespace STSEngine {
    class WebSocketGameClient implements IWebSocketGameClient {
        protected commandListService: ICommandListService;
        protected socket: WebSocket;
        protected sid: string;
        protected engine: IEngine;
        protected playerAction: IPlayerAction;
        protected playerId: number;
        protected clientSeverMessageInitializer: IClientServerMessageInitializer;
        protected onConnectedHandler: (webSocketClient: IWebSocketGameClient) => void;
        protected worldServiceList: IWorldServiceList;
        constructor(socket: WebSocket, sid: string, playerAction: IPlayerAction, worldServiceList: IWorldServiceList, clientSeverMessageInitializer: IClientServerMessageInitializer);
        getPlayerId(): number;
        setOnConnected(handler: (webSocketClient: IWebSocketGameClient) => void): void;
        protected commandInitializator(attr: Iterable<[number, any]>): ICommand;
        protected init(): void;
        protected createWorld(): IWorld;
        getWorld(): IWorld;
        protected onPlayerAction(playerAction: IPlayerAction): void;
        protected onOpen(ev: Event): void;
        protected onMessage(ev: MessageEvent): void;
        protected processServerMessage(attr: Iterable<[number, any]>): void;
        protected sendAuthentication(): void;
        protected processStep(message: ClientServerMessageStep): void;
        protected processStepList(message: ClientServerMessageStepList): void;
        protected processInit(message: ClientServerMessageInit): void;
        protected onClose(ev: CloseEvent): void;
        protected onError(ev: Event): void;
        protected sendMessage(message: IClientServerMessage): void;
    }
}
