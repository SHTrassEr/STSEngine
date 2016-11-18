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
                case CommandCreateClientItemTank.Type: 
                    return this.createClientItemTank(attr);
                case CommandFire.Type:
                    return this.createFire(attr);
                case CommandChangeClientName.Type:
                    return this.createChangeClientName(attr);
                case CommandApplyForce.Type:
                    return this.createApplyForce(attr);
                case CommandInitWorld.Type:
                    return this.createInitWorld(attr);
            }
        }

        public createInitWorld(attr?: Iterable<[number, any]>): CommandInitWorld {
            return new CommandInitWorld(this.createAttributeList(), attr);
        }

        public createRegisterClient(attr?: Iterable<[number, any]>): CommandRegisterClient {
            return new CommandRegisterClient(this.createAttributeList(), attr);
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

        public createApplyForce(attr?: Iterable<[number, any]>): CommandApplyForce {
            return new CommandApplyForce(this.createAttributeList(), attr);
        }

    }
}

