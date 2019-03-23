import { Schema, Types } from 'mongoose';

export var scoreSchema: Schema = new Schema({
    steps: { type: Number, required: true },
    seconds: { type: Number, required: true },
    name: { type: String, required: true },
    createdAt: Date    
});

scoreSchema.pre("save", (next) => {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
    next();
});
