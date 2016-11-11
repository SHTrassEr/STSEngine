namespace STSEngine.Example {

    export class PlayerAction implements IPlayerAction {

        protected commandListService: ICommandListService;
        protected playerId: number;
        protected onActionHandler: (playerAction: IPlayerAction) => void;
        protected commandInitializer: CommandInitializer;

        constructor(playerId: number) {
            this.commandInitializer = new CommandInitializer();
            this.commandListService = new CommandListService();
            this.playerId = playerId;
        }

        public getPlayerId(): number {
            return this.playerId;
        }

        protected commandInitializator(attr: Iterable<[number, any]>): ICommand {
            return new Command(new AttributeList(), attr);
        }

        protected addCommand(command: ICommand): void {
            command.setInitiatorId(this.playerId);
            this.commandListService.add(command);
            this.onAction();
        }

        public startMoveRight(objectId: number): void {
            var command = this.commandInitializer.createMoveObjectStart();
            command.setMoveDirection(MoveDirection.Right);
            command.setObjectId(objectId);
            this.addCommand(command);
        }

        public startMoveLeft(objectId: number): void {
            var command = this.commandInitializer.createMoveObjectStart();
            command.setMoveDirection(MoveDirection.Left);
            command.setObjectId(objectId);
            this.addCommand(command);
        }

        public startMoveUp(objectId: number): void {
            var command = this.commandInitializer.createMoveObjectStart();
            command.setMoveDirection(MoveDirection.Up);
            command.setObjectId(objectId);
            this.addCommand(command);
        }

        public startMoveDown(objectId: number): void {
            var command = this.commandInitializer.createMoveObjectStart();
            command.setMoveDirection(MoveDirection.Down);
            command.setObjectId(objectId);
            this.addCommand(command);
        }

        public stopMoveRight(objectId: number): void {
            var command = this.commandInitializer.createMoveObjectStop();
            command.setMoveDirection(MoveDirection.Right);
            command.setObjectId(objectId);
            this.addCommand(command);
        }

        public stopMoveLeft(objectId: number): void {
            var command = this.commandInitializer.createMoveObjectStop();
            command.setMoveDirection(MoveDirection.Left);
            command.setObjectId(objectId);
            this.addCommand(command);
        }

        public stopMoveUp(objectId: number): void {
            var command = this.commandInitializer.createMoveObjectStop();
            command.setMoveDirection(MoveDirection.Up);
            command.setObjectId(objectId);
            this.addCommand(command);
        }

        public stopMoveDown(objectId: number): void {
            var command = this.commandInitializer.createMoveObjectStop();
            command.setMoveDirection(MoveDirection.Down);
            command.setObjectId(objectId);
            this.addCommand(command);
        }

        public getCommandKeyValuePairList(): [number, any][][] {
            return this.commandListService.getCommandKeyValuePairList();
        }

        public clear(): void {
            this.commandListService.clear();
        }

        public setOnAction(handler: (playerAction: IPlayerAction) => void) {
            this.onActionHandler = handler;
        }

        protected onAction() {
            if (this.onActionHandler) {
                this.onActionHandler(this);
            }
        }
    }
}

//export = STSEngine;

