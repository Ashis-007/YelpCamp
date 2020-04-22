const mongoose = require("mongoose");
const Campground = require("./models/campground"),
  Comment = require("./models/comment");

const data = [
  {
    name: "Salmon Creek",
    imageURL:
      "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    __v: 0,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident autem non ea blanditiis enim, necessitatibus alias iste reprehenderit delectus porro, impedit fugit ipsam accusamus quisquam fugiat voluptate aperiam cumque ad praesentium sit dolore sed! Veniam quae delectus quisquam voluptatibus nihil! Natus quos ab ad quisquam nulla consequatur sed eum repudiandae molestiae tempora saepe, deserunt perferendis temporibus et provident aut architecto magni porro excepturi, deleniti voluptate rerum? Dolor aspernatur dolores quae perferendis consequatur nemo at dolorum provident, odit beatae natus, eum officia. Quis vero distinctio dignissimos delectus amet impedit, laudantium laborum dicta quidem eligendi, odit, tenetur earum quia dolores a perferendis.",
  },
  {
    name: "Granite Hill",
    imageURL:
      "https://images.unsplash.com/photo-1501703979959-797917eb21c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    __v: 0,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident autem non ea blanditiis enim, necessitatibus alias iste reprehenderit delectus porro, impedit fugit ipsam accusamus quisquam fugiat voluptate aperiam cumque ad praesentium sit dolore sed! Veniam quae delectus quisquam voluptatibus nihil! Natus quos ab ad quisquam nulla consequatur sed eum repudiandae molestiae tempora saepe, deserunt perferendis temporibus et provident aut architecto magni porro excepturi, deleniti voluptate rerum? Dolor aspernatur dolores quae perferendis consequatur nemo at dolorum provident, odit beatae natus, eum officia. Quis vero distinctio dignissimos delectus amet impedit, laudantium laborum dicta quidem eligendi, odit, tenetur earum quia dolores a perferendis.",
  },
  {
    name: "Mountain Goat's Rest",
    imageURL:
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    __v: 0,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident autem non ea blanditiis enim, necessitatibus alias iste reprehenderit delectus porro, impedit fugit ipsam accusamus quisquam fugiat voluptate aperiam cumque ad praesentium sit dolore sed! Veniam quae delectus quisquam voluptatibus nihil! Natus quos ab ad quisquam nulla consequatur sed eum repudiandae molestiae tempora saepe, deserunt perferendis temporibus et provident aut architecto magni porro excepturi, deleniti voluptate rerum? Dolor aspernatur dolores quae perferendis consequatur nemo at dolorum provident, odit beatae natus, eum officia. Quis vero distinctio dignissimos delectus amet impedit, laudantium laborum dicta quidem eligendi, odit, tenetur earum quia dolores a perferendis.",
  },
  {
    name: "Willam's Valley",
    imageURL:
      "https://images.unsplash.com/photo-1552522060-ab53cefef28e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    __v: 0,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident autem non ea blanditiis enim, necessitatibus alias iste reprehenderit delectus porro, impedit fugit ipsam accusamus quisquam fugiat voluptate aperiam cumque ad praesentium sit dolore sed! Veniam quae delectus quisquam voluptatibus nihil! Natus quos ab ad quisquam nulla consequatur sed eum repudiandae molestiae tempora saepe, deserunt perferendis temporibus et provident aut architecto magni porro excepturi, deleniti voluptate rerum? Dolor aspernatur dolores quae perferendis consequatur nemo at dolorum provident, odit beatae natus, eum officia. Quis vero distinctio dignissimos delectus amet impedit, laudantium laborum dicta quidem eligendi, odit, tenetur earum quia dolores a perferendis.",
  },
  {
    name: "Monsoon's Rest",
    imageURL:
      "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    __v: 0,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident autem non ea blanditiis enim, necessitatibus alias iste reprehenderit delectus porro, impedit fugit ipsam accusamus quisquam fugiat voluptate aperiam cumque ad praesentium sit dolore sed! Veniam quae delectus quisquam voluptatibus nihil! Natus quos ab ad quisquam nulla consequatur sed eum repudiandae molestiae tempora saepe, deserunt perferendis temporibus et provident aut architecto magni porro excepturi, deleniti voluptate rerum? Dolor aspernatur dolores quae perferendis consequatur nemo at dolorum provident, odit beatae natus, eum officia. Quis vero distinctio dignissimos delectus amet impedit, laudantium laborum dicta quidem eligendi, odit, tenetur earum quia dolores a perferendis.",
  },
  {
    name: "Peace Valley",
    imageURL:
      "https://images.unsplash.com/photo-1504701365486-b44b67f99439?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    __v: 0,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident autem non ea blanditiis enim, necessitatibus alias iste reprehenderit delectus porro, impedit fugit ipsam accusamus quisquam fugiat voluptate aperiam cumque ad praesentium sit dolore sed! Veniam quae delectus quisquam voluptatibus nihil! Natus quos ab ad quisquam nulla consequatur sed eum repudiandae molestiae tempora saepe, deserunt perferendis temporibus et provident aut architecto magni porro excepturi, deleniti voluptate rerum? Dolor aspernatur dolores quae perferendis consequatur nemo at dolorum provident, odit beatae natus, eum officia. Quis vero distinctio dignissimos delectus amet impedit, laudantium laborum dicta quidem eligendi, odit, tenetur earum quia dolores a perferendis.",
  },
  {
    name: "Fisherground Campsite",
    imageURL:
      "https://images.unsplash.com/photo-1502993194517-7734018a0d8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    __v: 0,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident autem non ea blanditiis enim, necessitatibus alias iste reprehenderit delectus porro, impedit fugit ipsam accusamus quisquam fugiat voluptate aperiam cumque ad praesentium sit dolore sed! Veniam quae delectus quisquam voluptatibus nihil! Natus quos ab ad quisquam nulla consequatur sed eum repudiandae molestiae tempora saepe, deserunt perferendis temporibus et provident aut architecto magni porro excepturi, deleniti voluptate rerum? Dolor aspernatur dolores quae perferendis consequatur nemo at dolorum provident, odit beatae natus, eum officia. Quis vero distinctio dignissimos delectus amet impedit, laudantium laborum dicta quidem eligendi, odit, tenetur earum quia dolores a perferendis.",
  },
  {
    name: "LE VAL DE CANTOBRE",
    imageURL:
      "https://images.unsplash.com/photo-1483381719261-6620dfa2d28a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    __v: 0,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident autem non ea blanditiis enim, necessitatibus alias iste reprehenderit delectus porro, impedit fugit ipsam accusamus quisquam fugiat voluptate aperiam cumque ad praesentium sit dolore sed! Veniam quae delectus quisquam voluptatibus nihil! Natus quos ab ad quisquam nulla consequatur sed eum repudiandae molestiae tempora saepe, deserunt perferendis temporibus et provident aut architecto magni porro excepturi, deleniti voluptate rerum? Dolor aspernatur dolores quae perferendis consequatur nemo at dolorum provident, odit beatae natus, eum officia. Quis vero distinctio dignissimos delectus amet impedit, laudantium laborum dicta quidem eligendi, odit, tenetur earum quia dolores a perferendis.",
  },
  {
    name: "BRIGHOUSE BAY",
    imageURL:
      "https://images.unsplash.com/photo-1534379645235-aa659c6d3ab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    __v: 0,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident autem non ea blanditiis enim, necessitatibus alias iste reprehenderit delectus porro, impedit fugit ipsam accusamus quisquam fugiat voluptate aperiam cumque ad praesentium sit dolore sed! Veniam quae delectus quisquam voluptatibus nihil! Natus quos ab ad quisquam nulla consequatur sed eum repudiandae molestiae tempora saepe, deserunt perferendis temporibus et provident aut architecto magni porro excepturi, deleniti voluptate rerum? Dolor aspernatur dolores quae perferendis consequatur nemo at dolorum provident, odit beatae natus, eum officia. Quis vero distinctio dignissimos delectus amet impedit, laudantium laborum dicta quidem eligendi, odit, tenetur earum quia dolores a perferendis.",
  },
];

module.exports = function seedDB() {
  let comment = {
    text: "Are u serious? This place looks AMAZING!",
    author: "Trevor Noah",
  };

  // Removing all data
  Campground.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    }

    console.log("Removed Campgrounds");
    Comment.remove({}, (err) => console.log("Removed comments"));

    // Adding data
    data.forEach((campground) => {
      Campground.create(campground).then((campground) => {
        Comment.create(comment).then((comment) => {
          campground.comments.push(comment);
          campground.save();
          console.log("Comment added!");
        });
      });
    });
  });

  // Adding data back
};
