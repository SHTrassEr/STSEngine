/// <reference path="../../Service/Impl/EntityInitializer.ts" />

namespace STSEngine {

    export abstract class ProcessInitializer extends EntityInitializer<IProcess> implements IProcessInitializer {

        protected createByType(type: number, attr?: Iterable<[number, any]>): IProcess {
            switch (type) {
                case Process.Type:
                    return this.createProcess(attr);
            }
        }

        public createProcess(attr?: Iterable<[number, any]>): IProcess {
            var object = new Process(this.createAttributeList(), attr);
            this.initId(object);
            return object;
        }
    }
}

