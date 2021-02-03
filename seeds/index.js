const mongoose = require("mongoose");
const Campground = require("../schema/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("==== DB CONNECTED ===="))
  .catch((err) => console.error(err));

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  // delete every present campground
  await Campground.deleteMany({});

  for (let i = 0; i < 50; i++) {
    const random = Math.floor(Math.random() * 1000);
    const campground = new Campground({
      name: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random].city}, ${cities[random].state}`,
    });
    campground.save();
  }
};

seedDB().then(() => mongoose.connection.close());
