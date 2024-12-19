import express from 'express'
import { getMessage, sendMessage } from '../controllers/message.controller.js'
import protectRoute from '../middleware/protectRoute.js'
import upload from '../middleware/multer.js'


const router = express.Router()

router.post("/send/:id",protectRoute, upload.single("image"),sendMessage)
router.get("/:id",protectRoute,getMessage)

export default router