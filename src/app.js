const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('express-async-errors');
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');
const healthRoutes = require('./routes/health');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const { allowedOrigins } = require('./config/env');

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    const isLocalHost = origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1');
    if (allowedOrigins.includes(origin) || allowedOrigins.includes('*') || (process.env.NODE_ENV !== 'production' && isLocalHost)) {
      return callback(null, true);
    }

    callback(new Error('CORS policy blocked access from this origin'));
  },
  credentials: true,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later.',
  })
);

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
