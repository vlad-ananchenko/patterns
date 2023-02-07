class Form {
  constructor(public name: string) {}
}

abstract class SaveForm<T> {
  public save(form: Form) {
    const res = this.fill(form);
    this.log(res);
    this.send(res);
  }

  protected abstract fill(form: Form): T;

  protected log(data: T): void {
    console.log(data);
  }

  protected abstract send(data: T): void;
}

class FirstApi extends SaveForm<string> {
  protected fill(form: Form): string {
    return form.name;
  }
  protected send(data: string): void {
    console.log(data);
  }
}

class SecondApi extends SaveForm<{ fio: string }> {
  protected fill(form: Form): { fio: string } {
    return { fio: form.name };
  }
  protected send(data: { fio: string }): void {
    console.log(data);
  }
}

const form1 = new FirstApi();
form1.save(new Form('Kai'));

const form2 = new SecondApi();
form2.save(new Form('Enzo'));
