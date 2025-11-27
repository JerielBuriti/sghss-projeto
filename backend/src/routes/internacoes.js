const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/internacoesController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');


router.post('/leitos', auth, role(['admin']), ctrl.createLeito);
router.get('/leitos', auth, role(['admin', 'profissional']), ctrl.listLeitos);
router.post('/', auth, role(['admin', 'profissional']), ctrl.internar);
router.post('/:id/alta', auth, role(['admin', 'profissional']), ctrl.alta);
router.get('/', auth, role(['admin', 'profissional']), ctrl.list);
router.delete('/:id', auth, role(['admin']), ctrl.deletar);

module.exports = router;
