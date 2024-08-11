import { messageModel } from "../models/message_model.js";


// Save a chat message
export const saveMessage = async (req, res) => {
    try {
        const { senderId, recipientId, messageText } = req.body;

        if (!senderId || !recipientId || !messageText) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const message = new messageModel({ sender: senderId, recipient: recipientId, message: messageText });
        await message.save();

        res.status(201).json({ message: 'Message saved successfully', message });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Retrieve messages between two users
export const getMessages = async (req, res) => {
    try {
        const { userId1, userId2 } = req.params;

        if (!userId1 || !userId2) {
            return res.status(400).json({ error: 'Both user IDs are required' });
        }

        const messages = await messageModel.find({
            $or: [
                { sender: userId1, recipient: userId2 },
                { sender: userId2, recipient: userId1 }
            ]
        }).sort({ createdAt: 1 }); // Sort messages by creation time

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ error: 'Failed to fetch chat history' });
    }
};


