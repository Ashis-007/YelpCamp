const express = require("express"),
  router = express.Router(),
  path = require("path"),
  passport = require("passport");

const User = require("../schema/user");

// INDEX Route
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../index.html"));
});

// REGISTER Routes
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err || !user) {
        console.log(err);
        req.flash("error", err.message);
        return res.render("register");
      }

      passport.authenticate("local")(req, res, () => {
        req.flash("success", `Welcome to YelpCamp ${user.username}`);
        res.redirect("/campgrounds");
      });
    }
  );
});

// LOGIN Routes
router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

// LOGOUT Routes
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Successfully logged out!");
  res.redirect("/campgrounds");
});

module.exports = router;
