import * as SQLite from "expo-sqlite";
import { drizzle, ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import migration from "../drizzle/migrations";
import { useEffect, useState } from "react";

const DB = "db.db";

export class Storage {
  busy: boolean = false;
  inited: boolean = false;
  error?: any;

  private db?: ExpoSQLiteDatabase<Record<string, any>>;
  private callbacks: { event: string; callback: (...args: any) => void }[] = [];

  constructor() {}

  async init() {
    await this.start("init_loading");
    if (this.inited) {
      return;
    }

    try {
      const expoDb = SQLite.openDatabaseSync(DB);
      this.db = drizzle(expoDb);
      await migrate(this.db, migration);
    } catch (error) {
      this.error = error;
      this.inited = true;
      await this.end();
      return;
    }

    this.inited = true;
    this.error = undefined;
    await this.end("init_loading");
  }

  async start(event?: string) {
    while (this.busy) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.busy = true;
    this.dispatchEvent(event || "loading", this.busy);
  }

  async end(event?: string) {
    this.busy = false;
    this.dispatchEvent(event || "loading", this.busy);
  }

  dispatchEvent(event: string, ...args: any) {
    for (const { event: name, callback } of this.callbacks) {
      if (name !== event) continue;
      callback(args[0]);
    }
  }

  subscribe(event: string, callback: (loading: boolean) => void) {
    this.callbacks.push({ event, callback });
  }
}

var storage: Storage;

export const useInitStorage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!storage) storage = new Storage();
    storage.subscribe("init_loading", setLoading);
    if (!storage.inited) {
      storage.init();
    }
  }, [setLoading]);

  return [loading, storage] as const;
};

export const useStorage = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!storage || !storage.inited) {
      setLoading(true);
      return;
    }
    storage.subscribe("loading", setLoading);
  }, []);

  return [loading, storage] as const;
};
