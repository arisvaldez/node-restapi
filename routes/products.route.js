import { Router } from "express";
import { check } from "express-validator";

import {
  jwtValidator,
  fieldsValidator,
  isExistProductById,
  isExistCategoryById,
  isAdminRole,
} from "../middlewares";

import {
  create,
  retrieve,
  retrieveById,
  update,
  softDelete,
} from "../controllers/products.controller";

const router = Router();

router.get("/", retrieve);

router.get(
  "/:id",
  [

    check('id', 'This is a invalid ID').isMongoId(),
    check('id').custom(isExistProductById),
    fieldsValidator,
  ],
  retrieveById
);

router.post(
  "/",
  [
    jwtValidator,
    check('name', 'the name is required').notEmpty(),
    check('category', 'The category is required').notEmpty(),
    check('category', 'This is a invalid ID').isMongoId(),
    check('category').custom(isExistCategoryById),
    fieldsValidator,
  ],
  create
);

router.put(
  "/:id",
  [
    jwtValidator,
    check('id', 'This is a invalid ID').isMongoId(),
    check('id').custom(isExistProductById),
    check('name', 'The name is required').notEmpty(),
    check('category', 'The category is required').notEmpty(),
    check('category', 'This is a invalid ID').isMongoId(),
    check('category').custom(isExistCategoryById),
    fieldsValidator,
  ],
  update
);

router.delete(
  "/:id",
  [
    jwtValidator,
    isAdminRole,
    check('id', 'This is a invalid ID').isMongoId(),
    check('id').custom(isExistProductById),
    fieldsValidator,
  ],
  softDelete
);

export default router;
