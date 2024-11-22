import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/song.controller";

router.get("/favorite", controller.favorite)
router.get("/detail/:slugSong", controller.detail);
router.get("/search/result", controller.search)
router.patch("/like", controller.likePatch)
router.patch("/favorite", controller.favoritePatch)
router.get("/:slugTopic", controller.index)

export const songRoute = router;