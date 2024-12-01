import { Request, Response } from "express";
import { Song } from "../../models/song.model";
import { Topic } from "../../models/topic.model";
import { Singer } from "../../models/singer.model";
import { systemConfig } from "../../config/system";
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false
  });
  res.render("admin/page/songs/index", {
    pageTitle: "Quản lý bài hát",
    songs: songs
  });
};

export const create = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false
  }).select("title");
  const singers = await Singer.find({
    deleted: false
  }).select("fullName");
  res.render("admin/page/songs/create", {
    pageTitle: "Thêm mới bài hát",
    topics: topics,
    singers: singers
  });
};

export const createPost = async (req: Request, res: Response) => {
  req.body.avatar = req.body.avatar[0];
  req.body.audio = req.body.audio[0];
  const song = new Song(req.body);
  await song.save();
  res.redirect(`/${systemConfig.prefixAdmin}/songs`);
}

export const edit = async (req: Request, res: Response) => {
  const id = req.params.id;
  const song = await Song.findOne({
    _id: id,
    deleted: false
  });
  const topics = await Topic.find({
    deleted: false
  }).select("title");
  const singers = await Singer.find({
    deleted: false
  }).select("fullName");
  res.render("admin/pages/songs/edit", {
    pageTitle: "Chỉnh sửa bài hát",
    song: song,
    topics: topics,
    singers: singers
  });
};
export const editPatch = async (req: Request, res: Response) => {
  const id = req.params.id;
  if(req.body.avatar) {
    req.body.avatar = req.body.avatar[0];
  }
  if(req.body.audio) {
    req.body.audio = req.body.audio[0];
  }
  await Song.updateOne({
    _id: id,
    deleted: false
  }, req.body);
  res.redirect(`back`);
}