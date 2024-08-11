import { EventBus } from "@/event_bus/EventBus";
import { FieldErrors, Store } from "./Store";
import { action, computed, makeObservable, observable } from "mobx";

export class SignInStore extends Store {
  constructor(eventBus: EventBus, name: string) {
    super(eventBus, name);
    makeObservable(this);
  }

  @observable username = "";
  setUsername = this.createSetter("username");
  usernameError = this.createError("username", [FieldErrors.Requered]);

  @observable password = "";
  setPassword = this.createSetter("password");
  passwordError = this.createError("password", [FieldErrors.Requered]);

  @action submit = async () => {
    if (this.enableError()) return;
    const result = await this.eventBus.emit("sign_in", this.apiReady);
    if (result.ok) return;
    return result.error;
  };

  @computed
  get apiReady() {
    return {
      username: this.username,
      password: this.password,
    };
  }
}
