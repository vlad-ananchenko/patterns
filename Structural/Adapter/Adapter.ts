class KVDatabase {
  private DB: Map<string, string> = new Map();

  save(key: string, value: string) {
    this.DB.set(key, value);
  }
}

function run(db: KVDatabase) {
  db.save('key', 'value');
}

class PersistentDB {
  savePersistent(db: Object) {
    console.log(db);
  }
}

class PersistentDbAdapter extends KVDatabase {
  constructor(public database: PersistentDB) {
    super();
  }

  override save(key: string, value: string): void {
    this.database.savePersistent({ key, value });
  }
}

run(new PersistentDbAdapter(new PersistentDB()));
