export const socketHandler = (io) => {
  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    socket.on("user-online", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("online-users", Array.from(onlineUsers.keys()));
    });

    socket.on("join-chat", (chatId) => {
      socket.join(chatId);
    });

    socket.on("typing", ({ chatId, userName }) => {
      socket.to(chatId).emit("typing", { userName });
    });

    socket.on("send-message", ({ chatId, message }) => {
      socket.to(chatId).emit("receive-message", message);
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) onlineUsers.delete(userId);
      }
      io.emit("online-users", Array.from(onlineUsers.keys()));
    });
  });
};
