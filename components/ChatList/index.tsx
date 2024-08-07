import { useInitStore } from "@/hooks/useStore";
import ChatPreview from "./ChatPreview";
import { List } from "react-native-paper";
import { ChatListStore } from "@/stores/ChatListStore";
import { observer } from "mobx-react-lite";
import { createStoreContext } from "@/stores/Store";

export const ChatListStoreContext = createStoreContext<ChatListStore>();

const ChatList = () => {
  const chatListStore = useInitStore("chat_list_store", ChatListStore);

  const lastIndex = chatListStore.chats.length - 1;
  return (
    <ChatListStoreContext.Provider value={chatListStore}>
      <List.Section>
        {chatListStore.chats.map((chat, index) => (
          <ChatPreview
            key={index}
            title={chat.title}
            content={chat.content}
            isLast={index === lastIndex}
          />
        ))}
      </List.Section>
    </ChatListStoreContext.Provider>
  );
};

export default observer(ChatList);
