declare namespace STSEngine.Example {
    class CommandCreatePlayerObject extends STSEngine.Command {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getPlayerId(): number;
        setPlayerId(id: number): void;
    }
}
declare namespace STSEngine.Example {
    class CommandCreatePlayerObjectHandler extends STSEngine.CommandHandler {
        protected processInitializer: ProcessInitializer;
        constructor(processInitializer: ProcessInitializer);
        protected executeCommand(world: IWorld, command: CommandCreatePlayerObject): void;
        protected isValidCommand(world: IWorld, command: CommandCreatePlayerObject): boolean;
        protected isValidCommandType(world: IWorld, command: ICommand): boolean;
    }
}
declare namespace STSEngine.Example {
    class CommandDispatcher extends STSEngine.CommandDispatcher {
        constructor(processInitializer: ProcessInitializer);
        protected initCommandHandlerList(processInitializer: ProcessInitializer): void;
    }
}
declare namespace STSEngine.Example {
    class CommandFire extends Command {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getObjectId(): number;
        setObjectId(id: number): void;
    }
}
declare namespace STSEngine.Example {
    class CommandFireHandler extends STSEngine.CommandHandler {
        protected processInitializer: ProcessInitializer;
        constructor(processInitializer: ProcessInitializer);
        protected executeCommand(world: IWorld, command: CommandFire): void;
        protected isValidCommand(world: IWorld, command: CommandFire): boolean;
        protected isValidCommandType(world: IWorld, command: ICommand): boolean;
    }
}
declare namespace STSEngine.Example {
    class CommandInitializer extends ItemInitializer<ICommand> {
        create(attr: Iterable<[number, any]> | number): ICommand;
        createList(attrList: Iterable<Iterable<[number, any]>>): Iterable<ICommand>;
        createByArray(attr: Iterable<[number, any]>): ICommand;
        createByType(type: number, attr?: Iterable<[number, any]>): ICommand;
        protected getProcessType(attr: Iterable<[number, any]>): number;
        createRegisterPlayer(attr?: Iterable<[number, any]>): CommandRegisterPlayer;
        createMoveObjectStart(attr?: Iterable<[number, any]>): CommandMoveObjectStart;
        createMoveObjectStop(attr?: Iterable<[number, any]>): CommandMoveObjectStop;
        createPlayerObjectStop(attr?: Iterable<[number, any]>): CommandCreatePlayerObject;
        createFire(attr?: Iterable<[number, any]>): CommandFire;
        protected createAttributeList(): IAttributeList;
    }
}
declare namespace STSEngine.Example {
    class CommandMoveObjectStart extends Command {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getObjectId(): number;
        setObjectId(id: number): void;
        getMoveDirection(): MoveDirection;
        setMoveDirection(direction: MoveDirection): void;
    }
}
declare namespace STSEngine.Example {
    class CommandMoveObjectStartHandler extends STSEngine.CommandHandler {
        protected processInitializer: ProcessInitializer;
        constructor(processInitializer: ProcessInitializer);
        protected executeCommand(world: IWorld, command: CommandMoveObjectStart): void;
        protected isValidCommand(world: IWorld, command: CommandMoveObjectStart): boolean;
        protected isValidCommandType(world: IWorld, command: ICommand): boolean;
    }
}
declare namespace STSEngine.Example {
    class CommandMoveObjectStop extends Command {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getObjectId(): number;
        setObjectId(id: number): void;
        getMoveDirection(): MoveDirection;
        setMoveDirection(direction: MoveDirection): void;
    }
}
declare namespace STSEngine.Example {
    class CommandMoveObjectStopHandler extends STSEngine.CommandHandler {
        protected processInitializer: ProcessInitializer;
        constructor(processInitializer: ProcessInitializer);
        protected executeCommand(world: IWorld, command: CommandMoveObjectStop): Iterable<IProcess>;
        protected isValidCommand(world: IWorld, command: CommandMoveObjectStop): boolean;
        protected isValidCommandType(world: IWorld, command: ICommand): boolean;
    }
}
declare namespace STSEngine.Example {
    class CommandRegisterPlayer extends Command {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getPlayerId(): number;
        setPlayerId(id: number): void;
    }
}
declare namespace STSEngine.Example {
    class CommandRegisterPlayerHandler extends STSEngine.CommandHandler {
        protected processInitializer: ProcessInitializer;
        constructor(processInitializer: ProcessInitializer);
        protected executeCommand(world: IWorld, command: CommandRegisterPlayer): void;
        protected isValidCommand(world: IWorld, command: CommandRegisterPlayer): boolean;
        protected isValidCommandType(world: IWorld, command: ICommand): boolean;
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
    class WorldAttributeList extends STSEngine.WorldAttributeList implements IWorldAttributeList {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getWorldSize(): [number, number];
        setWorldSize(size: [number, number]): void;
    }
}
declare namespace STSEngine.Example {
    enum WorldAttributeType {
        WorldSize = 50,
        LastProcessId = 51,
        LastObjectId = 52,
    }
}
declare namespace STSEngine.Example {
    class WorldServiceList extends STSEngine.WorldServiceList {
        protected worldAttributeList: WorldAttributeList;
        protected collisionService: ICollisionService;
        constructor(worldAttributeList: WorldAttributeList);
        getWorldAttributeList(): WorldAttributeList;
    }
}
declare namespace STSEngine.Example {
    class CollisionService implements ICollisionService {
        protected objectListService: IObjectListService;
        protected worldAttributeList: IWorldAttributeList;
        constructor(worldAttributeList: IWorldAttributeList, objectListService: IObjectListService);
        processCollision(moveObject: IObject, newPosition: [number, number]): void;
        protected processCollisionObjectPlayer(moveObject: ObjectPlayer, newPosition: [number, number]): void;
        protected processCollisionObjectBullet(moveObject: ObjectBullet, newPosition: [number, number]): void;
        protected processCollisionObjectPlayerObjectPlayer(moveObject: ObjectPlayer, newPosition: [number, number], o: ObjectPlayer): boolean;
        protected processCollisionObjectBulletObjectPlayer(moveObject: ObjectBullet, newPosition: [number, number], o: ObjectPlayer): boolean;
        protected processCollisionObjectRectangleWorld(moveObject: IObjectRectangle, newPosition: [number, number]): boolean;
        protected isRectangleObjectCollision(pos1: [number, number], size1: [number, number], pos2: [number, number], size2: [number, number]): boolean;
    }
}
declare namespace STSEngine.Example {
    abstract class ObjectRectangle extends STSEngine.ObjectImpl implements IObjectRectangle {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getPosition(): [number, number];
        getPosition(d: number): number;
        getPositionPrecise(): [number, number];
        getPositionPrecise(d: number): number;
        setPositionPrecise(position: [number, number]): void;
        protected setPosition(position: [number, number]): void;
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
    class ObjectBullet extends ObjectRectangle {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
    }
}
declare namespace STSEngine.Example {
    class ObjectInitializer extends ItemInitializer<IObject> {
        create(attr: Iterable<[number, any]> | number): IObject;
        createList(attrList: Iterable<Iterable<[number, any]>>): Iterable<IObject>;
        createByArray(attr: Iterable<[number, any]>): IObject;
        createByType(type: number, attr?: Iterable<[number, any]>): IObject;
        protected getProcessType(attr: Iterable<[number, any]>): number;
        createPlayer(attr?: Iterable<[number, any]>): ObjectPlayer;
        createBullet(attr?: Iterable<[number, any]>): ObjectBullet;
        protected setObjectId(object: IObject): void;
        protected createAttributeList(): IAttributeList;
    }
}
declare namespace STSEngine.Example {
    class ObjectPlayer extends ObjectRectangle {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
    }
}
declare namespace STSEngine.Example {
    class ProcessCreatePlayerObject extends STSEngine.ProcessImpl {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getPlayerId(): number;
        setPlayerId(id: number): void;
    }
}
declare namespace STSEngine.Example {
    class ProcessCreatePlayerObjectHandler extends STSEngine.ProcessHandler {
        protected processInitializer: ProcessInitializer;
        protected objectInitializer: ObjectInitializer;
        constructor(processInitializer: ProcessInitializer, objectInitializer: ObjectInitializer);
        initProcess(world: IWorld, process: ProcessCreatePlayerObject): void;
    }
}
declare namespace STSEngine.Example {
    class ProcessDispatcher extends STSEngine.ProcessDispatcher {
        constructor(worldAttributeList: WorldAttributeList, collisionService: ICollisionService, processInitializer: ProcessInitializer, objectInitializer: ObjectInitializer);
        protected initProcessHandlerList(worldAttributeList: WorldAttributeList, collisionService: ICollisionService, processInitializer: ProcessInitializer, objectInitializer: ObjectInitializer): void;
    }
}
declare namespace STSEngine.Example {
    class ProcessFire extends STSEngine.ProcessImpl {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getObjectId(): number;
        setObjectId(id: number): void;
    }
}
declare namespace STSEngine.Example {
    class ProcessFireHandler extends STSEngine.ProcessHandler {
        protected processInitializer: ProcessInitializer;
        protected objectInitializer: ObjectInitializer;
        protected collisionService: ICollisionService;
        protected worldAttributeList: WorldAttributeList;
        constructor(worldAttributeList: WorldAttributeList, processInitializer: ProcessInitializer, objectInitializer: ObjectInitializer, collisionService: ICollisionService);
        initProcess(world: IWorld, process: ProcessFire): void;
        executeProcess(world: IWorld, process: ProcessFire): void;
        protected fire(world: IWorld, object: ObjectPlayer, worldServiceList: IWorldServiceList): void;
        finish(world: IWorld, process: IProcess): void;
    }
}
declare namespace STSEngine.Example {
    class ProcessInitializer extends ItemInitializer<IProcess> {
        create(attr: Iterable<[number, any]> | number): IProcess;
        createList(attrList: Iterable<Iterable<[number, any]>>): Iterable<IProcess>;
        createByArray(attr: Iterable<[number, any]>): IProcess;
        createByType(type: number, attr?: Iterable<[number, any]>): IProcess;
        protected getProcessType(attr: Iterable<[number, any]>): number;
        protected setProcessId(process: IProcess): void;
        createMove(attr?: Iterable<[number, any]>): ProcessMoveObject;
        createFire(attr?: Iterable<[number, any]>): ProcessFire;
        createCreatePlayerObject(attr?: Iterable<[number, any]>): ProcessCreatePlayerObject;
        protected createAttributeList(): IAttributeList;
    }
}
declare namespace STSEngine.Example {
    class ProcessMoveObject extends STSEngine.ProcessImpl {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getObjectId(): number;
        setObjectId(id: number): void;
        getMoveDirection(): MoveDirection;
        setMoveDirection(direction: MoveDirection): void;
    }
}
declare namespace STSEngine.Example {
    class ProcessMoveObjectHandler extends STSEngine.ProcessHandler {
        protected processInitializer: ProcessInitializer;
        protected objectInitializer: ObjectInitializer;
        protected collisionService: ICollisionService;
        protected worldAttributeList: WorldAttributeList;
        constructor(worldAttributeList: WorldAttributeList, processInitializer: ProcessInitializer, objectInitializer: ObjectInitializer, collisionService: ICollisionService);
        initProcess(world: IWorld, process: ProcessMoveObject): void;
        executeProcess(world: IWorld, process: ProcessMoveObject): void;
        protected moveObject(object: IObjectRectangle, direction: MoveDirection, execCount: number): void;
        finish(world: IWorld, process: IProcess): void;
    }
}
declare namespace STSEngine.Example {
    enum CommandAttributeType {
        ObjectId = 50,
        MoveDirection = 51,
        PlayerId = 52,
    }
}
declare namespace STSEngine.Example {
    enum CommandType {
        CreatePlayerObject = 50,
        MoveStart = 51,
        MoveStop = 52,
        Fire = 53,
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
        getCommandInitializer(): IItemInitializer<ICommand>;
        getObjectInitializer(): IItemInitializer<IObject>;
        getProcessInitializer(): IItemInitializer<IProcess>;
        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;
        getObjectListService(): IObjectListService;
        getProcessListService(): IProcessListService;
    }
}
declare namespace STSEngine.Example {
    interface ICollisionService {
        processCollision(moveObject: IObject, newPosition: [number, number]): void;
    }
}
declare namespace STSEngine.Example {
    interface IObjectRectangle extends IObject {
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
    enum ObjectAttributeType {
        PlayerId = 50,
        Position = 51,
        PositionPrecise = 52,
        MinSpeed = 53,
        MaxSpeed = 54,
        Size = 55,
        MoveDirection = 56,
    }
}
declare namespace STSEngine.Example {
    enum ObjectType {
        Player = 0,
        Bullet = 1,
    }
}
declare namespace STSEngine.Example {
    enum ProcessAttributeType {
        ObjectId = 50,
        Status = 51,
        PlayerId = 52,
        ObjectAttributeList = 53,
    }
}
declare namespace STSEngine.Example {
    enum ProcessType {
        Unknown = 0,
        CreatePlayerObject = 1,
        Move = 2,
        Fire = 3,
    }
}
declare namespace STSEngine.Example {
    interface IPlayerAction {
        getPlayerId(): number;
        setOnAction(handler: () => void): any;
        getCommandKeyValuePairList(): [number, any][][];
        clear(): void;
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
    class PlayerAction implements IPlayerAction {
        protected commandListService: ICommandListService;
        protected playerId: number;
        protected onActionHandler: (playerAction: IPlayerAction) => void;
        protected commandInitializer: CommandInitializer;
        constructor(playerId: number);
        getPlayerId(): number;
        protected commandInitializator(attr: Iterable<[number, any]>): ICommand;
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
        getCommandKeyValuePairList(): [number, any][][];
        clear(): void;
        setOnAction(handler: (playerAction: IPlayerAction) => void): void;
        protected onAction(): void;
    }
}
declare namespace STSEngine.Example {
    class WebSocketGameClient extends STSEngine.WebSocketGameClient {
        constructor(socket: WebSocket, playerAction: IPlayerAction);
    }
}
declare namespace STSEngine.Example {
    class View extends STSEngine.View {
        protected worldAttributeList: WorldAttributeList;
        protected playerId: number;
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
        constructor(rootElement: HTMLDivElement, world: IWorld, playerId: number);
        protected drawObjectRectangle(o: ObjectRectangle): PIXI.Graphics;
        protected getObjectSprite(o: ObjectRectangle): PIXI.Graphics;
        protected clearStage(): void;
        protected refresh(): void;
        protected getDrawPoint(p: number): number;
        protected drawWordLimit(): PIXI.Graphics;
        protected drawGrid(): PIXI.Graphics;
    }
}
