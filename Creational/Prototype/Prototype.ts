interface IPrototype<T> {
  clone(): T;
}

class UserHistory implements IPrototype<UserHistory> {
  createdAt: Date;

  constructor(public email: string, public name: string) {
    this.createdAt = new Date();
  }
  clone(): UserHistory {
    let target = new UserHistory(this.email, this.name);
    target.createdAt = this.createdAt;
    return target;
  }
}

let user = new UserHistory('@a.v.com', 'User');
console.log(user);
const user2 = user.clone();
console.log(user2);
