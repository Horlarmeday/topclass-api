// import { port } from './config/secret';
// import { app } from './startup/io';
import server from './startup/server'

const PORT = process.env.PORT;

// import './socket/socket';

server.listen(PORT, () => console.log(`Running on port ${PORT}...`));
