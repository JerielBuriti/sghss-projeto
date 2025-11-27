require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const pacientesRoutes = require('./routes/pacientes');
const agendamentosRoutes = require('./routes/agendamentos');
const profissionaisRoutes = require('./routes/profissionais');
const prontuariosRoutes = require('./routes/prontuarios');
const prescricoesRoutes = require('./routes/prescricoes');
const internacoesRoutes = require('./routes/internacoes');

const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/consultas', agendamentosRoutes);
app.use('/api/profissionais', profissionaisRoutes);
app.use('/api/prontuarios', prontuariosRoutes);
app.use('/api/prescricoes', prescricoesRoutes);
app.use('/api/internacoes', internacoesRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('API rodando na porta', PORT));
