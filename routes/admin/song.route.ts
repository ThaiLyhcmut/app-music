import { Router } from "express";
import multer from "multer";
import { uploadFields, uploadSingle } from "../../middlewares/admin/uploadCloud.middleware";
const router: Router = Router();
const upload = multer();
import * as controller from "../../controllers/admin/song.controller";
router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
  ]),
  uploadFields,
  controller.createPost
);

router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
  ]),
  uploadFields,
  controller.editPatch
);
export const songRoutes: Router = router;