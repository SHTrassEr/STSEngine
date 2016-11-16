namespace STSEngine.Example {

    export class CommandInitializer extends STSEngine.CommandInitializer implements ICommandInitializer {

        protected createByType(type: number, attr?: Iterable<[number, any]>): ICommand {

            let command = super.createByType(type, attr);
            if (command) {
                return command;
            }

            switch (type) {
                case CommandRegisterClient.Type:
                    return this.createRegisterClient(attr);
                case CommandMoveObjectStart.Type:
                    return this.createMoveObjectStart(attr);
                case CommandMoveObjectStop.Type:
                    return this.createMoveObjectStop(attr);
                case CommandCreateClientItemTank.Type: 
                    return this.createClientItemTank(attr);
                case CommandFire.Type:
                    return this.createFire(attr);
                case CommandChangeClientName.Type:
                    return this.createChangeClientName(attr);
            }
        }
        

        public createRegisterClient(attr?: Iterable<[number, any]>): CommandRegisterClient {
            return new CommandRegisterClient(this.createAttributeList(), attr);
        }

        public createMoveObjectStart(attr?: Iterable<[number, any]>): CommandMoveObjectStart {
            return new CommandMoveObjectStart(this.createAttributeList(), attr);
        }

        public createMoveObjectStop(attr?: Iterable<[number, any]>): CommandMoveObjectStop {
            return new CommandMoveObjectStop(this.createAttributeList(), attr);
        }

        public createClientItemTank(attr?: Iterable<[number, any]>): CommandCreateClientItemTank {
            return new CommandCreateClientItemTank(this.createAttributeList(), attr);
        }

        public createFire(attr?: Iterable<[number, any]>): CommandFire {
            return new CommandFire(this.createAttributeList(), attr);
        }

        public createChangeClientName(attr?: Iterable<[number, any]>): CommandChangeClientName {
            return new CommandChangeClientName(this.createAttributeList(), attr);
        }

    }
}

