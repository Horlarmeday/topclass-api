import '../config/env';
import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import rateLimit from 'express-rate-limit';

import error from '../middleware/error';
import staffRoutes from '../modules/Staff/staffRoutes';
import customerRoutes from '../modules/Customer/customerRoutes';
import productRoutes from '../modules/Product/productRoutes';
import utilityRoutes from '../modules/Utility/utilityRoutes';
import serviceRoutes from '../modules/Service/serviceRoutes';
import invoiceRoutes from '../modules/Invoice/invoiceRoutes';
import './logger';

const server = express();
server.disable('X-powered-by');
const apiTimeout = 18000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

server.use(cors());
server.use(helmet());
server.use(limiter);
server.use(express.json({ limit: '5mb' }));
server.use(express.static('download'));
server.use(
  fileUpload({
    limits: { fileSize: 7 * 1024 * 1024 },
  })
);
server.use('/static', express.static(path.join(__dirname, '../public')));
server.use('/api/staffs', staffRoutes);
server.use('/api/customers', customerRoutes);
server.use('/api/products', productRoutes);
server.use('/api/utilities', utilityRoutes);
server.use('/api/services', serviceRoutes);
server.use('/api/invoices', invoiceRoutes);

server.use((req, res, next) => {
  // set the timeout for all HTTP requests
  req.setTimeout(apiTimeout, () => {
    const err = new Error('Request Timeout');
    err.status = 408;
    next(err);
  });

  // set the server response timeout for all HTTP requests
  res.setTimeout(apiTimeout, () => {
    const err = new Error('Service Unavailable');
    err.status = 503;
    next(err);
  });
  next();
});

server.use(error);

server.use((req, res, next) => {
  const err = res.status(404).json('Resource does not exist');
  next(err);
});

export default server;
