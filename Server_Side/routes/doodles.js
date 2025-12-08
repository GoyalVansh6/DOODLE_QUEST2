import express from 'express';
import { getStorageHistory} from '../controllers/storage.controller.js';

import { protect } from '../middleware/clerk.js';


router.get('/doodles', protect, getStorageHistory);
