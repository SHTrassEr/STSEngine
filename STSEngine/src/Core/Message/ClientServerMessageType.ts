namespace STSEngine {

    export enum ClientServerMessageType {
        Unknown,

        //server
        RequestAuthentication,
        Init,
        Step,
        StepList,

        //client
        ResponseAuthentication,
        CommandList
    }
}