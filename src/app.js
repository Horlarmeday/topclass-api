import { port } from './config/secret';
import { app } from './startup/io';

import './socket/socket';

app.listen(port, () => console.log(`Running on port ${port}...`));
