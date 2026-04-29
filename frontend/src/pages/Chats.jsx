import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000");

export default function Chats() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.emit("user-online", user?._id);

    api.get("/api/chats").then((res) => setChats(res.data));
  }, [user?._id]);

  const getOtherUser = () => {
    return active?.participants.find((p) => p._id !== user?._id);
  };

  const openChat = async (chat) => {
    setActive(chat);
    socket.emit("join-chat", chat._id);

    const { data } = await api.get(`/api/chats/${chat._id}/messages`);
    setMessages(data);
  };

  const send = async () => {
    if (!text.trim() || !active) return;

    const { data } = await api.post(`/api/chats/${active._id}/messages`, {
      text,
    });

    setMessages((prev) => [...prev, data]);

    socket.emit("send-message", {
      chatId: active._id,
      message: data,
    });

    setText("");
  };

  useEffect(() => {
    socket.on("receive-message", (message) => {
      if (active && message.chat === active._id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => socket.off("receive-message");
  }, [active]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl shadow-sm border p-4">
        <h1 className="text-2xl font-bold mb-4">Chats</h1>

        {chats.map((chat) => (
          <button
            key={chat._id}
            onClick={() => openChat(chat)}
            className="w-full text-left p-3 hover:bg-slate-50 rounded-xl"
          >
            {chat.participants
              .filter((p) => p._id !== user?._id)
              .map((p) => p.name)
              .join(", ")}

            <p className="text-sm text-slate-500">{chat.lastMessage}</p>
          </button>
        ))}
      </div>

      <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border p-4 min-h-[500px] flex flex-col">
        <div className="border-b pb-3 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {active
              ? `Conversation with ${getOtherUser()?.name}`
              : "Select a chat"}
          </h2>

          {active && (
            <button
              onClick={() =>
                navigate("/book-session", {
                  state: { teacher: getOtherUser() },
                })
              }
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
            >
              Book Session
            </button>
          )}
        </div>

        <div className="flex-1 py-4 space-y-3 overflow-y-auto">
          {messages.map((m) => {
            const isMe = m.sender?._id === user?._id;

            return (
              <div
                key={m._id}
                className={`max-w-md p-3 rounded-xl ${
                  isMe
                    ? "bg-indigo-600 text-white ml-auto"
                    : "bg-slate-100 text-slate-900"
                }`}
              >
                <p
                  className={`text-xs mb-1 ${
                    isMe ? "text-indigo-100" : "text-slate-500"
                  }`}
                >
                  {isMe ? "You" : m.sender?.name}
                </p>
                <p>{m.text}</p>
              </div>
            );
          })}
        </div>

        {active && (
          <div className="flex gap-3 border-t pt-3">
            <input
              className="flex-1 border p-3 rounded-xl"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type message..."
            />

            <button
              onClick={send}
              className="bg-indigo-600 text-white px-6 rounded-xl"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}