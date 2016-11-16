namespace STSEngine.Example {

    export module MathHelper {

        export function round(n: number): number {
            return Math.round(n * 100) / 100
        }
        
    }
}