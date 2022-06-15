import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: { type: "String", required: true },
    content: { type: "String", required: true },
    image: { type: "String", required: true },
    category: { type: "String", default: "others" },
    created_at: {
        type: String,
        default: new Date().toLocaleDateString("en-IN")
    },
    creater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },
});

export const NoteModel = mongoose.model("Note", NoteSchema);


