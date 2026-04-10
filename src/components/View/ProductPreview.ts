
import { IEvents } from "../base/Events";
import { BaseProductCardView } from "./BaseProductCardView";

export class ProductPreview extends BaseProductCardView<HTMLElement> {
  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
  }

  handleClick(): void {
    this.events.emit("product:choose");
  }
}