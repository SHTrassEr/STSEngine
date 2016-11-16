namespace STSEngine.Example {

    export class ProcessInitializer extends STSEngine.ProcessInitializer implements IProcessInitializer {

        constructor(createIdHandler: () => number) {
            super(createIdHandler);
        }

        protected createByType(type: number, attr?: Iterable<[number, any]>): IProcess {
            let process = super.createByType(type, attr);
            if (process) {
                return process;
            }

            switch (type) {
                case ProcessMoveObject.Type:
                    return this.createMoveObject(attr);
                case ProcessFire.Type:
                    return this.createFire(attr);
                case ProcessCreatePlayerObject.Type:
                    return this.createCreatePlayerObject(attr);
            }
        }
         
        protected setProcessId(process: IProcess) {
            if (!process.getId()) {
                process.setId(this.createId());
            }
        }

        public createMoveObject(attr?: Iterable<[number, any]>): ProcessMoveObject {
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
            return new AttributeListArray();
        }

    }
}

