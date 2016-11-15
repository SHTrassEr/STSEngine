namespace STSEngine.Example {

    export class CommandInitializer extends STSEngine.CommandInitializer implements ICommandInitializer {

        public createByType(type: number, attr?: Iterable<[number, any]>): ICommand {
            switch (type) {
                case STSEngine.CommandType.RegisterPlayer:
                    return this.createRegisterPlayer(attr);
                case CommandType.MoveStart:
                    return this.createMoveObjectStart(attr);
                case CommandType.MoveStop:
                    return this.createMoveObjectStop(attr);
                case CommandType.CreatePlayerObject: 
                    return this.createPlayerObject(attr);
                case CommandType.Fire:
                    return this.createFire(attr);
            }

            throw 'Unexpected command type: ' + type;
        }
        

        public createRegisterPlayer(attr?: Iterable<[number, any]>): CommandRegisterPlayer {
            return new CommandRegisterPlayer(this.createAttributeList(), attr);
        }

        public createMoveObjectStart(attr?: Iterable<[number, any]>): CommandMoveObjectStart {
            return new CommandMoveObjectStart(this.createAttributeList(), attr);
        }

        public createMoveObjectStop(attr?: Iterable<[number, any]>): CommandMoveObjectStop {
            return new CommandMoveObjectStop(this.createAttributeList(), attr);
        }

        public createPlayerObject(attr?: Iterable<[number, any]>): CommandCreatePlayerObject {
            return new CommandCreatePlayerObject(this.createAttributeList(), attr);
        }

        public createFire(attr?: Iterable<[number, any]>): CommandFire {
            return new CommandFire(this.createAttributeList(), attr);
        }

        protected createAttributeList(): IAttributeList {
            return new AttributeList();
        }
    }
}

