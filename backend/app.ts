import express, { Request, Response } from 'express';
import { getMachineHealth } from './machineHealth';
import { validateUsernamePassword } from './utils';
import { checkAuth, login, signUp, logout, addMachine, partPost } from './mysql'
import { apiMap } from '../native-app/data/types';
const app = express();
const port = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to get machine health score
app.post(apiMap.machineHealth, (req: Request, res: Response) => {
  const result = getMachineHealth(req);
  if (result.error) {
    res.status(400).json(result);
  } else {
    res.json(result);
  }
});

app.post(apiMap.login, async (req, res) => {
  console.log('login')
  const { username, password } = req.body;
  if (validateUsernamePassword(username, password)) {
    const session = await login(username, password);
    // signUp(username, password);
    res.json(session);
    console.log('login', session)
  } else {
    res.status(400).json(req.body);
  }

});

app.post(apiMap.signUp, async (req, res) => {
  console.log(apiMap.signUp, req.body)
  const { username, password } = req.body;
  if (validateUsernamePassword(username, password)) {
    console.log('sign-up')
    const session = await signUp(username, password);

    res.json(session);
    console.log('sign-up', session)
  } else {
    res.status(400).json(req.body);
  }

});

app.post(apiMap.logout, async (req, res) => {
  console.log('logout')
  const { username, password } = req.body;
  if (validateUsernamePassword(username, password)) {
    const session = logout(username, password);
    res.json(req.body);
  } else {
    res.status(400).json(req.body);
  }
});

app.post(apiMap.checkAuth, (req, res) => {
  console.log('checkAuth')
  const { username, session } = req.body;
  if (username && session) {
    checkAuth(username, session);
    res.json(req.body);
  } else {
    res.status(400).json(req.body);
  }
});

app.post(apiMap.machinePost, (req, res) => {
  console.log('machine-post')
  const { username, session, partInfo } = req.body;
  if (username && session) {
    // addMachine(username, partInfo);
    res.json(req.body);
  } else {
    res.status(400).json(req.body);
  }
});

app.post(apiMap.partPost, (req, res) => {
  console.log('partPost')
  const { machineType, partInfo } = req.body;
  if (machineType && partInfo) {
    partPost(machineType, partInfo);
    res.json(req.body);
  } else {
    res.status(400).json(req.body);
  }
});

app.post('/machine', (req, res) => {
  console.log('checkAuth')
  const { username, session } = req.body;
  if (username && session) {
    checkAuth(username, session);
    res.json(req.body);
  } else {
    res.status(400).json(req.body);
  }
});

app.listen(port, () => {
  console.log(`API is listening at http://localhost:${port}`);
});
