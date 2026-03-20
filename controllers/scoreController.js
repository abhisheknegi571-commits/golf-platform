import Score from "../models/Score.js";

//add score
export const addScore = async (req, res) => {
  try {
    const scoreValue = Number(req.body.score);

    if (scoreValue < 1 || scoreValue > 45) {
      return res.render("error", {
        message: "Score must be between 1 and 45",
      });
    }

    const count = await Score.countDocuments({
      userId: req.session.userId,
    });

    if (count >= 5) {
      const oldest = await Score.findOne({
        userId: req.session.userId,
      }).sort({ date: 1 });

      if (oldest) {
        await Score.findByIdAndDelete(oldest._id);
      }
    }

    const newScore = new Score({
      userId: req.session.userId,

      courseName: req.body.courseName,

      score: scoreValue,
    });

    await newScore.save();

    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
};

//get dashboard
export const getDashboard = async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.session.userId });

    let total = 0;

    scores.forEach((s) => {
      total += s.score;
    });

    const average = scores.length ? total / scores.length : 0;

    return res.render("dashboard", {
      scores,
      average,
      error: "You can only add 5 scores",
    });
  } catch (err) {
    console.log(err);
  }
};

//delete score
export const deleteScore = async (req, res) => {
  try {
    await Score.findOneAndDelete({
      _id: req.params.id,
      userId: req.session.userId,
    });

    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
};
