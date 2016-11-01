namespace STSEngine.Example {

    export class CommandInitializer implements IItemInitializer<ICommand> {

        public create(attr: Iterable<[number, any]> | number): ICommand {
            if (attr instanceof Number) {
                return this.createByType(attr);
            }

            return this.createByArray(<Iterable<[number, any]>>attr);
        }

        public createByArray(attr: Iterable<[number, any]>): ICommand {
            var processType = this.getProcessType(attr);
            return this.createByType(processType, attr);
        }

        public createByType(type: number, attr?: Iterable<[number, any]>): ICommand {
            switch (type) {
                case STSEngine.CommandType.RegisterPlayer:
                    return this.createRegisterPlayer(attr);
                case CommandType.MoveStart:
                    return this.createMoveObjectStart(attr);
                case CommandType.MoveStop:
                    return this.createMoveObjectStop(attr);
                case CommandType.CreatePlayerObject: 
                    return this.createPlayerObjectStop(attr);
            }
        }
         
        protected getProcessType(attr: Iterable<[number, any]>): number {
            for (var kvp of attr) {
                if (kvp[0] == STSEngine.ProcessAttributeType.Type) {
                    return kvp[1];
                }
            }

            return 0;
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

        public createPlayerObjectStop(attr?: Iterable<[number, any]>): CommandCreatePlayerObject {
            return new CommandCreatePlayerObject(this.createAttributeList(), attr);
        }

        protected createAttributeList(): IAttributeList {
            return new AttributeList();
        }
    }
}

