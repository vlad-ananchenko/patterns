abstract class DeliveryItem {
  items: DeliveryItem[] = [];

  addItem(item: DeliveryItem) {
    this.items.push(item);
  }

  getItemPrices(): number {
    return this.items.reduce(
      (acc: number, item: DeliveryItem) => (acc += item.getPrice()),
      0
    );
  }

  abstract getPrice(): number;
}

export class DeliveryShop extends DeliveryItem {
  constructor(private deliveryFee: number) {
    super();
  }

  getPrice(): number {
    return this.getItemPrices() + this.deliveryFee;
  }
}

export class Package extends DeliveryItem {
  getPrice(): number {
    return this.getItemPrices();
  }
}

export class Product extends DeliveryItem {
  constructor(public price: number) {
    super();
  }

  getPrice(): number {
    return this.price;
  }
}

const shop = new DeliveryShop(100);
shop.addItem(new Product(1000));

const package1 = new Package();
package1.addItem(new Product(300));
package1.addItem(new Product(500));
shop.addItem(package1);

const package2 = new Package();
package2.addItem(new Product(1150));
shop.addItem(package2);

console.log(shop.getPrice());
