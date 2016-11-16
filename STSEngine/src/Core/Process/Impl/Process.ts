﻿/// <reference path="../../Entity/Impl/Entity.ts" />

namespace STSEngine {

    export class Process extends Entity implements IProcess {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(Process.Type);
        }

        private _processStatus: number = ++this.lastAttributeId;
        private _initStep: number = ++this.lastAttributeId;
        private _finishStep: number = ++this.lastAttributeId;

        public getStatus(): ProcessStatus {
            return this.attributeList.get(this._processStatus, ProcessStatus.Init);
        }

        public setStatus(processStatus: ProcessStatus): void {
            this.attributeList.set(this._processStatus, processStatus);
        }

        public getInitStep(): number {
            return this.attributeList.get(this._initStep, 0);
        }

        public setInitStep(initStep: number): void {
            this.attributeList.set(this._initStep, initStep);
        }

        public getFinishStep(): number {
            return this.attributeList.get(this._finishStep, 0);
        }

        public setFinishStep(finishStep: number): void {
            this.attributeList.set(this._finishStep, finishStep);
        }
    }

    export module Process {
        export let LastTypeId = 0;
        export const Type = ++LastTypeId;
    }
}