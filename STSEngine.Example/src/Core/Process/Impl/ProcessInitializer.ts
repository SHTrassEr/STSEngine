namespace STSEngine.Example {

    export class ProcessInitializer implements IItemInitializer<IProcess> {
        public create(attr: Iterable<[number, any]> | number): IProcess {
            if (attr instanceof Number) {
                return this.createByType(attr);
            }

            return this.createByArray(<Iterable<[number, any]>>attr);
        }

        public createByArray(attr: Iterable<[number, any]>): IProcess {
            var processType = this.getProcessType(attr);
            return this.createByType(processType, attr);
        }

        public createByType(type: number, attr?: Iterable<[number, any]>): IProcess {
            switch (type) {
                case ProcessType.Move:
                    return this.createMove(attr);
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

        public createMove(attr?: Iterable<[number, any]>): ProcessMoveObject {
            return new ProcessMoveObject(this.createAttributeList(), attr);
        }

        public createCreatePlayerObject(attr?: Iterable<[number, any]>): ProcessCreatePlayerObject {
            return new ProcessCreatePlayerObject(this.createAttributeList(), attr);
        }

        protected createAttributeList(): IAttributeList {
            return new AttributeList();
        }

    }
}

