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



// POST /api/works/:id/like (increment likes)
router.post('/:id/like', controller.like);

// DELETE /api/works/:id (remove)
router.delete('/:id', controller.remove);

module.exports = router;
