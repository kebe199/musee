const express = require('express');
const router = express.Router();
const controller = require('../controllers/worksController');

// GET /api/works
router.get('/', controller.list);
// GET /api/works/:id
router.get('/:id', controller.getById);

// POST /api/works (create)
router.post('/', controller.create);

// PUT /api/works/:id (update)
router.put('/:id', controller.update);

// PATCH /api/works/:id/archive (archive)
router.patch('/:id/archive', controller.archive);

module.exports = router;
