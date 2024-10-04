import {
  CommandContribution,
  CommandRegistry,
  MessageService,
} from "@theia/core";
import { inject, injectable } from "@theia/core/shared/inversify";

export const MyCommand = {
  id: "MyID",
  label: "Say hello",
};
@injectable()
// Add contribution interface to be implemented, e.g. "MyExtensionContribution implements CommandContribution"
export class MyExtensionContribution implements CommandContribution {
  constructor(
    @inject(MessageService) private readonly messageService: MessageService
  ) {}

  registerCommands(commandRegistry: CommandRegistry): void {
    commandRegistry.registerCommand(MyCommand, {
      execute: () => this.messageService.info("Hello world"),
    });
  }
}
