import { Schema, Types } from 'mongoose';

export var gameSchema: Schema = new Schema({
    token: { type: String, unique: true, required: true },
    createdAt: Date    
});

gameSchema.pre("save", (next) => {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
    next();
});
