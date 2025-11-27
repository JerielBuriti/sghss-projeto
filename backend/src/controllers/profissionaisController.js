const db = require('../db/data');
const id = require('../db/utils');

exports.create = (req, res) => {
  const { nome, crm, especialidade } = req.body;
  if(!nome || !crm) return res.status(400).json({ erro: 'nome e crm obrigatórios' });
  const novo = { id: id(), nome, crm, especialidade };
  db.profissionais.push(novo);
  res.json({ mensagem: 'Profissional criado', profissional: novo });
};
exports.list = (req, res) => res.json(db.profissionais);
exports.get = (req, res) => {
  const p = db.profissionais.find(x=>x.id==req.params.id);
  if(!p) return res.status(404).json({ erro: 'Profissional não encontrado' });
  res.json(p);
};
exports.update = (req, res) => {
  const p = db.profissionais.find(x=>x.id==req.params.id);
  if(!p) return res.status(404).json({ erro: 'Profissional não encontrado' });
  Object.assign(p, req.body);
  res.json({ mensagem: 'Atualizado', profissional: p });
};
exports.remove = (req, res) => {
  const idx = db.profissionais.findIndex(x=>x.id==req.params.id);
  if(idx===-1) return res.status(404).json({ erro: 'Profissional não encontrado' });
  db.profissionais.splice(idx,1);
  res.json({ mensagem: 'Profissional removido' });
};
