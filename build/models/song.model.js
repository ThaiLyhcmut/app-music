"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const songSchema = new mongoose_1.default.Schema({
    title: String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    avatar: String,
    description: String,
    singerId: String,
    topicId: String,
    listen: {
        type: Number,
        default: 0,
    },
    like: {
        type: Number,
        default: 0
    },
    lyrics: String,
    audio: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, {
    timestamps: true,
});
exports.Song = mongoose_1.default.model("Song", songSchema, "songs");
