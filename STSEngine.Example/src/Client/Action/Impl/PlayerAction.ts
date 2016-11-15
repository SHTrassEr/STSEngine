namespace STSEngine.Example {

    export class PlayerAction extends STSEngine.PlayerAction implements IPlayerAction {

        protected onActionHandler: (playerAction: IPlayerAction) => void;
        protected commandInitializer: CommandInitializer;

        constructor() {
            super();
            this.commandInitializer = new CommandInitializer();
        }


        protected addCommand(command: ICommand): void {
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

        public fire(objectId: number): void {
            var command = this.commandInitializer.createFire();
            command.setObjectId(objectId);
            this.addCommand(command);
        }
    }
}
