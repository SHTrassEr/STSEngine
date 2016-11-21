namespace STSEngine.Example.Tanks {

    export module MathHelper {

        export function round(n: number, min?: number): number {
            let r = Math.round(n * 100) / 100;
            if (Math.abs(r) < min) {
                return 0;
            }

            return r;
        }
        
    }
}