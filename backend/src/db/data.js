module.exports = {
  usuarios: [], // {id, usuario, senhaHash, role}
  pacientes: [], // {id, nome, cpf, dataNascimento, telefone, endereco}
  agendamentos: [], // {id, pacienteId, medico, data, horario, status}
  profissionais: [], // {id, nome, crm, especialidade}
  prontuarios: [], // {id, pacienteId, profissionalId, texto, data}
  prescricoes: [], // {id, pacienteId, profissionalId, texto, data}
  internacoes: [], // {id, pacienteId, leitoId, entrada, saida, status}
  leitos: [] // {id, codigo, status, descricao}
};
