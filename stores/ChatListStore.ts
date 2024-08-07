import { action, makeObservable, observable } from "mobx";
import { Store } from "./Store";
import { EventBus } from "@/event_bus/EventBus";

interface ChatPriviewEntity {
  title: string;
  content: string;
}

export class ChatListStore extends Store {
  @observable
  chats: ChatPriviewEntity[] = [{ title: "Chat 5", content: "Chat 5 content" }];

  constructor(eventBus: EventBus, name: string) {
    super(eventBus, name);
    makeObservable(this);

    this.eventBus.subscribe(
      "open_chat",
      () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: { title: "Chat 5", content: "Chat 5 content" } });
          }, 1000);
        });
      },
      { subscriber: this.name },
    );
  }

  @action
  addStore = async () => {
    const result = await this.eventBus.emit("open_chat");

    if (result && result.data) {
      this.addChat(result.data);
    }
  };

  @action
  addChat = (chat: ChatPriviewEntity) => {
    this.chats.push(chat);
  };
}
