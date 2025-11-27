module.exports = function(allowedRoles=[]) {
  return (req, res, next) => {
    const role = req.user && req.user.role;
    if(!role) return res.status(403).json({ erro: 'Sem permissão' });
    if(!allowedRoles.includes(role)) return res.status(403).json({ erro: 'Acesso negado para sua role' });
    next();
  };
};
