const db = require('../db/data');
const id = require('../db/utils');
const schema = require('../validators/agendamentoValidator');

exports.create = (req, res) => {
  const { error } = schema.validate(req.body);
  if(error) return res.status(400).json({ erro: error.details[0].message });
  const paciente = db.pacientes.find(p=>p.id==req.body.pacienteId);
  if(!paciente) return res.status(404).json({ erro: 'Paciente não encontrado' });
  
  // check conflict
  const conflict = db.agendamentos.find(a=>a.data===req.body.data && a.horario===req.body.horario && a.status!=='cancelado');
  if(conflict) return res.status(409).json({ erro: 'Horário ocupado' });
  const novo = { id: id(), ...req.body, status: 'agendado' };
  db.agendamentos.push(novo);
  res.json({ mensagem: 'Agendamento criado', consulta: novo });
};

exports.list = (req, res) => res.json(db.agendamentos);
exports.get = (req, res) => {
  const a = db.agendamentos.find(x=>x.id==req.params.id);
  if(!a) return res.status(404).json({ erro: 'Agendamento não encontrado' });
  res.json(a);
};
exports.cancel = (req, res) => {
  const a = db.agendamentos.find(x=>x.id==req.params.id);
  if(!a) return res.status(404).json({ erro: 'Agendamento não encontrado' });
  a.status = 'cancelado';
  res.json({ mensagem: 'Agendamento cancelado', consulta: a });
};
exports.reschedule = (req, res) => {
  const a = db.agendamentos.find(x=>x.id==req.params.id);
  if(!a) return res.status(404).json({ erro: 'Agendamento não encontrado' });
  const { data, horario } = req.body;
  if(!data || !horario) return res.status(400).json({ erro: 'data e horario obrigatórios' });
  const conflict = db.agendamentos.find(x=>x.data===data && x.horario===horario && x.id!=a.id && x.status!=='cancelado');
  if(conflict) return res.status(409).json({ erro: 'Horário ocupado' });
  a.data = data; a.horario = horario; a.status = 'reagendado';
  res.json({ mensagem: 'Reagendado', consulta: a });
};
