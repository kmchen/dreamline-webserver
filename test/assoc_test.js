import mongoose from 'mongoose';
import {should, assert, expect} from 'chai';
import uuid     from 'uuid';
import moment   from 'moment';

import Constant from '../app/constant';
import Assoc    from '../app/store/assoc';

describe('Asso store operation', () => {
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
  let guidDest = uuid.v1();
  let assoc = new Assoc(guidDest, someType, {uuid: someUUID});
  let a = assoc.new(guidDest, someType, {uuid: someUUID});
  let query = {guid: a.guid, type: a.type, guidDest: a.guidDest};
  let saved = {};

  it('Set', () => {
    return assoc.Add(a).then(doc => {
      expect(doc).be.exist;
      expect(someUUID).to.equal(doc.data.uuid);
      expect(someType).to.equal(doc.type);
      saved = doc;
    }).end();
  });

  it('Get', () => {
    return assoc.Get(query).then(doc => {
      expect(doc).be.exist;
      expect(doc).to.have.length(1);
      let data = doc[0];
      expect(data.guid).to.equal(saved.guid);
      expect(data.guidDest).to.equal(saved.guidDest);
      expect(data.data).to.have.property('uuid').to.be.equal(someUUID);
      expect(data.type).to.equal(saved.type);
      expect(data.timestamp).to.equal(saved.timestamp);
    }).end();
  });

  it('Update', () => {
    saved.timestamp = moment.valueOf();
    //let query = {guid: saved.guid, type: saved.type, guidDest: saved.guidDest};
    assoc.Update(saved);
    return assoc.Get(query).then(doc => {
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
    //let query = {guid: saved.guid, type: saved.type, guidDest: saved.guidDest};
    assoc.Delete(query);
    return assoc.Get(query).then(doc => {
      expect(doc).to.have.length(0);
    }).end();
  });
});
