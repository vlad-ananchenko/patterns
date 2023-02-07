class Task {
  constructor(public priority: number) {}
}

class Tasklist {
  private tasks: Task[] = [];

  public sortByPriority() {
    this.tasks = this.tasks.sort((a, b) => {
      if (a.priority > b.priority) {
        return 1;
      } else if (a.priority == b.priority) {
        return 0;
      }
      return -1;
    });
  }

  public addTask(task: Task) {
    this.tasks.push(task);
  }

  public getTasks() {
    return this.tasks;
  }

  public countTasks() {
    return this.tasks.length;
  }

  public getIterator() {
    return new PriorityTaskIterator(this);
  }
}

interface IIterator<T> {
  current(): T | undefined;
  next(): T | undefined;
  prev(): T | undefined;
  index(): number;
}

class PriorityTaskIterator implements IIterator<Task> {
  private position: number = 0;
  private taskList: Tasklist;

  constructor(taskList: Tasklist) {
    taskList.sortByPriority();
    this.taskList = taskList;
  }

  current(): Task {
    return this.taskList.getTasks()[this.position];
  }
  next(): Task {
    this.position += 1;
    return this.taskList.getTasks()[this.position];
  }
  prev(): Task {
    this.position -= 1;
    return this.taskList.getTasks()[this.position];
  }
  index(): number {
    return this.position;
  }
}

const taskList = new Tasklist();
taskList.addTask(new Task(8));
taskList.addTask(new Task(3));
taskList.addTask(new Task(5));

const iterator = taskList.getIterator();
iterator.current();
iterator.next();
iterator.prev();
iterator.index();
