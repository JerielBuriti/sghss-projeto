const db = require('../db/data');
const id = require('../db/utils');
const schema = require('../validators/pacienteValidator');

exports.create = (req, res) => {
  const { error } = schema.validate(req.body);
  if(error) return res.status(400).json({ erro: error.details[0].message });
  if(db.pacientes.find(p=>p.cpf === req.body.cpf)) return res.status(409).json({ erro: 'CPF já cadastrado' });
  const novo = { id: id(), ...req.body };
  db.pacientes.push(novo);
  res.json({ mensagem: 'Paciente criado', paciente: novo });
};

exports.list = (req, res) => res.json(db.pacientes);
exports.get = (req, res) => {
  const p = db.pacientes.find(x=>x.id==req.params.id);
  if(!p) return res.status(404).json({ erro: 'Paciente não encontrado' });
  res.json(p);
};
exports.update = (req, res) => {
  const p = db.pacientes.find(x=>x.id==req.params.id);
  if(!p) return res.status(404).json({ erro: 'Paciente não encontrado' });
  Object.assign(p, req.body);
  res.json({ mensagem: 'Atualizado', paciente: p });
};
exports.remove = (req, res) => {
  const idx = db.pacientes.findIndex(x=>x.id==req.params.id);
  if(idx===-1) return res.status(404).json({ erro: 'Paciente não encontrado' });
  db.pacientes.splice(idx,1);
  res.json({ mensagem: 'Paciente removido' });
};
