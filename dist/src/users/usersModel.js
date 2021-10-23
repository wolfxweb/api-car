"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    resetPassword: {
        type: String,
        default: null,
    },
    state: {
        type: Boolean,
        default: true
    }
});
exports.User = mongoose.model('User', userSchema);
