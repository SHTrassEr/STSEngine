namespace STSEngine.Example {

    export class ObjectInitializer implements IItemInitializer<IObject> {
        public create(attr: Iterable<[number, any]> | number): IObject {
            if (attr instanceof Number) {
                return this.createByType(attr);
            }

            return this.createByArray(<Iterable<[number, any]>>attr);
        }

        public createByArray(attr: Iterable<[number, any]>): IObject {
            var processType = this.getProcessType(attr);
            return this.createByType(processType, attr);
        }

        public createByType(type: number, attr?: Iterable<[number, any]>): IObject {
            switch (type) {
                case ObjectType.Player:
                    return this.createPlayer(attr);
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

        public createPlayer(attr?: Iterable<[number, any]>): ObjectPlayer {
            return new ObjectPlayer(this.createAttributeList(), attr);
        }

        protected createAttributeList(): IAttributeList {
            return new AttributeList();
        }
    }
}

