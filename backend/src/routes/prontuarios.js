const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/prontuariosController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

router.post('/', auth, role(['profissional','admin']), ctrl.create);
router.get('/paciente/:pacienteId', auth, role(['profissional','admin']), ctrl.listByPaciente);
router.get('/', auth, role(['profissional','admin']), ctrl.listAll);
router.put('/:id', auth, ctrl.update);
router.delete('/:id', auth, role(['profissional','admin']), ctrl.remove);

module.exports = router;
