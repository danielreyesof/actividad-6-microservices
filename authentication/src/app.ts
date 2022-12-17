import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import pkg from '../package.json';
import { createRoles } from './libs/initialSetup';
import authRoutes from './routes/auth.routes';

const app = express();
createRoles();

// Set
app.set('pkg', pkg);

// Use
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Crud
app.get('/', (_req: any, res) => {
  res.json({
    project_name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version,
  });
});

app.use('/api/auth/', authRoutes);

export default app;
