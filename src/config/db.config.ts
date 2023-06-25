import mongoose from 'mongoose';
import * as es6Promise from 'es6-promise';

const dbSetup = (): void => {
  console.log(`Connecting to DB.`);

  (<any>mongoose).Promise = es6Promise.Promise;
  mongoose.connect(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });


};

export { dbSetup };
