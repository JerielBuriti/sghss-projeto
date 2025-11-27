const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/profissionaisController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

router.post('/', auth, role(['admin']), ctrl.create);
router.get('/', auth, role(['admin','profissional']), ctrl.list);
router.get('/:id', auth, role(['admin','profissional']), ctrl.get);
router.put('/:id', auth, role(['admin']), ctrl.update);
router.delete('/:id', auth, role(['admin']), ctrl.remove);

module.exports = router;
