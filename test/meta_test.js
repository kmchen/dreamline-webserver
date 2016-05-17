import mongoose from 'mongoose';
import {should, assert, expect} from 'chai';
import uuid     from 'uuid';

import Constant from '../app/constant';
import Meta     from '../app/store/meta';

describe('Set and Get meta store', () => {
  before(() => {
    let mongoURL = "mongodb://localhost/test";
    mongoose.connect(mongoURL);
    let db = mongoose.connection;
    db.once('open', function() {
      console.log('Successfully connected to MongoDB on port');
    });
    db.on('error',() => {
      assert.fail('Unable to connect to '+mongoURL);
    });
  });

  after(() => {
    mongoose.disconnect();
  });

  it('Set then get', () => {
    let someUUID = uuid.v1();
    let someType = uuid.v1();
    let m = new Meta({uuid: someUUID}, someType);
    return m.set().then((doc) => {
      expect(doc).be.exist;
      expect(someUUID).to.equal(doc.data.uuid);
      expect(someType).to.equal(doc.type);
    })}
  );
});
