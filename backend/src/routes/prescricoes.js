const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/prescricoesController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

// criar
router.post('/', auth, role(['profissional', 'admin']), ctrl.create);

// listar todas
router.get('/', auth, role(['profissional', 'admin']), ctrl.listAll);

// listar por paciente
router.get('/paciente/:pacienteId', auth, role(['profissional', 'admin']), ctrl.listByPaciente);

// buscar por id
router.get('/:id', auth, role(['profissional', 'admin']), ctrl.get);

// atualizar
router.put('/:id', auth, role(['profissional', 'admin']), ctrl.update);

// deletar
router.delete('/:id', auth, role(['profissional', 'admin']), ctrl.delete);

module.exports = router;
