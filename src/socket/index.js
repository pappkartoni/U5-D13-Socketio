let users = []

export const newConnectionHandler = socket => {
    console.log(`New client ${socket.id}`)
    socket.emit("welcome", {message: `sup ${socket.id}`})

    socket.on("setUsername", payload => {
        console.log("payload", payload)

        users.push({username: payload.username, socketId: socket.id})
        socket.emit("loggedIn", users)
        socket.broadcast.emit("updateOnlineUsersList", users)
    })

    socket.on("sendMessage", msg => {
        console.log("msg", msg);
        socket.broadcast.emit("newMessage", msg)
    })

    socket.on("disconnect", () => {
        users = users.filter(user => user.socketId !== socket.id)

        socket.broadcast.emit("updateOnlineUsersList", users)
    })
}