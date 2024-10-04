/**
 * Generated using theia-extension-generator
 */
import { ContainerModule } from "@theia/core/shared/inversify";
import { MyExtensionContribution } from "./myExtension-contribution";
import { CommandContribution } from "@theia/core";

export default new ContainerModule((bind) => {
  bind(CommandContribution).to(MyExtensionContribution);
});
