// Only endpoints without authentication are included.

import { errorHandler } from '../middleware';
import app from './base';
import memo from '../services/memo/router';

app.use('/memo', memo);
app.use(errorHandler);

export default app;
