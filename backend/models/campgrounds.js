// const chalk = require("chalk");
const Campground = require("../schema/campground");

const getAllCampgrounds = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const campgrounds = await Campground.find({}).exec();
      resolve(campgrounds);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const fetchCampgroundById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const campground = await Campground.findById(id)
        .populate("reviews")
        .exec();
      resolve(campground);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const editCampground = (id, campground) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newCampground = await Campground.findByIdAndUpdate(id, campground, {
        new: true,
      }).exec();
      resolve(newCampground);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const deleteCampground = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Campground.findByIdAndDelete(id).exec();
      resolve();
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

module.exports = {
  getAllCampgrounds,
  fetchCampgroundById,
  editCampground,
  deleteCampground,
};
