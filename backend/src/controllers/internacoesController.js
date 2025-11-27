const db = require('../db/data');
const id = require('../db/utils');

exports.createLeito = (req, res) => {
  const { codigo, descricao } = req.body;

  if (!codigo) {
    return res.status(400).json({ erro: 'O campo "codigo" é obrigatório.' });
  }

  const novo = {
    id: id(),
    codigo,
    descricao: descricao || '',
    status: 'livre'
  };

  db.leitos.push(novo);
  res.json({ mensagem: 'Leito criado com sucesso', leito: novo });
};

exports.listLeitos = (req, res) => {
  res.json(db.leitos);
};

exports.internar = (req, res) => {
  const { pacienteId, leitoId } = req.body;

  const paciente = db.pacientes.find(p => p.id == pacienteId);
  if (!paciente) {
    return res.status(404).json({ erro: 'Paciente não encontrado.' });
  }

  const leito = db.leitos.find(l => l.id == leitoId);
  if (!leito) {
    return res.status(404).json({ erro: 'Leito não encontrado.' });
  }

  if (leito.status === 'ocupado') {
    return res.status(409).json({ erro: 'Leito já está ocupado.' });
  }

  leito.status = 'ocupado';

  const nova = {
    id: id(),
    pacienteId,
    leitoId,
    entrada: new Date().toISOString(),
    status: 'internado'
  };

  db.internacoes.push(nova);
  res.json({ mensagem: 'Internação cadastrada com sucesso', internacao: nova });
};

exports.alta = (req, res) => {
  const internacao = db.internacoes.find(i => i.id == req.params.id);

  if (!internacao) {
    return res.status(404).json({ erro: 'Internação não encontrada.' });
  }

  if (internacao.status !== 'internado') {
    return res.status(400).json({ erro: 'Internação já finalizada.' });
  }

  internacao.status = 'alta';
  internacao.saida = new Date().toISOString();

  const leito = db.leitos.find(l => l.id == internacao.leitoId);
  if (leito) leito.status = 'livre';

  res.json({ mensagem: 'Alta realizada com sucesso', internacao });
};

exports.list = (req, res) => {
  res.json(db.internacoes);
};

exports.deletar = (req, res) => {
  const idx = db.internacoes.findIndex(x=>x.id==req.params.id);
  if(idx===-1) return res.status(404).json({ erro: 'Internação não encontrada' });
  db.internacoes.splice(idx,1);
  res.json({ mensagem: 'Internação deletada com sucesso' });
};
