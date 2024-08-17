import express from "express";
import { dbConnection } from "./config/db.js";
import "dotenv/config";
import expressOasGenerator from "@mickeymond/express-oas-generator"
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import session from "express-session";
import Paystack from "paystack-api";
import MongoStore from "connect-mongo";
import { userRouter } from "./routes/user_routes.js";
import { farmerRouter } from "./routes/farmers_routes.js";
import { consumerRouter } from "./routes/consumer_routes.js";
import { paymentRouter } from "./routes/payment_routes.js";
import { messageRouter } from "./routes/message_routes.js";
import { productRouter } from "./routes/product_routes.js";
import { cartRouter } from "./routes/cart_routes.js";
import { restartServer } from "./restart_server.js";

// create express app

const app = express();
const server = http.createServer(app);
const io = new Server(server);


expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ["auth", "farmers", "consumers", "products", "messages", "payments", "cart"],
    mongooseModels: mongoose.modelNames(), 
})


const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

const paystack = Paystack(paystackSecretKey);


dbConnection();

app.use(cors({credentials: true, origin: '*'}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: {secure: true},
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    })
}));

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "UP" });
});


app.use('/api/v1', userRouter);
app.use('/api/v1', farmerRouter);
app.use('/api/v1', consumerRouter);
app.use('/api/v1', paymentRouter);
app.use('/api/v1', messageRouter);
app.use('/api/v1', productRouter);
app.use('/api/v1', cartRouter);

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));


// Socket.IO Setup
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle user joining chat
    socket.on('join', (userId) => {
      socket.join(userId); // Join room based on user ID
      console.log(`User ${userId} joined the chat`);
    });

    // Handle incoming messages
    socket.on('chat message', async (data) => {
      const { senderId, recipientId, messageText } = data;

      try {
        // Save message to database
        const message = new messageModel({
          sender: senderId,
          recipient: recipientId,
          message: messageText,
        });
        await message.save();

        // Emit message to recipient
        io.to(recipientId).emit('chat message', { senderId, messageText });
        io.to(senderId).emit('chat message', { senderId, messageText }); // Optionally notify sender

      } catch (error) {
        console.error('Error handling message:', error);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
});


const port = process.env.PORT;

const reboot = async () => {
  setInterval(restartServer, process.env.INTERVAL)
  }
  
  dbConnection()
    .then(() => {
      app.listen(port, () => {
          reboot().then(() => {
          console.log(`Server Restarted`);
        });
        console.log(`Server is connected to Port`);
      });
    })
    .catch((err) => {
      console.log(err);
      process.exit(-1);
    });

