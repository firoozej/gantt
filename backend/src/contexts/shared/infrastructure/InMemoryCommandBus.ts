import { Command } from '../domain/Command';
import { CommandBus } from '../domain/CommandBus';
import { CommandHandlersInformation } from './CommandHandlersInformation';

export class InMemoryCommandBus implements CommandBus {
    constructor(private commandHandlersInformation: CommandHandlersInformation) {}

    async dispatch(command: Command): Promise<any> {
        const handler = this.commandHandlersInformation.search(command);

        return await handler.handle(command);
    }
}
