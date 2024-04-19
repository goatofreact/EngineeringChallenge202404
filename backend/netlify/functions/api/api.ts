import express, { Router } from 'express';
import serverless from 'serverless-http';
import { getMachineHealth } from '../../../machineHealth';
import { validateUsernamePassword } from '../../../utils';
import { login } from '../../../mysql';

const api = express();

// Middleware to parse JSON request bodies
api.use(express.json());

const router = Router();
router.get('/hello', (req, res) => res.send('Hello World!'));
router.post('/machine-health', (req, res) => {
  const result = getMachineHealth(req);
  if (result.error) {
    res.status(400).json(result);
  } else {
    res.json(result);
  }
});

router.post('/login', (req, res) => {
  console.log('login')
  const { username, password } = req.body;
  if (validateUsernamePassword(username, password)) {
    login(username, password);
    res.json(req.body);
  } else {
    res.status(400).json(req.body);
  }

});

router.post('/logout', (req, res) => {
  const { username, password } = req.body;
  if (validateUsernamePassword(username, password)) {
    res.json(req.body);
  } else {
    res.status(400).json(req.body);
  }
});

api.use('/api/', router);

export const handler = serverless(api);
