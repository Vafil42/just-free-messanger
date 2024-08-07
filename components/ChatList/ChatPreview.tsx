import { useStore } from "@/hooks/useStore";
import { Avatar, Divider, List } from "react-native-paper";
import { observer } from "mobx-react-lite";
import { ChatListStoreContext } from ".";

export interface ChatPreviewProps {
  title: string;
  content: string;
  isLast?: boolean;
}

const ChatPreview = (props: ChatPreviewProps) => {
  const chatListStore = useStore(ChatListStoreContext);

  return (
    <>
      <List.Item
        title={props.title}
        description={props.content}
        descriptionNumberOfLines={2}
        left={() => <Avatar.Text label={props.title[0]} size={40} />}
        onPress={chatListStore.addStore}
        style={{ paddingLeft: 16, paddingRight: 16 }}
      ></List.Item>
      {!props.isLast && <Divider style={{ marginLeft: 16, marginRight: 16 }} />}
    </>
  );
};

export default observer(ChatPreview);
