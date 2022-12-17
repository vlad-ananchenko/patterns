// Imitation of internal services

class Notify {
  send(template: string, to: string) {
    console.log(`Sending ${template} to ${to}`);
  }
}

class Log {
  log(message: string) {
    console.log(message);
  }
}

class Template {
  private templates = [
    {
      name: 'other',
      template: '<h1>Template...</h1>',
    },
  ];

  getByName(name: string) {
    return this.templates.find((t) => t.name === name);
  }
}

// Facade

class NotificationFacade {
  private notify: Notify;
  private logger: Log;
  private template: Template;

  constructor() {
    this.notify = new Notify();
    this.logger = new Log();
    this.template = new Template();
  }

  send(to: string, templateName: string) {
    const data = this.template.getByName(templateName);
    if (!data) {
      this.logger.log('No template...');
      return;
    } else {
      this.notify.send(data.template, to);
      this.logger.log('Sent template...');
    }
  }
}

const service = new NotificationFacade();
service.send('test@gmail.com', 'other');
