namespace STSEngine.Core {

    export class BaseException {
        private message: string;

        constructor(message?: string) {
            this.message = message;
        }

        public getMessage(): string {
            return this.message;
        }
    }

}