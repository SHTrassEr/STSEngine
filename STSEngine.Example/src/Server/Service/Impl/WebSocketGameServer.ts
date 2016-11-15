namespace STSEngine.Example {

    export class WebSocketGameServer extends STSEngine.WebSocketGameServer {

        protected lastPlayerId: number;
        protected connectedPlayerList: Map<string, number>;


        constructor(socket: WebSocket) {

            let clientServerMessageInitializer = new ClientServerMessageInitializer();
            let worldAttributeList = new WorldAttributeList();
            let worldServiceList = new WorldServiceList(worldAttributeList);
            
            super(socket, worldServiceList, clientServerMessageInitializer);

            this.lastPlayerId = 0;
            this.connectedPlayerList = new Map<string, number>();
        }


        protected getClientIdBySID(sid: string): number {
            var playerId = 0;

            if (this.connectedPlayerList.has(sid)) {
                playerId = this.connectedPlayerList.get(sid);
            } else {
                this.lastPlayerId = this.lastPlayerId + 1;
                playerId = this.lastPlayerId;
                var command = new CommandRegisterPlayer();
                command.setInitiatorId(0);
                command.setPlayerId(playerId);
                this.commandListService.add(command); 

                this.connectedPlayerList.set(sid, playerId);
            }

            return playerId;
        }

    }
}