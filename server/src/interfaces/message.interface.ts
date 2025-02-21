import mongoose from "mongoose";
import { messageModel } from "../types/message.type";

type messageWithOutID = Omit<messageModel, 'id' | 'sender' | 'recipient'>

export interface IMessageDocument extends mongoose.Document, messageWithOutID {
    sender: mongoose.Types.ObjectId
    recipient: mongoose.Types.ObjectId
    created_at?: Date
    toMessage: () => messageModel
}

export interface IMessageModel extends mongoose.Model<IMessageDocument> {

}
