interface IPaymentAPI {
  getPaymentDetails(id: number): IPaymentDetails | undefined;
}

interface IPaymentDetails {
  id: number;
  sum: number;
}

class PaymentAPI implements IPaymentAPI {
  private data = [{ id: 1, sum: 5000 }];

  getPaymentDetails(id: number): IPaymentDetails | undefined {
    return this.data.find((d) => d.id === id);
  }
}

class PaymentAccessProxy implements IPaymentAPI {
  constructor(private api: PaymentAPI, private userId: number) {}

  getPaymentDetails(id: number): IPaymentDetails | undefined {
    if (this.userId === 1) {
      return this.api.getPaymentDetails(id);
    }
    console.log('Error...');
    return undefined;
  }
}

const proxy = new PaymentAccessProxy(new PaymentAPI(), 1);
console.log(proxy.getPaymentDetails(1));

const proxy2 = new PaymentAccessProxy(new PaymentAPI(), 2);
console.log(proxy2.getPaymentDetails(2));
