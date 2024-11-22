import { Request, Response } from "express";
import unidecode  from "unidecode"
import { Topic } from "../../models/topic.model";
import { Song } from "../../models/song.model";
import { Singer } from "../../models/singer.model";
import { Favorite } from "../../models/favorite.model";
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
  const favorite = await Favorite.findOne({
    songId: song.id
    // userId: res.locals.user.id
  })
  if (favorite){
    song["favorite"] = true
  }
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
    await Song.updateOne({
      _id: id,
      deleted: false,
      status: "active"
    }, {
      like: updateLike
    })
    res.json({
      code: "success",
      like: updateLike
    })
  }else {
    res.json({
      "code": "error"
    })
  }
}

export const favoritePatch = async (req: Request, res: Response) => {
  const { id } = req.body;
  const song = await Song.findOne({
    _id: id,
    deleted: false,
    status: "active"
  })
  if(song){
    const exitsFavorite = await Favorite.findOne({
      songId: id,
      // userId: res.locals.user.id
    })
    if(exitsFavorite){
      await Favorite.deleteOne({
        songId: id,
        // userId: res.locals.user.id
      })
    }else {
      const record = new Favorite({
        songId: id,
        // userId: res.locals.user.id
      })
      await record.save()
    }
    res.json({
      "code": "success"
    })
  }else{
    res.json({
      "code": "error"
    })
  }
}

export const favorite = async (req: Request, res: Response) => {
  const favorites = await Favorite.find()
  for (const favorite of favorites) {
    const infoSong = await Song.findOne({
      _id: favorite.songId
    })
    const infoSinger = await Singer.findOne({
      _id: infoSong.singerId
    })
    favorite["title"] = infoSong.title
    favorite["avatar"] = infoSong.avatar
    favorite["singerFullName"] = infoSinger.fullName
    favorite["slug"] = infoSong.slug
  }
  res.render("client/page/songs/favorite", {
    pageTitle: "Bai hat yeu thich",
    songs: favorites
  })
}

export const search = async (req: Request, res: Response) => {
  const keyword = `${req.query.keyword}`;

  let keywordRegex = keyword.trim();
  keywordRegex = unidecode(keywordRegex.replace(/\s+/g, "-"))
  const slugRegex = new RegExp(keywordRegex, "i")
  const songs = await Song.find({
    slug: slugRegex
  }).select("slug avatar title like singerId")
  for (const song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      deleted: false
    });
    song["singerFullName"] = infoSinger ? infoSinger.fullName : "";
  }

  res.render("client/page/songs/search", {
    pageTitle: `Trang ket qua tim kiem: ${keyword}`,
    keyword: keyword,
    songs: songs
  })
}