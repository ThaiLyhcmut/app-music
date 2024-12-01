"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesClient = void 0;
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const RoutesClient = (app) => {
    app.use("/topics", topic_route_1.topicRoute);
    app.use("/songs", song_route_1.songRoute);
};
exports.RoutesClient = RoutesClient;
