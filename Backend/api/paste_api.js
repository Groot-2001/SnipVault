const express = require("express");
const {
  pasteCreate,
  pasteDelete,
  getMyPastes,
} = require("../controller/paste_controller");
const userAuthenticate = require("../middleware/user_authentication");
const pasteRoute = express.Router();

const {
  validatePaste,
  validatePasteDelete,
} = require("../middleware/input_sanitization");

pasteRoute.post("/create_paste", userAuthenticate, validatePaste, pasteCreate);
pasteRoute.get("/my_pastes", userAuthenticate, getMyPastes);
pasteRoute.delete(
  "/delete_paste/:_id",
  userAuthenticate,
  validatePasteDelete,
  pasteDelete
);

module.exports = pasteRoute;
