import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import {Server} from "socket.io"
import {createServer} from "http"
import {newConnectionHandler} from "./socket/index.js"

const server = express()
const port = process.env.PORT || 3001

const httpServer = createServer(server)
const io = new Server(httpServer)
io.on("connection", newConnectionHandler)

mongoose.connect(process.env.MONGO_URL)

mongoose.connection.on("connected", () => {
    httpServer.listen(port, () => {
        console.log(`Server listening on Port ${port}`)
    })
})