const express = require('express');
const router = express.Router();
const controller = require('../controllers/worksController');

// GET /api/works
router.get('/', controller.list);
// GET /api/works/:id
router.get('/:id', controller.getById);

module.exports = router;
