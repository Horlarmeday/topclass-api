import { port } from './config/secret';
// import { app } from './startup/io';
import server from './startup/server'

// import './socket/socket';

server.listen(port, () => console.log(`Running on port ${port}...`));
