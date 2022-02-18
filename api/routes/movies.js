const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("./verifyToken");

// CREATE NEW MOVIE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);

    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not an admin!");
  }
});

// UPDATE MOVIE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not an admin!");
  }
});

// DELETE MOVIE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const deletedMovie = await Movie.findById(req.params.id);
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json(`${deletedMovie.title} has been deleted!`);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not an admin!");
  }
});

// GET RANDOM MOVIE
router.get("/random", async (req, res) => {
  const type = req.query.type;
  let movie;

  try {
    if (type && type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MOVIE BY ID
router.get("/:id", async (req, res) => {
  try {
    const getMovie = await Movie.findById(req.params.id);
    res.status(200).json(getMovie);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
