declare namespace STSEngine.Example {
    class Point implements IPoint {
        x: number;
        y: number;
        constructor(x: number, y: number);
    }
}
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
    class ObjectInitializer extends ItemInitializer<IObject> {
        create(attr: Iterable<[number, any]> | number): IObject;
        createList(attrList: Iterable<Iterable<[number, any]>>): Iterable<IObject>;
        createByArray(attr: Iterable<[number, any]>): IObject;
        createByType(type: number, attr?: Iterable<[number, any]>): IObject;
        protected getProcessType(attr: Iterable<[number, any]>): number;
        createPlayer(attr?: Iterable<[number, any]>): ObjectPlayer;
        protected setObjectId(object: IObject): void;
        protected createAttributeList(): IAttributeList;
    }
}
declare namespace STSEngine.Example {
    class ObjectPlayer extends STSEngine.ObjectImpl {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getPosition(): IPoint;
        setPosition(position: IPoint): void;
        getPlayerId(): number;
        setPlayerId(playerId: number): void;
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
        constructor(processInitializer: ProcessInitializer, objectInitializer: ObjectInitializer);
        protected initProcessHandlerList(processInitializer: ProcessInitializer, objectInitializer: ObjectInitializer): void;
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
        constructor(processInitializer: ProcessInitializer, objectInitializer: ObjectInitializer);
        initProcess(world: IWorld, process: ProcessMoveObject): void;
        executeProcess(world: IWorld, process: ProcessMoveObject): void;
        protected moveObject(object: ObjectPlayer, direction: MoveDirection): void;
        finish(world: IWorld, process: IProcess): void;
    }
}
declare namespace STSEngine.Example {
    class ExampleWorldServiceList extends WorldServiceList {
        constructor(worldAttributeList: IWorldAttributeList);
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
    }
}
declare namespace STSEngine.Example {
    enum ObjectAttributeType {
        PlayerId = 50,
        Position = 51,
    }
}
declare namespace STSEngine.Example {
    enum ObjectType {
        Player = 0,
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
        getCommandKeyValuePairList(): [number, any][][];
        clear(): void;
        setOnAction(handler: (playerAction: IPlayerAction) => void): void;
        protected onAction(): void;
    }
}
declare namespace STSEngine.Example {
    class ExampleWebSocketGameClient extends WebSocketGameClient {
        constructor(socket: WebSocket, playerAction: IPlayerAction);
    }
}
