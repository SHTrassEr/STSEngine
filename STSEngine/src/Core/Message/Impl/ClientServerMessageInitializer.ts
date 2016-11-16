/// <reference path="../../Service/Impl/EntityInitializer.ts" />

namespace STSEngine {

    export class ClientServerMessageInitializer extends EntityInitializer<IClientServerMessage> implements IClientServerMessageInitializer {

        public createByType(type: number, attr?: Iterable<[number, any]>): IClientServerMessage {
            switch (type) {
                case ClientServerMessageCommandList.Type:
                    return this.createCommandList(attr);
                case ClientServerMessageRequestAuthentication.Type:
                    return this.createRequestAuthentication(attr);
                case ClientServerMessageResponseAuthentication.Type:
                    return this.createResponseAuthentication(attr);
                case ClientServerMessageStep.Type:
                    return this.createStep(attr);
                case ClientServerMessageStepList.Type:
                    return this.createStepList(attr);
                case ClientServerMessageInit.Type:
                    return this.createInit(attr);
                case ClientServerMessageWorldFullInfo.Type:
                    return this.createWorldFullInfo(attr);
            }
        }

        public createCommandList(attr?: Iterable<[number, any]>): ClientServerMessageCommandList {
            return new ClientServerMessageCommandList(this.createAttributeList(), attr);
        }

        public createRequestAuthentication(attr?: Iterable<[number, any]>): ClientServerMessageRequestAuthentication {
            return new ClientServerMessageRequestAuthentication(this.createAttributeList(), attr);
        }

        public createResponseAuthentication(attr?: Iterable<[number, any]>): ClientServerMessageResponseAuthentication {
            return new ClientServerMessageResponseAuthentication(this.createAttributeList(), attr);
        }

        public createStep(attr?: Iterable<[number, any]>): ClientServerMessageStep {
            return new ClientServerMessageStep(this.createAttributeList(), attr);
        }

        public createInit(attr?: Iterable<[number, any]>): ClientServerMessageInit {
            return new ClientServerMessageInit(this.createAttributeList(), attr);
        }

        public createStepList(attr?: Iterable<[number, any]>): ClientServerMessageStepList {
            return new ClientServerMessageStepList(this.createAttributeList(), attr);
        }

        public createWorldFullInfo(attr?: Iterable<[number, any]>): ClientServerMessageWorldFullInfo {
            return new ClientServerMessageWorldFullInfo(this.createAttributeList(), attr);
        }

        protected createAttributeList(): IAttributeList {
            return new AttributeListArray();
        }
    }
}

