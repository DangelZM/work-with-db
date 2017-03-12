const util = require('util');

const debug = require('debug')('work-with-db:mongoose');
const logger = require('../libs/logger')(module);

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbUrl = `${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`;
const connection = mongoose.connection;
mongoose.connect(dbUrl);

connection.on('connected',    () => logger.info(`Mongoose connected to ${dbUrl}`) );
connection.on('error', (err) => {
  if(err instanceof Error) throw err;
  throw new Error(`Unable connect to database: ${dbUrl}`);
});
connection.on('disconnected', () => logger.info(`Mongoose disconnected from ${dbUrl}`) );

if (process.env.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

process.on('SIGINT', () => {
  connection.close(() => {
    logger.info('Mongoose connection closed through app termination');
    process.exit(0);
  });
});

