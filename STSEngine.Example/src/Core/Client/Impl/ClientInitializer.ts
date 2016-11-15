namespace STSEngine.Example {

    export class ClientInitializer extends STSEngine.ClientInitializer implements IClientInitializer {

        protected createByType(type: number, attr?: Iterable<[number, any]>): IClient {
            switch (type) {
                case ClientType.Active:
                    return this.createActive(attr);
            }
        }

        public createActive(attr?: Iterable<[number, any]>): ClientActive {
            return new ClientActive(this.createAttributeList(), attr);
        }

        protected createAttributeList(): IAttributeList {
            return new AttributeListArray();
        }
    }
}

