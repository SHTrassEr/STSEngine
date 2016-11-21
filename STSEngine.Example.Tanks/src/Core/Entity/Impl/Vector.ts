namespace STSEngine.Example.Tanks {

    export class Vector implements IVector {

        public x: number;
        public y: number;

        constructor(v: IVector)
        constructor(x: number, y: number)
        constructor(x: any, y?: number) 
        {
            if (Number.isFinite(x) && Number.isFinite(y)) {
                this.x = x;
                this.y = y;
                return;
            } else if (x && Number.isFinite(x.x) && Number.isFinite(x.y)) {
                this.x = x.x;
                this.y = x.y;
                return;
            }

            throw new Error();
        }
    }
}