const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const Task = require("../models/Task.model");
const { isLoggedIn, isLoggedOut } = require("../middleware/protect-routes");
const { Schema, model } = require("mongoose");
const User = require("../models/User.model");
const uploader = require("../middleware/cloudinary.config.js");

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const unsortedList = await Task.find({ creator: req.session.currentUser });
    const taskList = [];
    unsortedList.forEach((task) => {
      if (task.priority === "high") {
        taskList.push(task);
      }
    });
    unsortedList.forEach((task) => {
      if (task.priority === "medium") {
        taskList.push(task);
      }
    });
    unsortedList.forEach((task) => {
      if (task.priority === "low") {
        taskList.push(task);
      }
    });
    let logged = true;
    let completedTasks = 0;
    taskList.forEach((task) => {
      if (task.state === "done") {
        completedTasks += 1;
      }
    });
    res.render("task/taskList", { taskList, logged, completedTasks });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const unfilteredList = await Task.find({
      creator: req.session.currentUser,
    });

    let unsortedList = [];
    unfilteredList.forEach((task) => {
      if (task.name.includes(req.body.search)) {
        unsortedList.push(task);
      }
    });
    const taskList = [];
    unsortedList.forEach((task) => {
      if (task.priority === "high") {
        taskList.push(task);
      }
    });
    unsortedList.forEach((task) => {
      if (task.priority === "medium") {
        taskList.push(task);
      }
    });
    unsortedList.forEach((task) => {
      if (task.priority === "low") {
        taskList.push(task);
      }
    });

    let logged = true;
    let completedTasks = 0;
    taskList.forEach((task) => {
      if (task.state === "done") {
        completedTasks += 1;
      }
    });
    res.render("task/taskList", { taskList, logged, completedTasks });
  } catch (error) {
    console.log(error);
  }
});

router.get("/create", isLoggedIn, (req, res, next) => {
  let logged = true;
  const currentUserId = req.session.currentUser._id;
  res.render("task/createTask", { logged, currentUserId });
});

router.post("/create", uploader.single("imageUrl"), async (req, res) => {
  try {
    if (req.body.name) {
      if (req.body.description) {
        if (req.body.sharedWith) {
          const sharedUser = await User.findOne({
            username: req.body.sharedWith,
          });
          if (sharedUser) {
            const creatorArray = [req.body.creator, sharedUser._id];

            if (req.file) {
              let { name, description, priority, state, creator, sharedWith } =
                req.body;

              const image = req.file.path;
              creator = creatorArray;
              await Task.create({
                name,
                description,
                priority,
                state,
                creator,
                sharedWith,
                image,
              });
              res.redirect("/task");
            } else {
              await Task.create(
                Object.assign({}, req.body, { creator: creatorArray })
              );
              res.redirect("/task");
            }
          } else {
            const currentUserId = req.session.currentUser._id;
            let logged = true;
            res.render("task/createTask", {
              logged,
              currentUserId,
              errorMessage: "User not found in database",
            });
          }
        } else {
          if (req.file) {
            let { name, description, priority, state, creator, sharedWith } =
              req.body;

            const image = req.file.path;

            await Task.create({
              name,
              description,
              priority,
              state,
              creator,
              sharedWith,
              image,
            });
            res.redirect("/task");
          } else {
            await Task.create(Object.assign(req.body));
            res.redirect("/task");
          }
        }
      } else {
        const currentUserId = req.session.currentUser._id;
        let logged = true;
        res.render("task/createTask", {
          logged,
          errorMessage: "Task description is required",
          currentUserId,
        });
      }
    } else {
      const currentUserId = req.session.currentUser._id;
      let logged = true;
      res.render("task/createTask", {
        logged,
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
