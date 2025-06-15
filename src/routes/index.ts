import Router from "express"
import userRouter from "./userRoutes"
import badgeRouter from "./badgeRoutes"

const router = Router()

router.use("/user", userRouter)
router.use("/badge", badgeRouter)

export default router