const db = require('../db/data');
const id = require('../db/utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'SEGREDO_TCC';
const expiresIn = process.env.JWT_EXPIRES_IN || '4h';


exports.registrar = (req, res) => {
  const { usuario, senha, role } = req.body;
  if(!usuario || !senha) return res.status(400).json({ erro: 'usuario e senha obrigatórios' });
  if(db.usuarios.find(u=>u.usuario === usuario)) return res.status(409).json({ erro: 'Usuário existe' });
  const hash = bcrypt.hashSync(senha, 8);
  const novo = { id: id(), usuario, senhaHash: hash, role: role || 'profissional' };
  db.usuarios.push(novo);
  res.json({ mensagem: 'Usuário registrado', usuario: { id: novo.id, usuario: novo.usuario, role: novo.role }});
};

exports.login = (req, res) => {
  const { usuario, senha } = req.body;
  const user = db.usuarios.find(u=>u.usuario===usuario);
  if(!user) return res.status(404).json({ erro: 'Usuário não encontrado' });
  const ok = bcrypt.compareSync(senha, user.senhaHash);
  if(!ok) return res.status(401).json({ erro: 'Senha incorreta' });
  const token = jwt.sign({ id: user.id, usuario: user.usuario }, secret, { expiresIn });
  res.json({ mensagem: 'Login OK', token, usuario: { id: user.id, usuario: user.usuario, role: user.role }});
};
