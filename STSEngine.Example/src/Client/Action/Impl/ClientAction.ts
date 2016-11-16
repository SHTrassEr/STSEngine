namespace STSEngine.Example {

    export class ClientAction extends STSEngine.ClientAction implements IClientAction {

        protected onActionHandler: (clientAction: IClientAction) => void;
        protected commandInitializer: CommandInitializer;

        constructor() {
            super();
            this.commandInitializer = new CommandInitializer();
        }


        protected addCommand(command: ICommand): void {
            this.commandListService.add(command);
            this.onAction();
        }

        public setClientForce(itemId: number, up: boolean, right: boolean, down: boolean, left: boolean): void {
            let force: [number, number] = [0, 0];

            if (up) {
                force[1] -= 1;
            }

            if (down) {
                force[1] += 1;
            }

            if (left) {
                force[0] -= 1;
            }

            if (right) {
                force[0] += 1;
            }
            
            var command = this.commandInitializer.createSetClientForceVector();
            command.setItemId(itemId);
            command.setClientForceVector(force);
            this.addCommand(command);
        }
        
        public fire(itemId: number): void {
            var command = this.commandInitializer.createFire();
            command.setItemId(itemId);
            this.addCommand(command);
        }

        public changeClientName(clientId: number, name: string): void {
            var command = this.commandInitializer.createChangeClientName();
            command.setClientId(clientId);
            command.setClientName(name);
            this.addCommand(command);
        }
    }
}
