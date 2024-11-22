import { Hono } from "hono";
import { register, login } from "../controllers/authentication.ts";
import { getAllUsers, getUserInfo } from "../controllers/users.ts";
import { isAuthenticated } from "../middleware/index.ts";

const router = new Hono();

router.post("/auth/register", register);
router.post("/auth/login", login);

router.get("/users", isAuthenticated, getAllUsers);
router.get("/:username", getUserInfo);

export default router;
