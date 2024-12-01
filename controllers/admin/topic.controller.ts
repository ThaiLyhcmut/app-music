import { Topic } from "../../models/topic.model";
import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false
  });
  res.render("admin/page/topics/index", {
    pageTitle: "Chủ đề bài hát",
    topics: topics
  });
}