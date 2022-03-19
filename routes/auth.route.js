import { Router } from "express";
import { check } from "express-validator";

import { fieldsValidator } from "../middlewares/fields-validator";
import { login, googleSignIn } from "../controllers/auth.controller";

const router = Router();

router.post(
  "/login",
  [
    check("email", "The email is required and valid.").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    fieldsValidator,
  ],
  login
);

router.post(
  "/google",
  [
    check(
      "id_token",
      "To be able to log in with google you need the id token"
    ).notEmpty(),
    fieldsValidator,
  ],
  googleSignIn
);

export default router;
