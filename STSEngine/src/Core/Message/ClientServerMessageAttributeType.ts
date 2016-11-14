namespace STSEngine {

    export enum ClientServerMessageAttributeType {
        CommandList = 20,

        //server
        PlayerId,
        WorldInfo,
        StepNumber,
        StepList,

        //cient
        SID
    }
}