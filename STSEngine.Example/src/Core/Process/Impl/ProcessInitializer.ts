﻿namespace STSEngine.Example {

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
                case ProcessFire.Type:
                    return this.createFire(attr);
                case ProcessCreateClientItemTank.Type:
                    return this.createCreateClientItemTank(attr);
                case ProcessMoveItem.Type:
                    return this.createMoveItem(attr);
            }
        }
         
        protected setProcessId(process: IProcess) {
            if (!process.getId()) {
                process.setId(this.createId());
            }
        }

        public createFire(attr?: Iterable<[number, any]>): ProcessFire {
            var process = new ProcessFire(this.createAttributeList(), attr);
            this.setProcessId(process);
            return process;
        }

        public createCreateClientItemTank(attr?: Iterable<[number, any]>): ProcessCreateClientItemTank {
            var process = new ProcessCreateClientItemTank(this.createAttributeList(), attr);
            this.setProcessId(process);
            return process;
        }

        public createMoveItem(attr?: Iterable<[number, any]>): ProcessMoveItem {
            var process = new ProcessMoveItem(this.createAttributeList(), attr);
            this.setProcessId(process);
            return process;
        }

        protected createAttributeList(): IAttributeList {
            return new AttributeListArray();
        }

    }
}

