import collectionModel from "../models/collections.model.js";
import collectionSavesModel from "../models/collectionSaves.model.js";

export async function createCollection(req, res) {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    const isCollectionExists = await collectionModel.findOne({ name, userId });
    if (isCollectionExists) {
      return res.status(400).json({
        success: false,
        message: "You already have a collection with this name",
      });
    }

    const collection = await collectionModel.create({
      name,
      description,
      userId,
    });

    return res.status(201).json({
      success: true,
      message: "Collection created successfully",
      collection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create collection",
      error: error.message,
    });
  }
}

export async function getCollections(req, res) {
  try {
    const userId = req.user.id;

    const collections = await collectionModel
      .find({ userId })
      .sort({ createdAt: -1 });

    const collectionsWithCount = await Promise.all(
      collections.map(async (collection) => {
        const saveCount = await collectionSavesModel.countDocuments({
          collectionId: collection._id,
        });
        return {
          ...collection.toObject(),
          saveCount,
        };
      }),
    );

    res.status(200).json({
      success: true,
      message:
        collections.length === 0
          ? "No collections yet"
          : `${collections.length} collections found`,
      collections: collectionsWithCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch collections",
      error: error.message,
    });
  }
}

export async function updateCollection(req, res) {
  try {
    const userId = req.user.id;
    const { collectionId } = req.params;
    const { name, description } = req.body;

    const collection = await collectionModel.findOne({
      _id: collectionId,
      userId,
    });
    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    if (name) {
      const isCollectionExists = await collectionModel.findOne({
        name,
        userId,
        _id: { $ne: collectionId },
      });
      if (isCollectionExists) {
        return res.status(400).json({
          success: false,
          message: "You already have a collection with this name",
        });
      }
      collection.name = name;
    }

    if (description !== undefined) {
      collection.description = description;
    }

    await collection.save();

    res.status(200).json({
      success: true,
      message: "Collection updated successfully",
      collection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update collection",
      error: error.message,
    });
  }
}

export async function deleteCollection(req, res) {
  try {
    const userId = req.user.id;
    const { collectionId } = req.params;

    const collection = await collectionModel.findOne({
      _id: collectionId,
      userId,
    });
    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    await collectionSavesModel.deleteMany({ collectionId });
    await collectionModel.deleteOne({ _id: collectionId });

    res.status(200).json({
      success: true,
      message: "Collection deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete collection",
      error: error.message,
    });
  }
}

export async function addSaveToCollection(req, res) {
  try {
    const { collectionId } = req.params;
    const { saveId } = req.body;
    const userId = req.user.id;

    const isAlreadyAdded = await collectionSavesModel.findOne({
      collectionId,
      saveId,
      userId,
    });
    if (isAlreadyAdded) {
      return res.status(400).json({
        success: false,
        message: "This save is already in the collection",
      });
    }

    const collectionSave = await collectionSavesModel.create({
      collectionId,
      userId,
      saveId,
    });

    return res.status(201).json({
      success: true,
      message: "Save added to collection successfully",
      collectionSave,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This save is already in the collection",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to add save to collection",
      error: error.message,
    });
  }
}

export async function removeSaveFromCollection(req, res) {
  try {
    const { collectionId, saveId } = req.params;
    const userId = req.user.id;

    const deleted = await collectionSavesModel.findOneAndDelete({
      collectionId,
      saveId,
      userId,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Save not found in this collection",
      });
    }

    res.status(200).json({
      success: true,
      message: "Save removed from collection",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove save from collection",
      error: error.message,
    });
  }
}

export async function getSavesInCollection(req, res) {
  try {
    const { collectionId } = req.params;
    const userId = req.user.id;

    const collection = await collectionModel.findOne({
      _id: collectionId,
      userId,
    });
    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    const entries = await collectionSavesModel
      .find({ collectionId, userId })
      .populate("saveId")
      .sort({ createdAt: -1 });

    const saves = entries.map((e) => e.saveId);

    res.status(200).json({
      success: true,
      message:
        saves.length === 0
          ? "No saves in this collection"
          : `${saves.length} saves found`,
      saves,
      collection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch saves in collection",
      error: error.message,
    });
  }
}
