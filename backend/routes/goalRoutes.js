const express = require('express')
const router = express.Router();
const { getGoals, setGoals, deleteGoal, updateGoal } = require('../controllers/goalContoller');

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getGoals).post(protect, setGoals)
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

router.put('/:id', updateGoal)

router.delete('/:id', deleteGoal)

module.exports = router;