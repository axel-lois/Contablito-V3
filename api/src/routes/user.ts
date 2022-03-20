import { Router } from "express";
import { signIn, signUp, profile, logOut } from "../controllers/user";
import auth from "../middleware/auth";

const userRouter: Router = Router();

userRouter.post("/signup", signUp);

userRouter.post("/signin", signIn);

userRouter.get("/profile", auth, profile);

userRouter.delete('/logout',auth, logOut);

export default userRouter;
