import { Express } from "express"
import { topicRoute } from "./topic.route"


export const RoutesClient = (app: Express) => {
  app.use("/topics", topicRoute);
}