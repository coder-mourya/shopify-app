import Router from "express"
import userRouter from "routes/userRoutes"
import badgeRouter from "routes/badgeRoutes"
import bannerRouter from "routes/bannerRoutes"
import cartRouter from "routes/cartRoutes"
import timerRouter from "routes/timerRoutes"

const router = Router()

router.use("/user", userRouter)
router.use("/badge", badgeRouter)
router.use("/banner", bannerRouter)
router.use("/cart", cartRouter)
router.use("/timer", timerRouter)

export default router