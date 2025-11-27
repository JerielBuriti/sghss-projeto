const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/agendamentosController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

router.post('/', auth, role(['admin','profissional']), ctrl.create);
router.get('/', auth, role(['admin','profissional']), ctrl.list);
router.get('/:id', auth, role(['admin','profissional']), ctrl.get);
router.post('/:id/cancelar', auth, role(['admin','profissional']), ctrl.cancel);
router.put('/:id/reagendar', auth, role(['admin','profissional']), ctrl.reschedule);

module.exports = router;
