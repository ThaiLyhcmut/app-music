"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesAdmin = void 0;
const dashboard_route_1 = require("./dashboard.route");
const system_1 = require("../../config/system");
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const RoutesAdmin = (app) => {
    const path = system_1.systemConfig.prefixAdmin;
    app.use(`/${path}/dashboard`, dashboard_route_1.dashboardRoute);
    app.use(`/${path}/topics`, topic_route_1.topicRoute);
    app.use(`/${path}/songs`, song_route_1.songRoutes);
};
exports.RoutesAdmin = RoutesAdmin;
