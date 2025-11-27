const db = require('../db/data');
const id = require('../db/utils');

exports.create = (req, res) => {
  const { pacienteId, texto } = req.body;
  if(!pacienteId || !texto) return res.status(400).json({ erro: 'pacienteId e texto obrigatórios' });
  const paciente = db.pacientes.find(p=>p.id==pacienteId);
  if(!paciente) return res.status(404).json({ erro: 'Paciente não encontrado' });
  const novo = { id: id(), pacienteId, profissionalId: req.user.id, texto, data: new Date().toISOString() };
  db.prontuarios.push(novo);
  res.json({ mensagem: 'Prontuário criado', prontuario: novo });
};

exports.listByPaciente = (req, res) => {
  const pid = req.params.pacienteId;
  const items = db.prontuarios.filter(p=>p.pacienteId==pid);
  res.json(items);
};

exports.update = (req, res) => {
  const p = db.prontuarios.find(x=>x.id==req.params.id);
  if(!p) return res.status(404).json({ erro: 'Prontuário não encontrado' });
  if(req.user.role!=='profissional' && req.user.role!=='admin') return res.status(403).json({ erro: 'Sem permissão' });
  p.texto = req.body.texto || p.texto;
  res.json({ mensagem: 'Atualizado', prontuario: p });
};

exports.listAll = (req, res) => {
  return res.json(db.prontuarios);
};

exports.getOne = (req, res) => {
  const registro = db.prontuarios.find(p => p.id == req.params.id);
  if(!registro) return res.status(404).json({ erro: "Prontuário não encontrado" });
  res.json(registro);
};

exports.remove = (req, res) => {
  const index = db.prontuarios.findIndex(p => p.id == req.params.id);

  if (index === -1)
    return res.status(404).json({ erro: 'Prontuário não encontrado' });

  const apagado = db.prontuarios.splice(index, 1);

  res.json({
    mensagem: 'Prontuário deletado com sucesso',
    deletado: apagado[0]
  });
};