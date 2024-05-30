const express = require("express");
const Course = require("../models/courseSchema");
const router = express.Router();

router.post("/add-subject", async (req, res) => {
  const { section, subjectID } = req.body;

  if (!section || !subjectID) {
    return res
      .status(400)
      .json({ error: "Section and SubjectID are required." });
  }

  try {
    const course = await Course.findOne();

    if (!course) {
      return res.status(404).json({ error: "No course found." });
    }

    if (
      !["allsubjects", "skilldevelopment", "customcourses"].includes(section)
    ) {
      return res.status(400).json({ error: "Invalid section." });
    }

    const subject = { subjectID };
    course[section].push(subject);
    await course.save();

    res.status(201).json({ message: "Subject added successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/add-price", async (req, res) => {
  const { section, subjectID, durationValue, durationUnit, price } = req.body;

  if (!section || !subjectID || !durationValue || !durationUnit || !price) {
    return res.status(400).json({ error: "Missing fields." });
  }

  try {
    const course = await Course.findOne();
    if (!course) {
      return res.status(404).json({ error: "No course found." });
    }

    if (
      !["allsubjects", "skilldevelopment", "customcourses"].includes(section)
    ) {
      return res.status(400).json({ error: "Invalid section." });
    }

    const subjectIndex = course[section].findIndex(
      (subject) => subject.subjectID === subjectID
    );
    if (subjectIndex === -1) {
      return res
        .status(404)
        .json({ error: "Subject not found in the specified section." });
    }

    const newPrice = {
      duration: { value: durationValue, unit: durationUnit },
      price,
    };
    course[section][subjectIndex].prices.push(newPrice);
    await course.save();

    res.status(201).json({ message: "Price added successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("delete-subject", async (req, res) => {
  try {
  } catch (error) {}
});

router.post("delete-price", async (req, res) => {
  try {
  } catch (error) {}
});

module.exports = router;
