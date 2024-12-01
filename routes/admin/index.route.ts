import { Express } from "express"
import { dashboardRoute } from "./dashboard.route"
import { systemConfig } from "../../config/system";
import { topicRoute } from "./topic.route";
import { songRoutes } from "./song.route";
import { uploadRoutes } from "./upload.route";



export const RoutesAdmin = (app: Express) => {
  const path = systemConfig.prefixAdmin;
  app.use(`/${path}/dashboard`, dashboardRoute);
  app.use(`/${path}/topics`, topicRoute);
  app.use(`/${path}/songs`, songRoutes);
}