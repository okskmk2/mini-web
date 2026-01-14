import { useEffect, useState } from "react";
import cx from "classnames";
import Markdown from "react-markdown";
import { axiosClient } from "../lib/axiosClient";
import { ChatStatus, ChatType, type ChatItem } from "../lib/types";

export default function AgentMainPage() {
  const [chatList, setChatList] = useState<ChatItem[]>([]);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    axiosClient.get("/chats").then((res) => {
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
    await axiosClient.post("/chat/save", {
      chatType: ChatType.USER,
      text: content,
    });
    setChatList((prev) => {
      const newChatList = [...prev];
      newChatList.push({
        chatType: ChatType.AI,
        chatStatus: ChatStatus.PEND,
        text: "로딩 중...",
      });
      return newChatList;
    });
    let output = "";
    try {
      const res = await axiosClient.post("/chat", {
        contents: content,
      });
      output = res.data.output;
    } catch (error: unknown) {
      if (error instanceof Error) {
        // 이제 이 블록 안에서 error는 Error 타입으로 간주됩니다.
        console.log(error.message);
      } else {
        // error가 Error 객체가 아닌 다른 것(문자열 등)일 때 처리
        console.error("알 수 없는 에러 발생:", error);
      }
    }
    setChatList((prev) => {
      const newChatList = [...prev];
      const lastChat = newChatList[newChatList.length - 1];
      lastChat.text = output;
      lastChat.chatStatus = ChatStatus.DONE;
      return newChatList;
    });
    await axiosClient.post("/chat/save", {
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
                chat.chatType === ChatType.USER ? "user" : "ai",
                chat.chatStatus === ChatStatus.PEND && "loading"
              )}
            >
              <Markdown>{chat.text}</Markdown>
            </div>
          ))}
        </div>
        <form
          className="chatinput-form"
          onSubmit={(e) => {
            e.preventDefault();
            submitContent(content);
          }}
        >
          <input
            required
            type="text"
            value={content}
            onChange={(e) => {
              setContent(e.currentTarget.value);
            }}
          />
          <button type="submit" disabled={!content.trim()}>
            전송
          </button>
        </form>
      </div>
    </main>
  );
}
