interface IMediator {
  notify(sender: string, event: string): void;
}

abstract class Mediated {
  mediator: IMediator;

  setMediator(mediator: IMediator) {
    this.mediator = mediator;
  }
}

class Notifications {
  send() {
    console.log('Sent...');
  }
}

class Log {
  log(message: string) {
    console.log(message);
  }
}

class EventHandler extends Mediated {
  myEvent() {
    this.mediator.notify('EventHandler', 'myEvent');
  }
}

class NotificationMediator implements IMediator {
  constructor(
    public notifications: Notifications,
    public logger: Log,
    public eventHandler: EventHandler
  ) {}

  notify(sender: string, event: string): void {
    switch (event) {
      case 'myEvent':
        this.notifications.send();
        this.logger.log('Sent...');

      default:
        break;
    }
  }
}

const handler = new EventHandler();
const logger = new Log();
const notifications = new Notifications();

const mediator = new NotificationMediator(notifications, logger, handler);

handler.setMediator(mediator);
handler.myEvent();
