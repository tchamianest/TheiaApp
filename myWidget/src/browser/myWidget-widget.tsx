import * as React from "react";
import {
  injectable,
  postConstruct,
  inject,
} from "@theia/core/shared/inversify";
import { AlertMessage } from "@theia/core/lib/browser/widgets/alert-message";
import { ReactWidget } from "@theia/core/lib/browser/widgets/react-widget";
import { Event, MaybePromise, MessageService } from "@theia/core";
import { Message, Saveable, SaveOptions } from "@theia/core/lib/browser";
import { Emitter } from "@theia/core/shared/vscode-languageserver-protocol";

@injectable()
export class MyWidgetWidget extends ReactWidget implements Saveable {
  dirty: boolean = false;
  public readonly onDirtyChangedEmitter = new Emitter<void>();
  onDirtyChanged: Event<void> = this.onDirtyChangedEmitter.event;
  onContentChanged: Event<void>;
  autoSave: "off";
  save(options?: SaveOptions): MaybePromise<void> {
    this.dirty = false;
    this.onDirtyChangedEmitter.fire(undefined);
    throw new Error("Method not implemented.");
  }

  static readonly ID = "myWidget:widget";
  static readonly LABEL = "MyWidget 123";

  @inject(MessageService)
  protected readonly messageService!: MessageService;

  @postConstruct()
  protected init(): void {
    this.doInit();
  }

  protected async doInit(): Promise<void> {
    this.id = MyWidgetWidget.ID;
    this.title.label = MyWidgetWidget.LABEL;
    this.title.caption = "caption test world";
    this.title.closable = true;
    this.title.iconClass = "fa fa-window-maximize"; // example widget icon.
    this.update();
  }

  render(): React.ReactElement {
    const header = `This is a sample widget which simply calls the messageService
        in order to display an info message to end users.`;
    return (
      <div id="widget-container">
        <AlertMessage type="INFO" header={header} />
        <button
          id="displayMessageButton"
          className="theia-button secondary"
          title="Display Message"
          onClick={(_a) => this.displayMessage()}
        >
          Display Message
        </button>
      </div>
    );
  }

  protected displayMessage(): void {
    this.dirty = true;
    this.onDirtyChangedEmitter.fire(undefined);  
    this.messageService.info(
      "Congratulations: MyWidget Widget Successfully Created!"
    );
  }

  protected onActivateRequest(msg: Message): void {
    super.onActivateRequest(msg);
    const htmlElement = document.getElementById("displayMessageButton");
    if (htmlElement) {
      htmlElement.focus();
    }
  }
}
