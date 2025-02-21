import mongoose from "mongoose";
import { IMessageDocument, IMessageModel } from "../interfaces/message.interface";
import { messageModel } from "../types/message.type";

const schema = new mongoose.Schema<IMessageDocument, IMessageModel>({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    read_at: { type: Date },
    sender_delete: { type: Boolean },
    recipient_delete: { type: Boolean },
}, {
    timestamps: { createdAt: 'created_at' }
})

schema.methods.toMessage = function (): messageModel {
    return {
        id: this._id.toString(),
        sender: this.sender.toString(),
        recipient: this.recipient.toString(),
        content: this.content,
        created_at: this.created_at,
        sender_delete: this.sender_deleted, // ไม่ได้ใช้ ed ลองดูดีดี
        recipient_delete: this.recipient_deleted,
    }
}

schema.index({ sender: 1, recipient: 1, created_at: 1 })
schema.index({ recipient: 1, sender: 1, created_at: 1 })


export const Message = mongoose.model<IMessageDocument, IMessageModel>("Message", schema)