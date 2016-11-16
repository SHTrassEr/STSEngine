declare namespace STSEngine.Example {
    abstract class Client extends STSEngine.Client implements IClient {
    }
}
declare namespace STSEngine.Example {
    class ClientActive extends Client implements IClientActive {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        protected attributeScoreId: number;
        getScore(): number;
        setScore(score: number): void;
    }
}
declare namespace STSEngine {
    module ClientType {
        const Active: number;
    }
}
declare namespace STSEngine.Example {
    class ClientInitializer extends STSEngine.ClientInitializer implements IClientInitializer {
        protected createByType(type: number, attr?: Iterable<[number, any]>): IClient;
        createActive(attr?: Iterable<[number, any]>): ClientActive;
        protected createAttributeList(): IAttributeList;
    }
}
declare namespace STSEngine.Example {
    class Point implements IPoint {
        x: number;
        y: number;
        constructor(x: number, y: number);
    }
}
declare namespace STSEngine.Example {
    abstract class Item extends STSEngine.Item implements IItem {
    }
    module Item {
    }
}
declare namespace STSEngine.Example {
    abstract class ItemRectangle extends Item implements IItemRectangle {
        private _position;
        private _positionPrecise;
        private _playerId;
        private _minSpeed;
        private _maxSpeed;
        private _size;
        private _moveDirection;
        getPosition(): [number, number];
        getPosition(d: number): number;
        protected setPosition(position: [number, number]): void;
        getPositionPrecise(): [number, number];
        getPositionPrecise(d: number): number;
        setPositionPrecise(position: [number, number]): void;
        getPlayerId(): number;
        setPlayerId(playerId: number): void;
        getMinSpeed(): number;
        setMinSpeed(speed: number): void;
        getMaxSpeed(): number;
        setMaxSpeed(speed: number): void;
        getSize(): [number, number];
        getSize(d: number): number;
        setSize(size: [number, number]): void;
        getMoveDirection(): MoveDirection;
        setMoveDirection(direction: MoveDirection): void;
    }
}
declare namespace STSEngine.Example {
    class ItemBullet extends ItemRectangle {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
    }
    module ItemBullet {
        const Type: number;
    }
}
declare namespace STSEngine.Example {
    class ItemInitializer extends STSEngine.ItemInitializer implements IItemInitializer {
        constructor(createIdHandler: () => number);
        protected createByType(type: number, attr?: Iterable<[number, any]>): IItem;
        createPlayer(attr?: Iterable<[number, any]>): ItemPlayer;
        createBullet(attr?: Iterable<[number, any]>): ItemBullet;
    }
}
declare namespace STSEngine.Example {
    class ItemPlayer extends ItemRectangle {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
    }
    module ItemPlayer {
        const Type: number;
    }
}
declare namespace STSEngine.Example {
    abstract class Command extends STSEngine.Command implements ICommand {
    }
    module Command {
    }
}
declare namespace STSEngine.Example {
    class CommandCreatePlayerObject extends Command {
        private _playerId;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getPlayerId(): number;
        setPlayerId(id: number): void;
    }
    module CommandCreatePlayerObject {
        const Type: number;
    }
}
declare namespace STSEngine.Example {
    class CommandCreatePlayerObjectHandler extends STSEngine.CommandHandler {
        protected worldServiceList: IWorldServiceList;
        constructor(worldServiceList: IWorldServiceList);
        protected executeCommand(command: CommandCreatePlayerObject): void;
        protected isValidCommand(command: CommandCreatePlayerObject): boolean;
        protected isValidCommandType(command: ICommand): boolean;
    }
}
declare namespace STSEngine.Example {
    class CommandDispatcher extends STSEngine.CommandDispatcher {
        constructor(worldServiceList: IWorldServiceList);
        protected initCommandHandlerList(worldServiceList: IWorldServiceList): void;
    }
}
declare namespace STSEngine.Example {
    class CommandFire extends Command {
        private _objectId;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getObjectId(): number;
        setObjectId(id: number): void;
    }
    module CommandFire {
        const Type: number;
    }
}
declare namespace STSEngine.Example {
    class CommandFireHandler extends STSEngine.CommandHandler {
        protected worldServiceList: IWorldServiceList;
        constructor(worldServiceList: IWorldServiceList);
        protected executeCommand(command: CommandFire): void;
        protected isValidCommand(command: CommandFire): boolean;
        protected isValidCommandType(command: ICommand): boolean;
    }
}
declare namespace STSEngine.Example {
    class CommandInitializer extends STSEngine.CommandInitializer implements ICommandInitializer {
        protected createByType(type: number, attr?: Iterable<[number, any]>): ICommand;
        createRegisterPlayer(attr?: Iterable<[number, any]>): CommandRegisterPlayer;
        createMoveObjectStart(attr?: Iterable<[number, any]>): CommandMoveObjectStart;
        createMoveObjectStop(attr?: Iterable<[number, any]>): CommandMoveObjectStop;
        createPlayerObject(attr?: Iterable<[number, any]>): CommandCreatePlayerObject;
        createFire(attr?: Iterable<[number, any]>): CommandFire;
        protected createAttributeList(): IAttributeList;
    }
}
declare namespace STSEngine.Example {
    class CommandMoveObjectStart extends Command {
        private _objectId;
        private _moveDirection;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getObjectId(): number;
        setObjectId(id: number): void;
        getMoveDirection(): MoveDirection;
        setMoveDirection(direction: MoveDirection): void;
    }
    module CommandMoveObjectStart {
        const Type: number;
    }
}
declare namespace STSEngine.Example {
    class CommandMoveObjectStartHandler extends STSEngine.CommandHandler {
        protected worldServiceList: IWorldServiceList;
        constructor(worldServiceList: IWorldServiceList);
        protected executeCommand(command: CommandMoveObjectStart): void;
        protected isValidCommand(command: CommandMoveObjectStart): boolean;
        protected isValidCommandType(command: ICommand): boolean;
    }
}
declare namespace STSEngine.Example {
    class CommandMoveObjectStop extends Command {
        private _objectId;
        private _moveDirection;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getObjectId(): number;
        setObjectId(id: number): void;
        getMoveDirection(): MoveDirection;
        setMoveDirection(direction: MoveDirection): void;
    }
    module CommandMoveObjectStop {
        const Type: number;
    }
}
declare namespace STSEngine.Example {
    class CommandMoveObjectStopHandler extends STSEngine.CommandHandler {
        protected worldServiceList: IWorldServiceList;
        constructor(worldServiceList: IWorldServiceList);
        protected executeCommand(command: CommandMoveObjectStop): Iterable<IProcess>;
        protected isValidCommand(command: CommandMoveObjectStop): boolean;
        protected isValidCommandType(command: ICommand): boolean;
    }
}
declare namespace STSEngine.Example {
    class CommandRegisterPlayer extends Command {
        private _playerId;
        private _playerName;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getPlayerId(): number;
        setPlayerId(id: number): void;
        getPlayerName(): string;
        setPlayerName(playerName: string): void;
    }
    module CommandRegisterPlayer {
        const Type: number;
    }
}
declare namespace STSEngine.Example {
    class CommandRegisterPlayerHandler extends STSEngine.CommandHandler {
        protected worldServiceList: IWorldServiceList;
        constructor(worldServiceList: IWorldServiceList);
        protected executeCommand(command: CommandRegisterPlayer): void;
        protected isValidCommand(command: CommandRegisterPlayer): boolean;
        protected isValidCommandType(command: ICommand): boolean;
    }
}
declare namespace STSEngine.Example {
    class CollisionService implements ICollisionService {
        protected itemListService: IItemListService;
        protected worldAttributeList: IWorldAttributeList;
        protected clientListService: IClientListService;
        constructor(worldAttributeList: IWorldAttributeList, itemListService: IItemListService, clientListService: IClientListService);
        processCollision(moveItem: IItem, newPosition: [number, number]): void;
        protected processCollisionObjectPlayer(moveItem: ItemPlayer, newPosition: [number, number]): void;
        protected processCollisionObjectBullet(moveItem: ItemBullet, newPosition: [number, number]): void;
        protected processCollisionObjectPlayerObjectPlayer(moveItem: ItemPlayer, newPosition: [number, number], o: ItemPlayer): boolean;
        protected processCollisionObjectBulletObjectPlayer(moveItem: ItemBullet, newPosition: [number, number], o: ItemPlayer): boolean;
        protected processCollisionObjectRectangleWorld(moveItem: IItemRectangle, newPosition: [number, number]): boolean;
        protected isRectangleObjectCollision(pos1: [number, number], size1: [number, number], pos2: [number, number], size2: [number, number]): boolean;
    }
}
declare namespace STSEngine.Example {
    abstract class Process extends STSEngine.Process implements IProcess {
    }
    module Process {
    }
}
declare namespace STSEngine.Example {
    class ProcessCreatePlayerObject extends Process {
        private _playerId;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getPlayerId(): number;
        setPlayerId(id: number): void;
    }
    module ProcessCreatePlayerObject {
        const Type: number;
    }
}
declare namespace STSEngine.Example {
    class ProcessCreatePlayerObjectHandler extends STSEngine.ProcessHandler {
        protected worldServiceList: IWorldServiceList;
        constructor(worldServiceList: IWorldServiceList);
        initProcess(process: ProcessCreatePlayerObject): void;
    }
}
declare namespace STSEngine.Example {
    class ProcessDispatcher extends STSEngine.ProcessDispatcher {
        constructor(worldServiceList: IWorldServiceList);
        protected initProcessHandlerList(worldServiceList: IWorldServiceList): void;
    }
}
declare namespace STSEngine.Example {
    class ProcessFire extends Process {
        private _objectId;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getObjectId(): number;
        setObjectId(id: number): void;
    }
    module ProcessFire {
        const Type: number;
    }
}
declare namespace STSEngine.Example {
    class ProcessFireHandler extends STSEngine.ProcessHandler {
        protected worldServiceList: IWorldServiceList;
        constructor(worldServiceList: IWorldServiceList);
        executeProcess(process: ProcessFire): void;
        protected fire(object: ItemPlayer): void;
    }
}
declare namespace STSEngine.Example {
    class ProcessInitializer extends STSEngine.ProcessInitializer implements IProcessInitializer {
        constructor(createIdHandler: () => number);
        protected createByType(type: number, attr?: Iterable<[number, any]>): IProcess;
        protected setProcessId(process: IProcess): void;
        createMoveObject(attr?: Iterable<[number, any]>): ProcessMoveObject;
        createFire(attr?: Iterable<[number, any]>): ProcessFire;
        createCreatePlayerObject(attr?: Iterable<[number, any]>): ProcessCreatePlayerObject;
        protected createAttributeList(): IAttributeList;
    }
}
declare namespace STSEngine.Example {
    class ProcessMoveObject extends Process {
        private _objectId;
        private _moveDirection;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getObjectId(): number;
        setObjectId(id: number): void;
        getMoveDirection(): MoveDirection;
        setMoveDirection(direction: MoveDirection): void;
    }
    module ProcessMoveObject {
        const Type: number;
    }
}
declare namespace STSEngine.Example {
    class ProcessMoveObjectHandler extends STSEngine.ProcessHandler {
        protected worldServiceList: IWorldServiceList;
        constructor(worldServiceList: IWorldServiceList);
        executeProcess(process: ProcessMoveObject): void;
        protected moveObject(object: IItemRectangle, direction: MoveDirection, execCount: number): void;
    }
}
declare namespace STSEngine.Example {
    class WorldAttributeList extends STSEngine.WorldAttributeList implements IWorldAttributeList {
        private _worldSize;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getWorldSize(): [number, number];
        setWorldSize(size: [number, number]): void;
    }
}
declare namespace STSEngine.Example {
    class WorldServiceList implements IWorldServiceList {
        protected worldAttributeList: IWorldAttributeList;
        protected itemListService: IItemListService;
        protected processListService: IProcessListService;
        protected clientListService: IClientListService;
        protected clientInitializer: IClientInitializer;
        protected commandInitializer: ICommandInitializer;
        protected objectInitializer: IItemInitializer;
        protected processInitializer: IProcessInitializer;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        protected collisionService: ICollisionService;
        constructor(worldAttributeList: WorldAttributeList);
        getWorldAttributeList(): IWorldAttributeList;
        getCommandInitializer(): ICommandInitializer;
        getItemInitializer(): IItemInitializer;
        getProcessInitializer(): IProcessInitializer;
        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;
        getItemListService(): IItemListService;
        getProcessListService(): IProcessListService;
        getCollisionService(): ICollisionService;
        getClientListService(): IClientListService;
        getClientInitializer(): IClientInitializer;
        protected getObjectId(): number;
        protected getProcessId(): number;
    }
}
declare namespace STSEngine.Example {
    interface IClientActive extends STSEngine.IClient {
        getScore(): number;
        setScore(score: number): void;
    }
}
declare namespace STSEngine.Example {
    interface IClientInitializer extends STSEngine.IClientInitializer {
        createActive(attr?: Iterable<[number, any]>): ClientActive;
    }
}
declare namespace STSEngine.Example {
    interface IPoint {
        x: number;
        y: number;
    }
}
declare namespace STSEngine.Example {
    enum MoveDirection {
        Unknow = 0,
        Up = 1,
        Right = 2,
        Down = 3,
        Left = 4,
    }
}
declare namespace STSEngine.Example {
    interface IItemInitializer extends STSEngine.IItemInitializer {
        createPlayer(attr?: Iterable<[number, any]>): ItemPlayer;
        createBullet(attr?: Iterable<[number, any]>): ItemBullet;
    }
}
declare namespace STSEngine.Example {
    interface IItemRectangle extends IItem {
        getPosition(): [number, number];
        getPosition(d: number): number;
        getPositionPrecise(): [number, number];
        getPositionPrecise(d: number): number;
        setPositionPrecise(position: [number, number]): any;
        getSize(): [number, number];
        getSize(d: number): number;
        setSize(size: [number, number]): any;
        getMinSpeed(): number;
        setMinSpeed(speed: number): void;
        getMaxSpeed(): number;
        setMaxSpeed(speed: number): void;
        getMoveDirection(): MoveDirection;
        setMoveDirection(direction: MoveDirection): void;
    }
}
declare namespace STSEngine.Example {
    interface ICommandInitializer extends STSEngine.ICommandInitializer {
        createRegisterPlayer(attr?: Iterable<[number, any]>): CommandRegisterPlayer;
        createMoveObjectStart(attr?: Iterable<[number, any]>): CommandMoveObjectStart;
        createMoveObjectStop(attr?: Iterable<[number, any]>): CommandMoveObjectStop;
        createFire(attr?: Iterable<[number, any]>): CommandFire;
    }
}
declare namespace STSEngine.Example {
    interface IProcessInitializer extends STSEngine.IProcessInitializer {
        createMoveObject(attr?: Iterable<[number, any]>): ProcessMoveObject;
        createFire(attr?: Iterable<[number, any]>): ProcessFire;
        createCreatePlayerObject(attr?: Iterable<[number, any]>): ProcessCreatePlayerObject;
    }
}
declare namespace STSEngine.Example {
    interface ICollisionService {
        processCollision(moveItem: IItem, newPosition: [number, number]): void;
    }
}
declare namespace STSEngine.Example {
    interface IWorld extends STSEngine.IWorld {
        getServiceList(): IWorldServiceList;
        getAttributeList(): IWorldAttributeList;
    }
}
declare namespace STSEngine.Example {
    interface IWorldAttributeList extends STSEngine.IWorldAttributeList {
        getWorldSize(): [number, number];
        setWorldSize(size: [number, number]): void;
    }
}
declare namespace STSEngine.Example {
    interface IWorldServiceList extends STSEngine.IWorldServiceList {
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
        getCollisionService(): ICollisionService;
    }
}
declare namespace STSEngine.Example {
    interface IPlayerAction extends STSEngine.IPlayerAction {
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
declare namespace STSEngine.Example {
    class PlayerAction extends STSEngine.PlayerAction implements IPlayerAction {
        protected onActionHandler: (playerAction: IPlayerAction) => void;
        protected commandInitializer: CommandInitializer;
        constructor();
        protected addCommand(command: ICommand): void;
        startMoveRight(objectId: number): void;
        startMoveLeft(objectId: number): void;
        startMoveUp(objectId: number): void;
        startMoveDown(objectId: number): void;
        stopMoveRight(objectId: number): void;
        stopMoveLeft(objectId: number): void;
        stopMoveUp(objectId: number): void;
        stopMoveDown(objectId: number): void;
        fire(objectId: number): void;
    }
}
declare namespace STSEngine.Example {
    class View extends STSEngine.View {
        protected worldAttributeList: WorldAttributeList;
        protected width: number;
        protected height: number;
        protected renderer: PIXI.SystemRenderer;
        protected stage: PIXI.Container;
        protected playerObjectSprite: PIXI.Graphics;
        protected grid: PIXI.Graphics;
        protected worldLimit: PIXI.Graphics;
        protected objectMap: Map<number, PIXI.Graphics>;
        protected cellSize: number;
        protected stepNumber: number;
        protected clientInfoTextMap: Map<number, PIXI.Text>;
        protected clientListService: IClientListService;
        constructor(rootElement: HTMLDivElement, world: IWorld);
        protected getClientInfoText(client: IClient): PIXI.Text;
        protected updateClientInfo(client: IClientActive): void;
        protected updateAllClientInfo(): void;
        protected drawObjectRectangle(o: ItemRectangle): PIXI.Graphics;
        protected getObjectSprite(o: ItemRectangle): PIXI.Graphics;
        protected clearStage(): void;
        protected refresh(): void;
        protected getDrawPoint(p: number): number;
        protected drawWordLimit(): PIXI.Graphics;
        protected drawGrid(): PIXI.Graphics;
    }
}
declare namespace STSEngine.Example {
    class WebSocketGameClient extends STSEngine.WebSocketGameClient {
        constructor(socket: WebSocket, sid: string, playerAction: IPlayerAction);
    }
}