const db = require('../db/data');
const id = require('../db/utils');

exports.create = (req, res) => {
  const { pacienteId, medicamentos, observacoes } = req.body;

  if (!pacienteId || !medicamentos || !Array.isArray(medicamentos)) {
    return res.status(400).json({
      erro: 'pacienteId e lista de medicamentos são obrigatórios'
    });
  }

  const paciente = db.pacientes.find(p => p.id == pacienteId);
  if (!paciente) {
    return res.status(404).json({ erro: 'Paciente não encontrado' });
  }

  const nova = {
    id: id(),
    pacienteId,
    profissionalId: req.user.id,
    medicamentos,
    observacoes: observacoes || '',
    data: new Date().toISOString()
  };

  db.prescricoes.push(nova);

  res.json({
    mensagem: 'Prescrição criada',
    prescricao: nova
  });
};

exports.listAll = (req, res) => {
  res.json(db.prescricoes);
};

exports.listByPaciente = (req, res) => {
  const pid = req.params.pacienteId;
  const items = db.prescricoes.filter(p => p.pacienteId == pid);
  res.json(items);
};


exports.get = (req, res) => {
  const p = db.prescricoes.find(x => x.id == req.params.id);
  if (!p) {
    return res.status(404).json({ erro: 'Prescrição não encontrada' });
  }
  res.json(p);
};


exports.update = (req, res) => {
  const p = db.prescricoes.find(x => x.id == req.params.id);
  if (!p) {
    return res.status(404).json({ erro: 'Prescrição não encontrada' });
  }

  if (req.user.role !== 'profissional' && req.user.role !== 'admin') {
    return res.status(403).json({ erro: 'Sem permissão' });
  }

  p.medicamentos = req.body.medicamentos || p.medicamentos;
  p.observacoes = req.body.observacoes || p.observacoes;

  res.json({
    mensagem: 'Atualizado',
    prescricao: p
  });
};


exports.delete = (req, res) => {
  const index = db.prescricoes.findIndex(x => x.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Prescrição não encontrada' });
  }

  db.prescricoes.splice(index, 1);

  res.json({ mensagem: 'Prescrição deletada com sucesso' });
};
