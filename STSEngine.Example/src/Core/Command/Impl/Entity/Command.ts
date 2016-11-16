namespace STSEngine.Example {

    export abstract class Command extends STSEngine.Command implements ICommand {

    }

    export module Command {
        let lastTypeId = STSEngine.Command.LastTypeId;
    }
}