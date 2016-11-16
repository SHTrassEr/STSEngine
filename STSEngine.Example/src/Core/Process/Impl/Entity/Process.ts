

namespace STSEngine.Example {

    export abstract class Process extends STSEngine.Process implements IProcess {

    }

    export module Process {
        let lastTypeId = STSEngine.Process.LastTypeId;
    }
}