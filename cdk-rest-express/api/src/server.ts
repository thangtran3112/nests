import express, { Application } from 'express';
import Server from 'src';
import { cors } from './middleware';
import hpp from 'hpp';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { xss } = require('express-xss-sanitizer');

const app: Application = express();
const server: Server = new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

/**
 * 1) Prevent dead process collection on local run
 * https://github.com/wclr/ts-node-dev/issues/120
 */
process.on('SIGTERM', (err: any) => {
  process.exit(1);
});

/**
 * 2) Apply Global Middlewares
 * Protecting againt big request
 * Protect against wrong content type
 * Protect against cross-site scripting
 * Protect against Dynamo DB or SQL injection (not yet done)
 * Note: Even if this server is a private lambda,
 * chance that Apigateway and Appsync may not sanitize data and simply passing payload to it
 */
app.use(express.json({ limit: '6mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(xss());

/*
 * Prevent parameter pollution, such as duplicate query parameters
 * Eg: ?sort=price&sort=name&sort=type , while we only allow only 1 sort param
 * we still want to allow some exceptions, in such case, add to whitelist
 */
app.use(
  hpp({
    whitelist: [],
  }),
);

app
  .listen(PORT, 'localhost', function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log('Error: address already in use');
    } else {
      console.log(err);
    }
  });

export default app;
