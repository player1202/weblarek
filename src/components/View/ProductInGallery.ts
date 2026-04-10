import { BaseProductCardView } from "./BaseProductCardView";
import { ICardActions } from "../../types";

export class ProductInGallery extends BaseProductCardView<HTMLElement> {
  private actions: ICardActions;

  constructor(container: HTMLElement, actions: ICardActions) {
    super(container);
    this.actions = actions;
  }

  handleClick(): void {
    if (this.actions.onClick) {
      this.actions.onClick();
    }
  }
}
