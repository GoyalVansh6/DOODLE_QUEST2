import express from 'express';
import {
  assignTask,
  getMyTasks,
  completeTask,
  sendAppreciation,
} from '../controllers/task.controller.js';
import { protect } from '../middleware/clerk.js';

const router = express.Router();

// Parent assigns a task
router.post('/assign', protect, assignTask);

// Child gets their tasks
router.get('/my-tasks', protect, getMyTasks);

// Child completes a task
router.put('/complete/:taskId', protect, completeTask);

// Parent sends appreciation
router.put('/appreciate/:taskId', protect, sendAppreciation);

export default router;