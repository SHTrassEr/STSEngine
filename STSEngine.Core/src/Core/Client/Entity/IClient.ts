﻿namespace STSEngine.Core {

    export interface IClient extends IEntity {

        getName(): string;
        setName(name: string): void;
    }
}