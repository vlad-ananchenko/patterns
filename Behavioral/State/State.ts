class DocumentItem {
  public text: string;
  private state: DocumentItemState;

  constructor() {
    this.setState(new DraftDocumentItemState());
  }

  setState(state: DocumentItemState) {
    this.state = state;
    this.state.setContext(this);
  }

  getState() {
    return this.state;
  }

  publishDoc() {
    this.state.publish();
  }

  deleteDoc() {
    this.state.delete();
  }
}

abstract class DocumentItemState {
  public name: string;
  public item: DocumentItem;

  public setContext(item: DocumentItem) {
    this.item = item;
  }

  public abstract publish(): void;
  public abstract delete(): void;
}

class DraftDocumentItemState extends DocumentItemState {
  constructor() {
    super();
    this.name = 'DraftDocument';
  }

  public publish(): void {
    this.item.setState(new PublishDocumentItemState());
  }
  public delete(): void {
    console.log('The document has been deleted...');
  }
}

class PublishDocumentItemState extends DocumentItemState {
  constructor() {
    super();
    this.name = 'PublishDocument';
  }

  public publish(): void {
    console.log('Cannot publish a published document...');
  }
  public delete(): void {
    console.log('The document has been deleted...');
    this.item.setState(new DraftDocumentItemState());
  }
}

const item = new DocumentItem();
item.text = 'The first post...';
console.log(item.getState());
item.publishDoc();
console.log(item.getState());
item.publishDoc();
item.deleteDoc();
console.log(item.getState());
