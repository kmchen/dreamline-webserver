import mongoose from 'mongoose';
import {should, assert, expect} from 'chai';
import uuid     from 'uuid';

import Constant from '../app/constant';
import Meta     from '../app/store/meta';

describe('Set and Get meta store', () => {
  before((done) => {
    let mongoURL = "mongodb://localhost/test";
    mongoose.connect(mongoURL);
    let db = mongoose.connection;
    db.once('open', function() {
      console.log('Successfully connected to MongoDB on port');
      done();
    });
    db.on('error',() => {
      assert.fail('Unable to connect to '+mongoURL);
    });
  });

  after(() => {
    mongoose.disconnect();
  });

  let someUUID = uuid.v1();
  let someType = uuid.v1();
  let meta = new Meta();
  let m = meta.new({uuid: someUUID}, someType);
  let saved = {};

  it('Set', () => {
    return meta.Set(m).then(doc => {
      expect(doc).be.exist;
      expect(someUUID).to.equal(doc.data.uuid);
      expect(someType).to.equal(doc.type);
      saved = doc;
    }).end();
  });

  it('Get', () => {
    return meta.Get(saved.guid).then(doc => {
      expect(doc).be.exist;
      expect(doc).to.have.length(1);
      let data = doc[0];
      expect(data.guid).to.equal(saved.guid);
      expect(data.type).to.equal(saved.type);
      expect(data.data).to.have.property('uuid').to.be.equal(someUUID);
      expect(data.invType).to.equal(saved.invType);
    }).end();
  });

  it('Update', () => {
    saved.invType = uuid.v1();
    meta.Update(saved);
    return meta.Get(saved.guid).then(doc => {
      expect(doc).be.exist;
      expect(doc).to.have.length(1);
      let data = doc[0];
      expect(data.guid).to.equal(saved.guid);
      expect(data.type).to.equal(saved.type);
      expect(data.data).to.have.property('uuid').to.be.equal(someUUID);
      expect(data.invType).to.equal(saved.invType);
    }).end();
  });

  it('Delete', () => {
    meta.Delete(saved.guid);
    return meta.Get(saved.guid).then(doc => {
      expect(doc).to.have.length(0);
    }).end();
  });
});
