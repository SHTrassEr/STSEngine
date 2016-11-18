namespace STSEngine.Example {

    export module VectorHelper {

        export function length(v: IVector): number {
            return Math.sqrt(v.x*v.x + v.y*v.y);
        }

        export function normalize(v: IVector): void {
            let len = length(v);
            if (len > 0) {
                v.x /= len;
                v.y /= len;
            }
        }

        export function multScalar(v: IVector, scalar: number): void {
            v.x *= scalar;
            v.y *= scalar;
        }

        export function sum(v1: IVector, v2: IVector): void {
            v1.x += v2.x;
            v1.y += v2.y;
        }

        export function substract(v1: IVector, v2: IVector): void {
            v1.x -= v2.x;
            v1.y -= v2.y;
        }

        export function round(v: IVector): void {
            v.x = MathHelper.round(v.x);
            v.y = MathHelper.round(v.y);
        }

        export function parse(v: any): IVector {

            if (v) {
                return new Vector(v);
            }

            return v;
        }
        
    }
}