import { Request, Response } from "express";
import { Topic } from "../../models/topic.model";
import { Song } from "../../models/song.model";
import { Singer } from "../../models/singer.model";
export const index = async (req: Request, res: Response) => {
  const slugTopic: string = req.params.slugTopic;
  const topic = await Topic.findOne({
    slug: slugTopic,
    deleted: false,
    status: "active"
  });
  const songs = await Song.find({
    topicId: topic.id,
    deleted: false,
    status: "active"
  }).select("id title avatar singerId like slug");
  for (const song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      deleted: false
    });
    song["singerFullName"] = infoSinger ? infoSinger.fullName : "";
  }
  res.render("client/page/songs/index", {
    pageTitle: topic.title,
    songs: songs
  });
}

export const detail = async (req: Request, res: Response) => {
  const slugSong = req.params.slugSong;
  const song = await Song.findOne({
    slug: slugSong,
    deleted: false,
    status: "active"
  });
  const singer = await Singer.findOne({
    _id: song.singerId
  }).select("fullName");
  const topic = await Topic.findOne({
    _id: song.topicId
  }).select("title");
  res.render("client/page/songs/detail", {
    pageTitle: "Chi tiết bài hát",
    song: song,
    singer: singer,
    topic: topic
  });
}

export const likePatch = async (req: Request, res: Response) => {
  const { id, status } = req.body

  const song = await Song.findOne({
    _id: id,
    deleted: false,
    status: "active"
  })

  if(song) {
    let updateLike = song.like;
    switch (status) {
      case "like":
        updateLike++;
        break;
      case "dislike":
        updateLike--;
        break;
      default:
        break;
    }
    console.log(updateLike)
    await Song.updateOne({
      _id: id,
      deleted: false,
      stauts: "active"
    }, {
      like: updateLike
    })
    res.json({
      code: "success",
      like: updateLike
    })
  }
}