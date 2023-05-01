const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const Task = require("../models/Task.model");
const { isLoggedIn, isLoggedOut } = require("../middleware/protect-routes");

router.get("/", async (req, res, next) => {
  try {
    console.log(req.session);
    const taskList = await Task.find({ creator: req.session.currentUser });
    let logged = true;
    res.render("task/taskList", { taskList, logged });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const unfilteredList = await Task.find({
      creator: req.session.currentUser,
    });
    console.log(unfilteredList);
    let taskList = [];
    unfilteredList.forEach((task) => {
      if (task.name.includes(req.body.search)) {
        taskList.push(task);
      }
    });
    let logged = true;
    res.render("task/taskList", { taskList, logged });
  } catch (error) {
    console.log(error);
  }
});

router.get("/create", isLoggedIn, (req, res, next) => {
  let logged = true;
  const currentUserId = req.session.currentUser._id;
  res.render("task/createTask", { logged, currentUserId });
});

router.post("/create", async (req, res) => {
  try {
    if (req.body.name) {
      if (req.body.description) {
        await Task.create(req.body);
        res.redirect("/task");
      } else {
        const currentUserId = req.session.currentUser._id;
        res.render("task/createTask", {
          errorMessage: "Task description is required",
          currentUserId,
        });
      }
    } else {
      const currentUserId = req.session.currentUser._id;
      res.render("task/createTask", {
        errorMessage: "Task name is required",
        currentUserId,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/delete/:taskId", isLoggedIn, async (req, res, next) => {
  try {
    const { taskId } = req.params;
    await Task.findByIdAndRemove(taskId);
    let logged = true;
    res.render("task/deleteTask", { logged });
  } catch (error) {
    res.redirect("/task/taskList");
    console.log(error);
  }
});

router.get("/update/:taskId", isLoggedIn, async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const currentTask = await Task.findById(taskId);
    const currentUserId = req.session.currentUser._id;
    let logged = true;
    res.render("task/updateTask", { currentTask, logged, currentUserId });
  } catch (error) {
    res.redirect("/task/taskList");
    console.log(error);
  }
});

router.post("/update/:taskId", async (req, res) => {
  try {
    if (req.body.name) {
      if (req.body.description) {
        const { taskId } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
          new: true,
        });
        let logged = true;
        res.redirect(`/task/details/${updatedTask._id}`);
      } else {
        const { taskId } = req.params;
        const currentTask = await Task.findById(taskId);
        const currentUserId = req.session.currentUser._id;
        let logged = true;
        res.render("task/updateTask", {
          currentTask,
          logged,
          currentUserId,
          errorMessage: "Task description is required",
        });
      }
    } else {
      const { taskId } = req.params;
      const currentTask = await Task.findById(taskId);
      const currentUserId = req.session.currentUser._id;
      let logged = true;
      res.render("task/updateTask", {
        currentTask,
        logged,
        currentUserId,
        errorMessage: "Task name is required",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/details/:taskId", isLoggedIn, async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const currentTask = await Task.findById(taskId);
    let logged = true;
    res.render("task/taskDetails", { currentTask, logged });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
