import axios from "axios";
import { useEffect, useState } from "react";
import cx from "classnames";
import Markdown from "react-markdown";

const enum ChatType {
  USER = "U",
  AI = "A",
}

interface ChatItem {
  text: string;
  chatType: ChatType;
}

export default function AgentMainPage() {
  const [chatList, setChatList] = useState<ChatItem[]>([]);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    axios.get("/chats").then((res) => {
      setChatList(res.data);
    });
  }, []);

  const submitContent = async (content: string) => {
    setContent("");
    setChatList((prev) => {
      const newChatList = [...prev];
      newChatList.push({
        chatType: ChatType.USER,
        text: content,
      });
      return newChatList;
    });
    await axios.post("/chat/save", {
      chatType: ChatType.USER,
      text: content,
    });
    setChatList((prev) => {
      const newChatList = [...prev];
      newChatList.push({
        chatType: ChatType.AI,
        text: "로딩 중...",
      });
      return newChatList;
    });
    const res = await axios.post("/chat", {
      contents: content,
    });
    const output = res.data.output;
    setChatList((prev) => {
      const newChatList = [...prev];
      newChatList[newChatList.length - 1].text = output;
      return newChatList;
    });
    await axios.post("/chat/save", {
      chatType: ChatType.AI,
      text: output,
    });
  };

  return (
    <main>
      <h1>AgentMainPage</h1>
      <div className="chat-container">
        <div className="chatlist">
          {chatList.map((chat, i) => (
            <div
              key={"chat" + i}
              className={cx(
                "chat-bubble",
                chat.chatType === ChatType.USER ? "user" : "ai"
              )}
            >
              <Markdown>{chat.text}</Markdown>
            </div>
          ))}
        </div>
        <input
          className="chatinput"
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitContent(content);
            }
          }}
        />
      </div>
    </main>
  );
}
