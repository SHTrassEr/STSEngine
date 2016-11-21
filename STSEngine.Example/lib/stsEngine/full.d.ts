declare namespace STSEngine.Core {
    module ModuleInfo {
        const name: string;
    }
}
declare namespace STSEngine.Core {
    interface IClient extends IEntity {
        getName(): string;
        setName(name: string): void;
    }
}
declare namespace STSEngine.Core {
    interface IClientListService extends IEntityListService<IClient> {
    }
}
declare namespace STSEngine.Core {
    interface ICommand extends IEntity {
        getInitiatorId(): number;
        setInitiatorId(id: number): void;
    }
}
declare namespace STSEngine.Core {
    interface ICommandDispatcher {
        execute(command: ICommand): void;
    }
}
declare namespace STSEngine.Core {
    interface ICommandHandler {
        execute(command: ICommand): void;
        isValid(command: ICommand): boolean;
    }
}
declare namespace STSEngine.Core {
    interface ICommandListService extends IFilterable<ICommand> {
        getCommandList(): ICommand[];
        add(commahd: ICommand): void;
        setCommandList(commandList: Iterable<ICommand>): void;
        getCommandKeyValuePairList(): [number, any][][];
        clear(): void;
    }
}
declare namespace STSEngine.Core {
    interface IAttributeList extends IterableKeyValuePair, ICommitable {
        get(attribute: number, defaultValue?: any): any;
        set(attribute: number, value: any): void;
        clear(): void;
        setList(attributeList: Iterable<[number, any]>, clear?: boolean): void;
        has(attribute: number): boolean;
        delete(attribute: number): void;
    }
}
declare namespace STSEngine.Core {
    interface IEntity extends IterableKeyValuePair {
        getType(): string;
        getId(): number;
        setId(id: number): void;
        getAttributeList(): IAttributeList;
        setList(attributeList: Iterable<[number, any]>, clear?: boolean): void;
    }
}
declare namespace STSEngine.Core {
    interface IFilterable<T> {
        getAll(condition: (item: T) => boolean): IterableIterator<T>;
        getFirst(condition: (item: T) => boolean): T;
    }
}
declare namespace STSEngine.Core {
    interface IterableKeyValuePair extends Iterable<[number, any]> {
        getList(): [number, any][];
        getIterator(): IterableIterator<[number, any]>;
    }
}
declare namespace STSEngine.Core {
    class BaseException {
        private message;
        constructor(message?: string);
        getMessage(): string;
    }
}
declare namespace STSEngine.Core {
    class NotImplementedException {
    }
}
declare namespace STSEngine.Core {
    interface IItem extends IEntity {
    }
}
declare namespace STSEngine.Core {
    interface IItemListService extends IEntityListService<IItem> {
    }
}
declare namespace STSEngine.Core {
    interface IClientServerMessage extends IEntity {
    }
}
declare namespace STSEngine.Core {
    interface IProcess extends IEntity {
        getInitStep(): number;
        setInitStep(initStep: number): void;
        getFinishStep(): number;
        setFinishStep(finishStep: number): void;
        getStatus(): ProcessStatus;
        setStatus(processStatus: ProcessStatus): void;
        getAttributeList(): IAttributeList;
    }
}
declare namespace STSEngine.Core {
    interface IProcessDispatcher {
        init(process: IProcess): void;
        execute(process: IProcess): void;
        finish(process: IProcess): void;
    }
}
declare namespace STSEngine.Core {
    interface IProcessHandler {
        init(process: IProcess): void;
        execute(process: IProcess): void;
        finish(process: IProcess): void;
    }
}
declare namespace STSEngine.Core {
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
declare namespace STSEngine.Core {
    enum ProcessStatus {
        Unknown = 0,
        Init = 1,
        Executing = 2,
        Finished = 3,
    }
}
declare namespace STSEngine.Core {
    enum ProcessType {
        Unknown = 0,
    }
}
declare namespace STSEngine.Core {
    interface ICommitable {
        commit(): void;
        rollback(): void;
        isDirty(): boolean;
    }
}
declare namespace STSEngine.Core {
    interface IEngine {
        getWorld(): IWorld;
        getCommandListService(): ICommandListService;
        step(): void;
        getCommandList(): ICommand[];
        beforeStep(): ILiteEvent<IEngine>;
        afterStep(): ILiteEvent<IEngine>;
    }
}
declare namespace STSEngine.Core {
    interface IEntityFactory {
        set(t: typeof Entity): void;
        has(t: typeof Entity | string): boolean;
        delete(t: typeof Entity | string): void;
        create<T extends IEntity>(e: typeof Entity): T;
        restore<T extends IEntity>(attr: Iterable<[number, any]>, baseClass: typeof Entity): T;
        restoreList<T extends IEntity>(attrList: Iterable<Iterable<[number, any]>>, baseClass: typeof Entity): Iterable<T>;
    }
}
declare namespace STSEngine.Core {
    interface IEntityListService<T extends IEntity> extends IFilterable<T> {
        init(objectList: Iterable<T>): void;
        get(id: number): T;
        has(id: number): boolean;
        getSize(): number;
        add(object: T): void;
        remove(id: number): void;
        clear(): void;
        getIterator(): IterableIterator<T>;
        serialize(): [number, any][][];
        setList(object: Iterable<T>, clear?: boolean): void;
        getTyped<V extends T>(objectId: number, type: any): V;
        beforeAdd(): ILiteEvent<T>;
        beforeRemove(): ILiteEvent<T>;
    }
}
declare namespace STSEngine.Core {
    interface IFilterService<T> {
        getAll(itemList: Iterable<T>, condition: (item: T) => boolean): IterableIterator<T>;
        getFirst(itemList: Iterable<T>, condition: (item: T) => boolean): T;
    }
}
declare namespace STSEngine.Core {
    interface IGameServer {
        start(): void;
        getCommandLog(startStepNumber: number): ICommand[][];
        setOnUpdateWorld(handler: (world: IWorld, currentStepNumber: number, commandList: ICommand[]) => void): void;
    }
}
declare namespace STSEngine.Core {
    interface ILiteEvent<V> {
        on(handler: {
            (sender: any, data?: V): void;
        }): void;
        off(handler: {
            (sender: any, data?: V): void;
        }): void;
    }
}
declare namespace STSEngine.Core {
    interface IMetronome {
        start(startTime?: number): void;
        getStartTime(): number;
        pause(): void;
        resume(): void;
        getTickLength(): number;
        getTickCount(): number;
    }
}
declare namespace STSEngine.Core {
    class ServiceAttributeType {
        static LastId: string;
    }
}
declare namespace STSEngine.Core {
    interface IWorld {
        getWorldAttributeList(): IWorldAttributeList;
        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;
        getItemListService(): IItemListService;
        getProcessListService(): IProcessListService;
        getEntityFactory(): IEntityFactory;
        getClientListService(): IClientListService;
    }
}
declare namespace STSEngine.Core {
    interface IWorldAttributeList extends IEntity {
        getTickLength(): number;
        setTickLength(tickLength: number): void;
        getLastProcessId(): number;
        setLastProcessId(id: number): void;
        getLastItemId(): number;
        setLastItemId(id: number): void;
        getStepNumber(): number;
        setStepNumber(stepNumber: number): void;
    }
}
declare namespace STSEngine.Core {
    class Entity implements IEntity {
        protected attributeList: IAttributeList;
        protected lastAttributeId: number;
        private _type;
        private _id;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getType(): string;
        private setType(type);
        getId(): number;
        setId(id: number): void;
        getList(): [number, any][];
        setList(attributeList: Iterable<[number, any]>, clear?: boolean): void;
        [Symbol.iterator]: any;
        getIterator(): IterableIterator<[number, any]>;
        getAttributeList(): IAttributeList;
    }
    module Entity {
        const type: string;
    }
}
declare namespace STSEngine.Core {
    class Client extends Entity implements IClient {
        protected attributeList: IAttributeList;
        protected attributeNameId: number;
        getName(): string;
        setName(name: string): void;
    }
    module Client {
        const type: string;
    }
}
declare namespace STSEngine.Core {
    class Command extends Entity implements ICommand {
        private _initiatorId;
        getInitiatorId(): number;
        setInitiatorId(id: number): void;
    }
    module Command {
        const type: string;
    }
}
declare namespace STSEngine.Core {
    class CommandDispatcher implements ICommandDispatcher {
        protected commandHandlerList: Map<string, ICommandHandler>;
        constructor();
        execute(command: ICommand): void;
        protected getHandler(command: ICommand): ICommandHandler;
    }
}
declare namespace STSEngine.Core {
    class CommandHandler implements ICommandHandler {
        protected world: IWorld;
        constructor(world: IWorld);
        execute(command: ICommand): void;
        isValid(command: ICommand): boolean;
        protected executeCommand(command: ICommand): void;
        protected isValidCommand(command: ICommand): boolean;
        protected isValidCommandType(command: ICommand): boolean;
        protected startProcess(process: IProcess): void;
        protected finishProcess(process: IProcess): void;
    }
}
declare namespace STSEngine.Core {
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
declare namespace STSEngine.Core {
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
declare namespace STSEngine.Core {
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
declare namespace STSEngine.Core {
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
declare namespace STSEngine.Core {
    class Item extends Entity implements IItem {
    }
    module Item {
        const type: string;
    }
}
declare namespace STSEngine.Core {
    class ClientServerMessage extends Entity implements IClientServerMessage {
    }
    module ClientServerMessage {
        const type: string;
    }
}
declare namespace STSEngine.Core {
    class ClientServerMessageCommandList extends ClientServerMessage {
        private _commandList;
        setCommandList(commandList: [number, any][][]): void;
        getCommandList(): [number, any][][];
    }
    module ClientServerMessageCommandList {
        const type: string;
    }
}
declare namespace STSEngine.Core {
    class ClientServerMessageInit extends ClientServerMessage {
        private _clientId;
        setClientId(clientId: number): void;
        getClientId(): number;
    }
    module ClientServerMessageInit {
        const type: string;
    }
}
declare namespace STSEngine.Core {
    class ClientServerMessageRequestAuthentication extends ClientServerMessage {
    }
    module ClientServerMessageRequestAuthentication {
        const type: string;
    }
}
declare namespace STSEngine.Core {
    class ClientServerMessageResponseAuthentication extends ClientServerMessage {
        private _sid;
        setSID(sid: string): void;
        getSID(): string;
    }
    module ClientServerMessageResponseAuthentication {
        const type: string;
    }
}
declare namespace STSEngine.Core {
    class ClientServerMessageStep extends ClientServerMessage {
        private _commandList;
        private _stepNumber;
        setCommandList(commandList: ICommand[]): void;
        getCommandList(): [number, any][][];
        getStepNumber(): number;
        setStepNumber(stepNumber: number): void;
    }
    module ClientServerMessageStep {
        const type: string;
    }
}
declare namespace STSEngine.Core {
    class ClientServerMessageStepList extends ClientServerMessage {
        private _stepList;
        setStepList(stepList: IEntity[]): void;
        getStepList(): [number, any][][];
    }
    module ClientServerMessageStepList {
        const type: string;
    }
}
declare namespace STSEngine.Core {
    class ClientServerMessageWorldFullInfo extends ClientServerMessage {
        private _worldAttributeList;
        private _clientListService;
        private _itemListService;
        private _processListService;
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
        const type: string;
    }
}
declare namespace STSEngine.Core {
    class Process extends Entity implements IProcess {
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
        const type: string;
    }
}
declare namespace STSEngine.Core {
    class ProcessDispatcher implements IProcessDispatcher {
        protected processHandlerList: Map<string, IProcessHandler>;
        execute(process: IProcess): void;
        init(process: IProcess): void;
        finish(process: IProcess): void;
        protected getHandler(process: IProcess): IProcessHandler;
    }
}
declare namespace STSEngine.Core {
    class ProcessHandler implements IProcessHandler {
        protected world: IWorld;
        constructor(world: IWorld);
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
declare namespace STSEngine.Core {
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
declare namespace STSEngine.Core {
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
declare namespace STSEngine.Core {
    class Engine implements IEngine {
        protected world: IWorld;
        protected processListService: IProcessListService;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        protected commandListService: ICommandListService;
        private onBeforeStep;
        private onAfterStep;
        constructor(world: IWorld, commandListService: ICommandListService);
        getWorld(): IWorld;
        getCommandListService(): ICommandListService;
        step(): void;
        protected increaseStepNumber(): void;
        getCommandList(): ICommand[];
        protected processCommandList(): void;
        beforeStep(): ILiteEvent<IEngine>;
        afterStep(): ILiteEvent<IEngine>;
    }
}
declare namespace STSEngine.Core {
    class EntityFactory implements IEntityFactory {
        private initEntityHandler;
        protected itemAttributeType: number;
        protected entityList: Map<string, typeof Entity>;
        constructor(initEntityHandler?: (entity: IEntity) => void);
        set(t: typeof Entity): void;
        has(t: typeof Entity | string): boolean;
        delete(t: typeof Entity | string): void;
        protected getType(t: typeof Entity | string): string;
        protected getItemType(attr: Iterable<[number, any]>): string;
        restoreList<T extends IEntity>(attrList: Iterable<Iterable<[number, any]>>, baseClass: typeof Entity): Iterable<T>;
        protected createByType(type: string, attr?: Iterable<[number, any]>): IEntity;
        restore<T extends IEntity>(attr: Iterable<[number, any]>, e: typeof Entity): T;
        create<T extends IEntity>(e: typeof Entity): T;
        protected createByAttr(attr: Iterable<[number, any]>): IEntity;
        protected initEntity(entity: IEntity): void;
        protected createAttributeList(type: string): IAttributeList;
    }
}
declare namespace STSEngine.Core {
    class EntityListService<T extends IEntity> implements IEntityListService<T> {
        protected itemList: Map<number, T>;
        protected filterService: IFilterService<T>;
        private onBeforeAdd;
        private onBeforeRemove;
        constructor();
        init(itemList: Iterable<T>): void;
        get(itemId: number): T;
        getSize(): number;
        add(item: T): void;
        has(id: number): boolean;
        remove(id: number): void;
        clear(): void;
        getIterator(): IterableIterator<T>;
        serialize(): [number, any][][];
        setList(entityList: Iterable<T>, clear?: boolean): void;
        getAll(condition: (item: IEntity) => boolean): IterableIterator<T>;
        getFirst(condition: (item: IEntity) => boolean): T;
        getTyped<V extends T>(itemId: number, type: any): V;
        beforeAdd(): ILiteEvent<T>;
        beforeRemove(): ILiteEvent<T>;
    }
}
declare namespace STSEngine.Core {
    class EntityListServiceCommitable<T extends IEntity> implements IEntityListService<T>, ICommitable {
        protected itemListService: IEntityListService<T>;
        protected deletedItemIdList: Set<number>;
        protected newItemIdList: Set<number>;
        protected filterService: IFilterService<T>;
        private onBeforeAdd;
        private onBeforeRemove;
        constructor();
        init(itemList: Iterable<T>): void;
        get(id: number): T;
        has(id: number): boolean;
        getSize(): number;
        add(item: T): void;
        protected isItemNotDeleted(item: T): boolean;
        getIterator(): IterableIterator<T>;
        serialize(): [number, any][][];
        setList(entityList: Iterable<T>, clear?: boolean): void;
        remove(id: number): void;
        clear(): void;
        commit(): void;
        rollback(): void;
        isDirty(): boolean;
        getAll(condition: (item: T) => boolean): IterableIterator<T>;
        getFirst(condition: (item: T) => boolean): T;
        getTyped<V extends T>(itemId: number, type: any): V;
        beforeAdd(): ILiteEvent<T>;
        beforeRemove(): ILiteEvent<T>;
    }
}
declare namespace STSEngine.Core {
    class FilterService<T> implements IFilterService<T> {
        getAll(itemList: Iterable<T>, condition: (item: T) => boolean): IterableIterator<T>;
        getFirst(itemList: Iterable<T>, condition: (item: T) => boolean): T;
    }
}
declare namespace STSEngine.Core {
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
declare namespace STSEngine.Core {
    class LiteEvent<V> implements ILiteEvent<V> {
        private handlers;
        on(handler: {
            (sender: any, data?: V): void;
        }): void;
        off(handler: {
            (sender: any, data?: V): void;
        }): void;
        trigger(sender: any, data?: V): void;
    }
}
declare namespace STSEngine.Core {
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
declare namespace STSEngine.Core {
    abstract class World implements IWorld {
        protected worldAttributeList: IWorldAttributeList;
        protected itemListService: IItemListService;
        protected processListService: IProcessListService;
        protected clientListService: IClientListService;
        protected entityFactory: IEntityFactory;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        constructor(worldAttributeList: WorldAttributeList);
        protected initEntityFactory(entityFactory: IEntityFactory): void;
        getWorldAttributeList(): IWorldAttributeList;
        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;
        getItemListService(): IItemListService;
        getProcessListService(): IProcessListService;
        getClientListService(): IClientListService;
        getEntityFactory(): IEntityFactory;
        protected getItemId(): number;
        protected getProcessId(): number;
    }
}
declare namespace STSEngine.Core {
    class WorldAttributeList extends Entity implements IWorldAttributeList {
        private _tickLength;
        private _processId;
        private _lastObjectId;
        private _stepNumber;
        getTickLength(): number;
        setTickLength(tickLength: number): void;
        getLastProcessId(): number;
        setLastProcessId(id: number): void;
        getLastItemId(): number;
        setLastItemId(id: number): void;
        getStepNumber(): number;
        setStepNumber(stepNumber: number): void;
    }
    module WorldAttributeList {
        let LastTypeId: number;
        const Type: number;
    }
}
declare namespace STSEngine.Core {
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
declare namespace STSEngine.Core {
    enum WebSocketClientStatus {
        Initialization = 0,
        Connected = 1,
        Disconnected = 2,
    }
}
declare namespace STSEngine.Core {
    interface IWebSocketClientListService {
        addWebSocketClient(client: any): IWebSocketClient;
        getWebSocketClientListIterator(): IterableIterator<IWebSocketClient>;
    }
}
declare namespace STSEngine.Core {
    interface IWebSocketGameServer {
        start(): void;
    }
}
declare namespace STSEngine.Core {
    interface IWebSocketServer {
        setOnClientConnected(handler: (webSocketClient: IWebSocketClient) => void): void;
        setOnClientDisconnected(handler: (webSocketClient: IWebSocketClient) => void): void;
        setOnClientMessage(handler: (webSocketClient: IWebSocketClient, message: IClientServerMessage) => void): void;
        sendAll(message: IClientServerMessage): void;
    }
}
declare namespace STSEngine.Core {
    class WebSocketClient implements IWebSocketClient {
        protected id: number;
        protected clientId: number;
        protected status: WebSocketClientStatus;
        protected client: any;
        protected sid: string;
        protected onMessageHandler: (client: IWebSocketClient, message: IClientServerMessage) => void;
        protected onCloseHandler: (client: IWebSocketClient) => void;
        protected entityFactory: IEntityFactory;
        constructor(entityFactory: IEntityFactory, id: number, client: any);
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
declare namespace STSEngine.Core {
    class WebSocketClientListService implements IWebSocketClientListService {
        protected entityFactory: IEntityFactory;
        private webSocketClientList;
        private lastSocketClientId;
        constructor(entityFactory: IEntityFactory);
        addWebSocketClient(client: any): IWebSocketClient;
        getWebSocketClientListIterator(): IterableIterator<IWebSocketClient>;
        protected getNewSocketClientId(): number;
        close(): void;
    }
}
declare namespace STSEngine.Core {
    abstract class WebSocketGameServer implements IWebSocketGameServer {
        protected webSocketServer: IWebSocketServer;
        protected gameServer: IGameServer;
        protected engine: IEngine;
        constructor(server: any, engine: IEngine);
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
declare namespace STSEngine.Core {
    class WebSocketServer implements IWebSocketServer {
        private server;
        protected webSocketClientListService: IWebSocketClientListService;
        protected onClientConnectedHandler: (webSocketClient: IWebSocketClient) => void;
        protected onClientDisconnectedHandler: (webSocketClient: IWebSocketClient) => void;
        protected onClientMessageHandler: (webSocketClient: IWebSocketClient, message: IClientServerMessage) => void;
        protected entityFactory: IEntityFactory;
        constructor(server: any, entityFactory: IEntityFactory);
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
declare namespace STSEngine.Core {
    interface IClientAction {
        setOnAction(handler: () => void): any;
        getCommandKeyValuePairList(): [number, any][][];
        clear(): void;
    }
}
declare namespace STSEngine.Core {
    interface IWebSocketGameClient {
        getEngine(): IEngine;
        getClientId(): number;
        setOnConnected(handler: (webSocketClient: IWebSocketGameClient) => void): void;
    }
}
declare namespace STSEngine.Core {
    interface IView {
        start(): void;
        stop(): void;
    }
}
declare namespace STSEngine.Core {
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
declare namespace STSEngine.Core {
    class WebSocketGameClient implements IWebSocketGameClient {
        protected socket: WebSocket;
        protected sid: string;
        protected engine: IEngine;
        protected clientAction: IClientAction;
        protected clientId: number;
        protected onConnectedHandler: (webSocketClient: IWebSocketGameClient) => void;
        constructor(socket: WebSocket, sid: string, clientAction: IClientAction, engine: IEngine);
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
declare namespace STSEngine.Core {
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
