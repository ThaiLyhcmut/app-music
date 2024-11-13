import { Topic } from "../../models/topic.model";
import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false
  })
  console.log(topics)
  res.render("client/page/topics/index");
}