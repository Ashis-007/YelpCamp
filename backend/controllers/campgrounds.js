const chalk = require("chalk");
const campgroundModels = require("../models/campgrounds");

const getAllCampgrounds = async (req, res) => {
  try {
    console.log(chalk.yellow("Fetching all campgrounds..."));
    const campgrounds = await campgroundModels.getAllCampgrounds();
    console.log(chalk.green("Successfully fetched all campgrounds"));
    res.json({
      data: campgrounds,
    });
  } catch (e) {
    console.log(e);
  }
};

const createNewCampground = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.json({
      error: e,
    });
  }
};

const fetchCampground = async (req, res) => {
  try {
    console.log(chalk.yellow("Fetching campground..."));
    const { id } = req.params;
    const campground = await campgroundModels.fetchCampgroundById(id);
    console.log(chalk.green("Successfully fetched campground"));
    res.json({
      data: campground,
    });
  } catch (e) {
    console.log(e);
    res.json({
      error: e,
    });
  }
};

const editCampground = async (req, res) => {
  try {
    const { id, campground } = req.body;
  } catch (e) {
    console.log(e);
    res.json({
      error: e,
    });
  }
};

const deleteCampground = async (req, res) => {
  try {
    console.log(chalk.yellow("Deleting campground..."));
    const { id } = req.params;
    await campgroundModels.deleteCampground(id);
    console.log(chalk.green("Successfully deleted campground"));
    res.json({
      msg: "Successfully deleted campground",
    });
  } catch (e) {
    console.log(e);
    res.json({
      error: e,
    });
  }
};

module.exports = {
  getAllCampgrounds,
  createNewCampground,
  fetchCampground,
  editCampground,
  deleteCampground,
};
