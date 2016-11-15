﻿/// <reference path="Process.ts" />

namespace STSEngine.Example {

    export class ProcessMoveObject extends Process {

        private _objectId: number = ++this.lastAttributeId;
        private _moveDirection: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ProcessType.Move);
        }

        public getObjectId(): number {
            return this.attributeList.get(this._objectId);
        }

        public setObjectId(id: number): void {
            this.attributeList.set(this._objectId, id);
        }       

        public getMoveDirection(): MoveDirection {
            return this.attributeList.get(this._moveDirection);
        }

        public setMoveDirection(direction: MoveDirection): void {
            this.attributeList.set(this._moveDirection, direction);
        }
    }
}

namespace STSEngine {

    export module ProcessType {
        export const Move = getNewTypeId();
    }
}