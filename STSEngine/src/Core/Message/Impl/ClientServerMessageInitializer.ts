/// <reference path="../../Service/Impl/EntityInitializer.ts" />

namespace STSEngine {

    export class ClientServerMessageInitializer extends EntityInitializer<IClientServerMessage> implements IClientServerMessageInitializer {

        public createByType(type: number, attr?: Iterable<[number, any]>): IClientServerMessage {
            switch (type) {
                case ClientServerMessageType.CommandList:
                    return this.createCommandList(attr);
                case ClientServerMessageType.RequestAuthentication:
                    return this.createRequestAuthentication(attr);
                case ClientServerMessageType.ResponseAuthentication:
                    return this.createResponseAuthentication(attr);
                case ClientServerMessageType.Step:
                    return this.createStep(attr);
                case ClientServerMessageType.StepList:
                    return this.createStepList(attr);
                case ClientServerMessageType.Init:
                    return this.createInit(attr);
                case ClientServerMessageType.WorldFullInfo:
                    return this.createWorldFullInfo(attr);
            }

            throw  'Unexpected command type: ' + type;
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

