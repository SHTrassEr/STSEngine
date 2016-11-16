/// <reference path="../../Service/Impl/EntityInitializer.ts" />

namespace STSEngine {

    export abstract class CommandInitializer extends EntityInitializer<ICommand> implements ICommandInitializer {

        protected createByType(type: number, attr?: Iterable<[number, any]>): ICommand {
            switch (type) {
                case Command.Type:
                    return this.createCommand(attr);
            }
        }

        public createCommand(attr?: Iterable<[number, any]>): ICommand {
            var command = new Command(this.createAttributeList(), attr);
            this.initId(command);
            return command;
        }
    }
}

