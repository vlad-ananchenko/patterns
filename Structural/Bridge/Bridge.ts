interface IProvider {
  sendMessage(message: string): void;
  connect(config: unknown): void;
  disconnect(): void;
}

class TelegramProvider implements IProvider {
  sendMessage(message: string): void {
    console.log(message);
  }
  connect(config: string): void {
    console.log(config);
  }
  disconnect(): void {
    console.log('Disconnected Telegram');
  }
}

class WhatsUpProvider implements IProvider {
  sendMessage(message: string): void {
    console.log(message);
  }
  connect(config: string): void {
    console.log(config);
  }
  disconnect(): void {
    console.log('Disconnected WhatsUp...');
  }
}

class NotificationSender {
  constructor(private provider: IProvider) {}

  send() {
    this.provider.connect('connect');
    this.provider.sendMessage('message');
    this.provider.disconnect();
  }
}

class DelayNotificationSender extends NotificationSender {
  constructor(provider: IProvider) {
    super(provider);
  }

  sendDelayed() {}
}

const sender1 = new NotificationSender(new TelegramProvider());
sender1.send();

const sender2 = new NotificationSender(new WhatsUpProvider());
sender2.send();
