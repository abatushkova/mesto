export default class Section {
  constructor({ items, render }, containerSelector) {
    this._renderedItems = items;
    this._render = render;
    this._container = containerSelector;
  }

  renderItems() {
    this._renderedItems.forEach(item => this._render(item));
  }

  addItem(item) {
    this._container.append(item);
  }
}
