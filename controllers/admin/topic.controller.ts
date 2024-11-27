import { Topic } from "../../models/topic.model";
import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
  
  res.render("client/page/topics/index", {
    pageTitle: "Chủ đề bài hát",
  });
}