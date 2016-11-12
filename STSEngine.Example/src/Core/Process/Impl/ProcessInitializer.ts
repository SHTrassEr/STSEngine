namespace STSEngine.Example {

    export class ProcessInitializer extends ItemInitializer<IProcess> {
        public create(attr: Iterable<[number, any]> | number): IProcess {
            if (attr instanceof Number) {
                return this.createByType(attr);
            }

            return this.createByArray(<Iterable<[number, any]>>attr);
        }

        public * createList(attrList: Iterable<Iterable<[number, any]>>): Iterable<IProcess> {
            for (let attr of attrList) {
                yield this.create(attr);
            }
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

        protected setProcessId(process: IProcess) {
            process.setId(this.getId());
        }

        public createMove(attr?: Iterable<[number, any]>): ProcessMoveObject {
            var process = new ProcessMoveObject(this.createAttributeList(), attr);
            this.setProcessId(process);
            return process;
        }

        public createFire(attr?: Iterable<[number, any]>): ProcessFire {
            var process = new ProcessFire(this.createAttributeList(), attr);
            this.setProcessId(process);
            return process;
        }

        public createCreatePlayerObject(attr?: Iterable<[number, any]>): ProcessCreatePlayerObject {
            var process = new ProcessCreatePlayerObject(this.createAttributeList(), attr);
            this.setProcessId(process);
            return process;
        }

        protected createAttributeList(): IAttributeList {
            return new AttributeList();
        }

    }
}

