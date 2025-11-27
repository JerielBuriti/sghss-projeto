const jwt = require('jsonwebtoken');
const db = require('../db/data');
const secret = process.env.JWT_SECRET || 'SEGREDO_TCC';

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ erro: 'Token ausente' });
  const parts = auth.split(' ');
  if(parts.length !== 2) return res.status(401).json({ erro: 'Token inválido' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, secret);
    const user = db.usuarios.find(u=>u.id === payload.id);
    if(!user) return res.status(401).json({ erro: 'Usuário não encontrado' });
    req.user = { id: user.id, usuario: user.usuario, role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
};
