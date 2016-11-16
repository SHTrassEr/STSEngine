namespace STSEngine.Example {

    export module VectorHelper {

        export function length(v: [number, number]): number {
            return Math.sqrt(v[0]*v[0] + v[1]*v[1]);
        }

        export function normalize(v: [number, number]): [number, number] {
            let len = length(v);
            if (len > 0) {
                return [v[0] / len, v[1] / len];
            }

            return [0, 0];
        }

        export function multScalar(v: [number, number], scalar: number): [number, number] {
            return [v[0] * scalar, v[1] * scalar];
        }

        export function copy(v: [number, number]): [number, number] {
            return [v[0], v[1]];
        }

        export function sum(v1: [number, number], v2: [number, number]): [number, number] {
            return [v1[0] + v2[0], v1[1] + v2[1]];
        }

        export function round(n: [number, number]): [number, number] {
            return [MathHelper.round(n[0]), MathHelper.round(n[1])];
        }
        
    }
}