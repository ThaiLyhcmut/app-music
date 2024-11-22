import { Express } from "express"
import { topicRoute } from "./topic.route"
import { songRoute } from "./song.route";


export const RoutesClient = (app: Express) => {
  app.use("/topics", topicRoute);
  app.use("/songs", songRoute);
}