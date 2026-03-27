const PasteModel = require("../model/paste_model");

const pasteCreate = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(401).json({
      message: "please fill the required field",
    });
  }

  try {
    const paste = await PasteModel.create({
      username: req.user.username,
      text,
    });

    return res.status(201).json({
      message: "Paste saved successfully in database!",
      paste,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const getMyPastes = async (req, res) => {
  try {
    const pastes = await PasteModel.find({ username: req.user.username }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Pastes fetched successfully",
      pastes,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const pasteDelete = async (req, res) => {
  const id = req.params._id.toString();

  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const existingDoc = await PasteModel.findById(id);
      if (!existingDoc) {
        return res.status(404).json({
          error: "Id doesn't exist",
        });
      }

      if (existingDoc.username !== req.user.username) {
        return res.status(403).json({ message: "Not authorized to delete this paste" });
      }

      await PasteModel.findByIdAndDelete(id);

      return res.status(200).json({
        message: "Document Deleted Successfully.",
      });
    }

    return res.status(404).json({
      message: "invalid id ,please enter correct id!!",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = { pasteCreate, pasteDelete, getMyPastes };
