import asyncHandler from 'express-async-handler';
import Task from '../models/Task.model.js';

// @desc    Create a new task (Parent assigns to Child)
// @route   POST /api/tasks/assign
const assignTask = asyncHandler(async (req, res) => {
  const { childId, title, description, dueDate } = req.body;
  const parentId = req.auth.userId; 

  const task = await Task.create({
    childId, 
    parentId,
    title,
    description,
    dueDate,
  });

  res.status(201).json(task);
});

// @desc    Get all tasks for the logged-in child
// @route   GET /api/tasks/my-tasks
const getMyTasks = asyncHandler(async (req, res) => {
  const childId = req.auth.userId;

  const tasks = await Task.find({ childId }).sort({ createdAt: -1 });
  res.status(200).json(tasks);
});

// @desc    Mark task as complete (Child)
// @route   PUT /api/tasks/complete/:taskId
const completeTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findByIdAndUpdate(
    taskId,
    { status: 'completed' },
    { new: true }
  );

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  res.status(200).json(task);
});

// @desc    Send appreciation/feedback (Parent)
// @route   PUT /api/tasks/appreciate/:taskId
const sendAppreciation = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { message } = req.body;

  const task = await Task.findByIdAndUpdate(
    taskId,
    { appreciationMessage: message },
    { new: true }
  );

  res.status(200).json(task);
});

export { assignTask, getMyTasks, completeTask, sendAppreciation };