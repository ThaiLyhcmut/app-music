"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const song_model_1 = require("../../models/song.model");
const topic_model_1 = require("../../models/topic.model");
const singer_model_1 = require("../../models/singer.model");
const system_1 = require("../../config/system");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield song_model_1.Song.find({
        deleted: false
    });
    res.render("admin/page/songs/index", {
        pageTitle: "Quản lý bài hát",
        songs: songs
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.Topic.find({
        deleted: false
    }).select("title");
    const singers = yield singer_model_1.Singer.find({
        deleted: false
    }).select("fullName");
    res.render("admin/page/songs/create", {
        pageTitle: "Thêm mới bài hát",
        topics: topics,
        singers: singers
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.avatar = req.body.avatar[0];
    req.body.audio = req.body.audio[0];
    const song = new song_model_1.Song(req.body);
    yield song.save();
    res.redirect(`/${system_1.systemConfig.prefixAdmin}/songs`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const song = yield song_model_1.Song.findOne({
        _id: id,
        deleted: false
    });
    const topics = yield topic_model_1.Topic.find({
        deleted: false
    }).select("title");
    const singers = yield singer_model_1.Singer.find({
        deleted: false
    }).select("fullName");
    res.render("admin/pages/songs/edit", {
        pageTitle: "Chỉnh sửa bài hát",
        song: song,
        topics: topics,
        singers: singers
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (req.body.avatar) {
        req.body.avatar = req.body.avatar[0];
    }
    if (req.body.audio) {
        req.body.audio = req.body.audio[0];
    }
    yield song_model_1.Song.updateOne({
        _id: id,
        deleted: false
    }, req.body);
    res.redirect(`back`);
});
exports.editPatch = editPatch;