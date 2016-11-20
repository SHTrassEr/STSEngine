namespace STSEngine.Example {

    export class ClientAction extends STSEngine.ClientAction implements IClientAction {

        protected onActionHandler: (clientAction: IClientAction) => void;

        protected addCommand(command: ICommand): void {
            this.commandListService.add(command);
            this.onAction();
        }

        public setClientForce(itemId: number, up: boolean, right: boolean, down: boolean, left: boolean): void {
            let force = new Vector(0, 0);

            if (up) {
                force.y -= 1;
            }

            if (down) {
                force.y += 1;
            }

            if (left) {
                force.x -= 1;
            }

            if (right) {
                force.x += 1;
            }

            this.setClientForceVector(itemId, force);
        }

        public setClientForceVector(itemId: number, vector: IVector): void {
            var command = new CommandApplyForce();
            command.setItemId(itemId);
            command.setForce(vector);
            this.addCommand(command);
        }
        
        public fire(itemId: number, position: IVector): void {
            var command = new CommandFire();
            command.setItemId(itemId);
            command.setPosition(position);
            this.addCommand(command);
        }

        public changeClientName(clientId: number, name: string): void {
            var command = new CommandChangeClientName();
            command.setClientId(clientId);
            command.setClientName(name);
            this.addCommand(command);
        }
    }
}
