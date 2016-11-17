declare namespace STSEngine {
    interface IClient extends IEntity {
        getName(): string;
        setName(name: string): void;
    }
}
declare namespace STSEngine {
    interface IClientInitializer extends IEntityInitializer<IClient> {
    }
}
declare namespace STSEngine {
    interface IClientListService extends IEntityListService<IClient> {
    }
}
declare namespace STSEngine {
    interface ICommand extends IEntity {
        getInitiatorId(): number;
        setInitiatorId(id: number): void;
    }
}
declare namespace STSEngine {
    interface ICommandDispatcher {
        execute(command: ICommand): void;
    }
}
declare namespace STSEngine {
    interface ICommandHandler {
        execute(command: ICommand): void;
        isValid(command: ICommand): boolean;
    }
}
declare namespace STSEngine {
    interface ICommandInitializer extends IEntityInitializer<ICommand> {
        createCommand(attr?: Iterable<[number, any]>): ICommand;
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
    interface IAttributeList extends IterableKeyValuePair, ICommitable {
        get(attribute: number, defaultValue?: any): any;
        set(attribute: number, value: any): void;
        clear(): void;
        setList(attributeList: Iterable<[number, any]>, clear?: boolean): void;
        has(attribute: number): boolean;
        delete(attribute: number): void;
    }
}
declare namespace STSEngine {
    interface IEntity extends IterableKeyValuePair {
        getType(): number;
        setType(type: number): void;
        getId(): number;
        setId(id: number): void;
        getAttributeList(): IAttributeList;
        setList(attributeList: Iterable<[number, any]>, clear?: boolean): void;
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
    interface IItem extends IEntity {
        getId(): number;
        setId(id: number): void;
        getType(): number;
        setType(type: number): void;
        getAttributeList(): IAttributeList;
    }
}
declare namespace STSEngine {
    interface IItemInitializer extends IEntityInitializer<IEntity> {
        createItem(attr?: Iterable<[number, any]>): Item;
    }
}
declare namespace STSEngine {
    interface IItemListService extends IEntityListService<IItem> {
    }
}
declare namespace STSEngine {
    interface IProcess extends IterableKeyValuePair {
        getId(): number;
        setId(id: number): void;
        getType(): number;
        setType(processType: number): void;
        getInitStep(): number;
        setInitStep(initStep: number): void;
        getFinishStep(): number;
        setFinishStep(finishStep: number): void;
        getStatus(): ProcessStatus;
        setStatus(processStatus: ProcessStatus): void;
        getAttributeList(): IAttributeList;
    }
}
declare namespace STSEngine {
    interface IProcessDispatcher {
        init(process: IProcess): void;
        execute(process: IProcess): void;
        finish(process: IProcess): void;
    }
}
declare namespace STSEngine {
    interface IProcessHandler {
        init(process: IProcess): void;
        execute(process: IProcess): void;
        finish(process: IProcess): void;
    }
}
declare namespace STSEngine {
    interface IProcessInitializer extends IEntityInitializer<IProcess> {
        createProcess(attr?: Iterable<[number, any]>): IProcess;
    }
}
declare namespace STSEngine {
    interface IProcessListService extends IFilterable<IProcess> {
        init(objectList: Iterable<Iterable<[number, any]>>): void;
        getProcessList(): IProcess[];
        add(process: IProcess): void;
        removeFinished(): void;
        clear(): void;
        getIterator(): IterableIterator<IProcess>;
        getList(): [number, any][][];
        setList(object: Iterable<IProcess>, clear?: boolean): void;
    }
}
declare namespace STSEngine {
    enum ProcessStatus {
        Unknown = 0,
        Init = 1,
        Executing = 2,
        Finished = 3,
    }
}
declare namespace STSEngine {
    enum ProcessType {
        Unknown = 0,
    }
}
declare namespace STSEngine {
    interface IClientServerMessage extends IEntity {
    }
}
declare namespace STSEngine {
    interface IClientServerMessageInitializer extends IEntityInitializer<IClientServerMessage> {
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
        getCommandListService(): ICommandListService;
        step(): void;
        getCommandList(): ICommand[];
    }
}
declare namespace STSEngine {
    interface IEntityInitializer<T> {
        create(attr: Iterable<[number, any]> | number): T;
        createList(attr: Iterable<Iterable<[number, any]>>): Iterable<T>;
    }
}
declare namespace STSEngine {
    interface IEntityListService<T extends IItem> extends IFilterable<T> {
        init(objectList: Iterable<T>): void;
        get(id: number): T;
        has(id: number): boolean;
        getSize(): number;
        add(object: T): void;
        remove(id: number): void;
        clear(): void;
        getIterator(): IterableIterator<T>;
        getList(): [number, any][][];
        setList(object: Iterable<T>, clear?: boolean): void;
        getTyped<V extends T>(objectId: number, type: any): V;
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
    }
}
declare namespace STSEngine {
    interface IWorldAttributeList extends IEntity {
        getTickLength(): number;
        setTickLength(tickLength: number): void;
        getLastProcessId(): number;
        setLastProcessId(id: number): void;
        getLastObjectId(): number;
        setLastObjectId(id: number): void;
        getStepNumber(): number;
        setStepNumber(stepNumber: number): void;
    }
}
declare namespace STSEngine {
    interface IWorldServiceList {
        getWorldAttributeList(): IWorldAttributeList;
        getCommandInitializer(): ICommandInitializer;
        getItemInitializer(): IItemInitializer;
        getProcessInitializer(): IProcessInitializer;
        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;
        getItemListService(): IItemListService;
        getProcessListService(): IProcessListService;
        getClientInitializer(): IClientInitializer;
        getClientListService(): IClientListService;
    }
}
declare namespace STSEngine {
    class Entity implements IEntity {
        protected attributeList: IAttributeList;
        protected lastAttributeId: number;
        private _type;
        private _id;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getType(): number;
        setType(type: number): void;
        getId(): number;
        setId(id: number): void;
        getList(): [number, any][];
        setList(attributeList: Iterable<[number, any]>, clear?: boolean): void;
        [Symbol.iterator]: any;
        getIterator(): IterableIterator<[number, any]>;
        getAttributeList(): IAttributeList;
    }
}
declare namespace STSEngine {
    class Client extends Entity implements IClient {
        protected attributeList: IAttributeList;
        protected attributeNameId: number;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getName(): string;
        setName(name: string): void;
    }
    module ClientType {
        function getNewTypeId(): number;
    }
}
declare namespace STSEngine {
    class EntityListService<T extends IEntity> implements IEntityListService<T> {
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
        getList(): [number, any][][];
        setList(entityList: Iterable<T>, clear?: boolean): void;
        getAll(condition: (item: IEntity) => boolean): IterableIterator<T>;
        getFirst(condition: (item: IEntity) => boolean): T;
        getTyped<V extends T>(objectId: number, type: any): V;
    }
}
declare namespace STSEngine {
    class ClientListService extends EntityListService<IClient> implements IClientListService {
    }
}
declare namespace STSEngine {
    abstract class EntityInitializer<T> implements IEntityInitializer<T> {
        private createIdHandler;
        protected itemAttributeType: number;
        constructor(createIdHandler?: () => number);
        create(attr: Iterable<[number, any]> | number): T;
        protected getItemType(attr: Iterable<[number, any]>): number;
        createList(attrList: Iterable<Iterable<[number, any]>>): Iterable<T>;
        protected abstract createByType(type: number, attr?: Iterable<[number, any]>): T;
        protected createByAttr(attr: Iterable<[number, any]>): T;
        protected createId(): number;
        protected initId(entity: IEntity): void;
        protected createAttributeList(): IAttributeList;
    }
}
declare namespace STSEngine {
    abstract class ClientInitializer extends EntityInitializer<IClient> implements IClientInitializer {
    }
}
declare namespace STSEngine {
    class Command extends Entity implements ICommand {
        private _initiatorId;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getInitiatorId(): number;
        setInitiatorId(id: number): void;
    }
    module Command {
        let LastTypeId: number;
        const Type: number;
    }
}
declare namespace STSEngine {
    class CommandDispatcher implements ICommandDispatcher {
        protected commandHandlerList: ICommandHandler[];
        constructor();
        execute(command: ICommand): void;
    }
}
declare namespace STSEngine {
    class CommandHandler implements ICommandHandler {
        protected worldServiceList: IWorldServiceList;
        constructor(worldServiceList: IWorldServiceList);
        execute(command: ICommand): void;
        isValid(command: ICommand): boolean;
        protected executeCommand(command: ICommand): void;
        protected isValidCommand(command: ICommand): boolean;
        protected isValidCommandType(command: ICommand): boolean;
        protected startProcess(process: IProcess): void;
        protected finishProcess(process: IProcess): void;
    }
}
declare namespace STSEngine {
    abstract class CommandInitializer extends EntityInitializer<ICommand> implements ICommandInitializer {
        protected createByType(type: number, attr?: Iterable<[number, any]>): ICommand;
        createCommand(attr?: Iterable<[number, any]>): ICommand;
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
    class AttributeListArray implements IAttributeList {
        protected attributeList: any[];
        constructor();
        get(attribute: number, defaultValue?: any): any;
        set(attribute: number, value: any): void;
        clear(): void;
        setList(attributeList: Iterable<[number, any]>, clear?: boolean): void;
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
    class AttributeListMap implements IAttributeList {
        protected attributeList: Map<number, any>;
        constructor();
        get(attribute: number, defaultValue?: any): any;
        set(attribute: number, value: any): void;
        clear(): void;
        setList(attributeList: Iterable<[number, any]>, clear?: boolean): void;
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
    class AttributeListMapCommitable implements IAttributeList {
        protected deletedAttributeList: Set<number>;
        protected commitedAttributeList: Map<number, any>;
        protected attributeList: Map<number, any>;
        constructor();
        get(attribute: number, defaultValue?: any): any;
        set(attribute: number, value: any): void;
        clear(): void;
        setList(attributeList: Iterable<[number, any]>, clear?: boolean): void;
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
    class Item extends Entity implements IItem {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
    }
    module Item {
        let LastTypeId: number;
        const Type: number;
    }
}
declare namespace STSEngine {
    abstract class ItemInitializer extends EntityInitializer<IItem> implements IItemInitializer {
        protected createByType(type: number, attr?: Iterable<[number, any]>): IItem;
        createItem(attr?: Iterable<[number, any]>): Item;
    }
}
declare namespace STSEngine {
    class Process extends Entity implements IProcess {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        private _processStatus;
        private _initStep;
        private _finishStep;
        getStatus(): ProcessStatus;
        setStatus(processStatus: ProcessStatus): void;
        getInitStep(): number;
        setInitStep(initStep: number): void;
        getFinishStep(): number;
        setFinishStep(finishStep: number): void;
    }
    module Process {
        let LastTypeId: number;
        const Type: number;
    }
}
declare namespace STSEngine {
    class ProcessDispatcher implements IProcessDispatcher {
        protected processHandlerList: IProcessHandler[];
        execute(process: IProcess): void;
        init(process: IProcess): void;
        finish(process: IProcess): void;
        protected getProcessHandler(process: IProcess): IProcessHandler;
    }
}
declare namespace STSEngine {
    class ProcessHandler implements IProcessHandler {
        protected worldServiceList: IWorldServiceList;
        constructor(worldServiceList: IWorldServiceList);
        init(process: IProcess): void;
        execute(process: IProcess): void;
        finish(process: IProcess): void;
        protected setInitStep(process: IProcess): void;
        protected setFinishStep(process: IProcess): void;
        protected initProcess(process: IProcess): void;
        protected executeProcess(process: IProcess): void;
        protected finishProcess(process: IProcess): void;
        protected isValidProcessType(command: IProcess): boolean;
        protected startProcess(process: IProcess): void;
    }
}
declare namespace STSEngine {
    abstract class ProcessInitializer extends EntityInitializer<IProcess> implements IProcessInitializer {
        protected createByType(type: number, attr?: Iterable<[number, any]>): IProcess;
        createProcess(attr?: Iterable<[number, any]>): IProcess;
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
        clear(): void;
        getIterator(): IterableIterator<IProcess>;
        getList(): [number, any][][];
        setList(entityList: Iterable<IProcess>, clear?: boolean): void;
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
        clear(): void;
        getIterator(): IterableIterator<IProcess>;
        getList(): [number, any][][];
        setList(processList: Iterable<IProcess>, clear?: boolean): void;
        commit(): void;
        rollback(): void;
        isDirty(): boolean;
        getAll(condition: (item: IProcess) => boolean): IterableIterator<IProcess>;
        getFirst(condition: (item: IProcess) => boolean): IProcess;
    }
}
declare namespace STSEngine {
    class ClientServerMessage extends Entity implements IClientServerMessage {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
    }
    module ClientServerMessage {
        let LastTypeId: number;
        const Type: number;
    }
}
declare namespace STSEngine {
    class ClientServerMessageCommandList extends ClientServerMessage {
        private _commandList;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        setCommandList(commandList: [number, any][][]): void;
        getCommandList(): [number, any][][];
    }
    module ClientServerMessageCommandList {
        const Type: number;
    }
}
declare namespace STSEngine {
    class ClientServerMessageInit extends ClientServerMessage {
        private _clientId;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        setClientId(clientId: number): void;
        getClientId(): number;
    }
    module ClientServerMessageInit {
        const Type: number;
    }
}
declare namespace STSEngine {
    class ClientServerMessageInitializer extends EntityInitializer<IClientServerMessage> implements IClientServerMessageInitializer {
        createByType(type: number, attr?: Iterable<[number, any]>): IClientServerMessage;
        createCommandList(attr?: Iterable<[number, any]>): ClientServerMessageCommandList;
        createRequestAuthentication(attr?: Iterable<[number, any]>): ClientServerMessageRequestAuthentication;
        createResponseAuthentication(attr?: Iterable<[number, any]>): ClientServerMessageResponseAuthentication;
        createStep(attr?: Iterable<[number, any]>): ClientServerMessageStep;
        createInit(attr?: Iterable<[number, any]>): ClientServerMessageInit;
        createStepList(attr?: Iterable<[number, any]>): ClientServerMessageStepList;
        createWorldFullInfo(attr?: Iterable<[number, any]>): ClientServerMessageWorldFullInfo;
        protected createAttributeList(): IAttributeList;
    }
}
declare namespace STSEngine {
    class ClientServerMessageRequestAuthentication extends ClientServerMessage {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
    }
    module ClientServerMessageRequestAuthentication {
        const Type: number;
    }
}
declare namespace STSEngine {
    class ClientServerMessageResponseAuthentication extends ClientServerMessage {
        private _sid;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        setSID(sid: string): void;
        getSID(): string;
    }
    module ClientServerMessageResponseAuthentication {
        const Type: number;
    }
}
declare namespace STSEngine {
    class ClientServerMessageStep extends ClientServerMessage {
        private _commandList;
        private _stepNumber;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        setCommandList(commandList: ICommand[]): void;
        getCommandList(): [number, any][][];
        getStepNumber(): number;
        setStepNumber(stepNumber: number): void;
    }
    module ClientServerMessageStep {
        const Type: number;
    }
}
declare namespace STSEngine {
    class ClientServerMessageStepList extends ClientServerMessage {
        private _stepList;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        setStepList(stepList: IEntity[]): void;
        getStepList(): [number, any][][];
    }
    module ClientServerMessageStepList {
        const Type: number;
    }
}
declare namespace STSEngine {
    class ClientServerMessageWorldFullInfo extends ClientServerMessage {
        private _worldAttributeList;
        private _clientListService;
        private _itemListService;
        private _processListService;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        setWorld(world: IWorld): void;
        setWorldAttributeList(worldAttributeList: IWorldAttributeList): void;
        getWorldAttributeList(): [number, any][];
        setClientListService(clientListService: IClientListService): void;
        getClientListService(): [number, any][][];
        setItemListService(itemListService: IItemListService): void;
        getItemListService(): [number, any][][];
        setProcessListService(processListService: IProcessListService): void;
        getProcessListService(): [number, any][][];
    }
    module ClientServerMessageWorldFullInfo {
        const Type: number;
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
        getCommandListService(): ICommandListService;
        step(): void;
        protected increaseStepNumber(): void;
        getCommandList(): ICommand[];
        protected processCommandList(): void;
    }
}
declare namespace STSEngine {
    class EntityListServiceCommitable<T extends IEntity> implements IEntityListService<T>, ICommitable {
        protected objectListService: IEntityListService<T>;
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
        getList(): [number, any][][];
        setList(entityList: Iterable<T>, clear?: boolean): void;
        remove(id: number): void;
        clear(): void;
        commit(): void;
        rollback(): void;
        isDirty(): boolean;
        getAll(condition: (item: T) => boolean): IterableIterator<T>;
        getFirst(condition: (item: T) => boolean): T;
        getTyped<V extends T>(objectId: number, type: any): V;
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
    class World implements IWorld {
        protected worldServiceList: IWorldServiceList;
        protected attributeList: IWorldAttributeList;
        constructor(worldSettings: IWorldServiceList);
        getServiceList(): IWorldServiceList;
        getAttributeList(): IWorldAttributeList;
    }
}
declare namespace STSEngine {
    class WorldAttributeList extends Entity implements IWorldAttributeList {
        private _tickLength;
        private _processId;
        private _lastObjectId;
        private _stepNumber;
        getTickLength(): number;
        setTickLength(tickLength: number): void;
        getLastProcessId(): number;
        setLastProcessId(id: number): void;
        getLastObjectId(): number;
        setLastObjectId(id: number): void;
        getStepNumber(): number;
        setStepNumber(stepNumber: number): void;
    }
}
declare namespace STSEngine {
    abstract class WorldServiceList implements IWorldServiceList {
        protected worldAttributeList: IWorldAttributeList;
        protected itemListService: IItemListService;
        protected processListService: IProcessListService;
        protected clientListService: IClientListService;
        protected clientInitializer: IClientInitializer;
        protected commandInitializer: ICommandInitializer;
        protected itemInitializer: IItemInitializer;
        protected processInitializer: IProcessInitializer;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        getWorldAttributeList(): IWorldAttributeList;
        getCommandInitializer(): ICommandInitializer;
        getItemInitializer(): IItemInitializer;
        getProcessInitializer(): IProcessInitializer;
        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;
        getItemListService(): IItemListService;
        getProcessListService(): IProcessListService;
        getClientListService(): IClientListService;
        getClientInitializer(): IClientInitializer;
        protected getObjectId(): number;
        protected getProcessId(): number;
    }
}
declare namespace STSEngine {
    interface IWebSocketClient {
        getId(): number;
        getStatus(): WebSocketClientStatus;
        setStatus(status: WebSocketClientStatus): void;
        getSID(): string;
        setSID(sid: string): void;
        getClientId(): number;
        setClientId(clientId: number): void;
        sendMessage(message: IClientServerMessage): any;
        setOnMessage(handler: (client: IWebSocketClient, message: IClientServerMessage) => void): void;
        setOnClose(handler: (client: IWebSocketClient) => void): void;
        close(): any;
    }
}
declare namespace STSEngine {
    enum WebSocketClientStatus {
        Initialization = 0,
        Connected = 1,
        Disconnected = 2,
    }
}
declare namespace STSEngine {
    interface IWebSocketClientListService {
        addWebSocketClient(client: any): IWebSocketClient;
        getWebSocketClientListIterator(): IterableIterator<IWebSocketClient>;
    }
}
declare namespace STSEngine {
    interface IWebSocketGameServer {
        start(): void;
    }
}
declare namespace STSEngine {
    interface IWebSocketServer {
        setOnClientConnected(handler: (webSocketClient: IWebSocketClient) => void): void;
        setOnClientDisconnected(handler: (webSocketClient: IWebSocketClient) => void): void;
        setOnClientMessage(handler: (webSocketClient: IWebSocketClient, message: IClientServerMessage) => void): void;
        sendAll(message: IClientServerMessage): void;
    }
}
declare namespace STSEngine {
    class WebSocketClient implements IWebSocketClient {
        protected id: number;
        protected clientId: number;
        protected status: WebSocketClientStatus;
        protected client: any;
        protected sid: string;
        protected onMessageHandler: (client: IWebSocketClient, message: IClientServerMessage) => void;
        protected onCloseHandler: (client: IWebSocketClient) => void;
        protected clientSeverMessageInitializer: IClientServerMessageInitializer;
        constructor(clientSeverMessageInitializer: IClientServerMessageInitializer, id: number, client: any);
        protected init(): void;
        protected onMessage(message: any): void;
        protected processMessage(attr: Iterable<[number, any]>): void;
        protected onClose(): void;
        getId(): number;
        getStatus(): WebSocketClientStatus;
        setStatus(status: WebSocketClientStatus): void;
        getSID(): string;
        setSID(sid: string): void;
        getClientId(): number;
        setClientId(clientId: number): void;
        sendMessage(attr: IClientServerMessage): void;
        setOnMessage(handler: (client: IWebSocketClient, message: IClientServerMessage) => void): void;
        setOnClose(handler: (client: IWebSocketClient) => void): void;
        close(): void;
    }
}
declare namespace STSEngine {
    class WebSocketClientListService implements IWebSocketClientListService {
        protected clientSeverMessageInitializer: IClientServerMessageInitializer;
        private webSocketClientList;
        private lastSocketClientId;
        constructor(clientSeverMessageInitializer: IClientServerMessageInitializer);
        addWebSocketClient(client: any): IWebSocketClient;
        getWebSocketClientListIterator(): IterableIterator<IWebSocketClient>;
        protected getNewSocketClientId(): number;
        close(): void;
    }
}
declare namespace STSEngine {
    abstract class WebSocketGameServer implements IWebSocketGameServer {
        protected webSocketServer: IWebSocketServer;
        protected gameServer: IGameServer;
        protected engine: IEngine;
        protected clientSeverMessageInitializer: IClientServerMessageInitializer;
        constructor(server: any, engine: IEngine, clientSeverMessageInitializer: IClientServerMessageInitializer);
        protected init(): void;
        protected onUpdateWorld(world: IWorld, currentStepNumber: number, commandList: ICommand[]): void;
        protected createStepMessage(currentStepNumber: number, commandList: ICommand[]): ClientServerMessageStep;
        protected onClientConnected(client: IWebSocketClient): void;
        protected abstract getClientIdBySID(sid: string): any;
        protected onClientMessage(webSocketClient: IWebSocketClient, message: IClientServerMessage): void;
        protected processCommandList(webSocketClient: IWebSocketClient, message: ClientServerMessageCommandList): void;
        protected initCommandList(webSocketClient: IWebSocketClient, commandList: Iterable<ICommand>): Iterable<ICommand>;
        start(): void;
    }
}
declare namespace STSEngine {
    class WebSocketServer implements IWebSocketServer {
        private server;
        protected webSocketClientListService: IWebSocketClientListService;
        protected onClientConnectedHandler: (webSocketClient: IWebSocketClient) => void;
        protected onClientDisconnectedHandler: (webSocketClient: IWebSocketClient) => void;
        protected onClientMessageHandler: (webSocketClient: IWebSocketClient, message: IClientServerMessage) => void;
        constructor(server: any, clientSeverMessageInitializer: IClientServerMessageInitializer);
        protected init(): void;
        sendAll(message: IClientServerMessage): void;
        setOnClientConnected(handler: (webSocketClient: IWebSocketClient) => void): void;
        setOnClientMessage(handler: (webSocketClient: IWebSocketClient, message: IClientServerMessage) => void): void;
        setOnClientDisconnected(handler: (webSocketClient: IWebSocketClient) => void): void;
        protected onConnection(client: any): void;
        protected initWebSocketClient(webSocketClient: IWebSocketClient): void;
        protected onClientMessage(webSocketClient: IWebSocketClient, message: IClientServerMessage): void;
        protected onClientDisconnected(webSocketClient: IWebSocketClient): void;
        protected doAuthentication(webSocketClient: IWebSocketClient, message: ClientServerMessageResponseAuthentication): void;
        protected onClientConnected(webSocketClient: IWebSocketClient): void;
        close(): void;
    }
}
declare namespace STSEngine {
    interface IWebSocketGameClient {
        getEngine(): IEngine;
        getClientId(): number;
        setOnConnected(handler: (webSocketClient: IWebSocketGameClient) => void): void;
    }
}
declare namespace STSEngine {
    interface IClientAction {
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
    class WebSocketGameClient implements IWebSocketGameClient {
        protected socket: WebSocket;
        protected sid: string;
        protected engine: IEngine;
        protected clientAction: IClientAction;
        protected clientId: number;
        protected clientSeverMessageInitializer: IClientServerMessageInitializer;
        protected onConnectedHandler: (webSocketClient: IWebSocketGameClient) => void;
        constructor(socket: WebSocket, sid: string, clientAction: IClientAction, engine: IEngine, clientSeverMessageInitializer: IClientServerMessageInitializer);
        getClientId(): number;
        getEngine(): IEngine;
        setOnConnected(handler: (webSocketClient: IWebSocketGameClient) => void): void;
        protected commandInitializator(attr: Iterable<[number, any]>): ICommand;
        protected init(): void;
        protected onClientAction(clientAction: IClientAction): void;
        protected onOpen(ev: Event): void;
        protected onMessage(ev: MessageEvent): void;
        protected processServerMessage(attr: Iterable<[number, any]>): void;
        protected sendAuthentication(): void;
        protected processStep(message: ClientServerMessageStep): void;
        protected processStepList(message: ClientServerMessageStepList): void;
        protected processWorldFullInfo(message: ClientServerMessageWorldFullInfo): void;
        protected processInit(message: ClientServerMessageInit): void;
        protected onClose(ev: CloseEvent): void;
        protected onError(ev: Event): void;
        protected sendMessage(message: IClientServerMessage): void;
    }
}
declare namespace STSEngine {
    class ClientAction implements IClientAction {
        protected commandListService: ICommandListService;
        protected onActionHandler: (clientAction: IClientAction) => void;
        constructor();
        getCommandKeyValuePairList(): [number, any][][];
        clear(): void;
        setOnAction(handler: (clientAction: IClientAction) => void): void;
        protected onAction(): void;
    }
}
declare namespace STSEngine {
    abstract class View {
        protected rootElement: HTMLDivElement;
        protected worldAttributeList: IWorldAttributeList;
        protected itemListService: IItemListService;
        protected processListService: IProcessListService;
        protected clientListService: IClientListService;
        protected isStarted: boolean;
        protected world: IWorld;
        protected clientId: number;
        constructor(rootElement: HTMLDivElement, world: IWorld);
        setClientId(clientId: number): void;
        protected clearHtmlElement(element: HTMLElement): void;
        protected draw(): void;
        protected abstract refresh(): void;
        start(): void;
        stop(): void;
    }
}
