import fieldsValidator from "./fields-validator";
import googleVerify from "./google-verify";
import { jwtValidator } from "./jwt-validator";
import { isAdminRole, hasRole } from "./role-validator";
import {
  isValidRole,
  isUniqueEmail,
  isExistUserById,
  isExistCategoryById,
} from "./db-validators";

export default {
  fieldsValidator,
  googleVerify,
  jwtValidator,
  isAdminRole,
  hasRole,
  isValidRole,
  isUniqueEmail,
  isExistUserById,
  isExistCategoryById,
};
