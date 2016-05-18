import uuid     from 'uuid';
import mongoose from 'mongoose';
import moment   from 'moment';
import _        from 'lodash';

import {AssocModel, AssocSchema} from '../models/assocSchema';

const emptyVal = '0';

class Assoc {
  new(dest, type, data = {}) {
    return new AssocModel({
      guid: uuid.v1(),
      guidDest: dest,
      data: data,
      type: type,
      timestamp: moment().valueOf()
    });
  }
  // Get a meta object given a guid
  Get(param, cb) {
    if (!_.has(param, 'guid') || 
        !_.has(param, 'guidDest') || 
        !_.has(param, 'type')) {
      return new Error('[Assoc] Trying to delete invalid assoc obj ' + param);
    }
    return AssocModel.find(param).exec(cb);
  }
  Gets() {
    if (!this.assocData.guid && this.assocData.type) {
      return new Error('[Assoc] Missing GUID or type ' + this.assocData);
    }
    that = this.assocData;
    return AssocModel.find({guid: that.guid, type: that.type}).exec(cb);
  }
  // Add an assoc object
  Add(assoc, cb) {
    if(!assoc) {
      return new Error('[Assoc] assoc object is null' + assoc);
    }
    return assoc.save(cb);
  }
  // Delete
  Delete(param, cb) {
    if (!param.guid || !param.guidDest || !param.type) {
      return new Error('[Assoc] Trying to delete invalid assoc obj ' + param);
    }
    return AssocModel.findOneAndRemove(param).exec(cb);
  }
  //Update
  Update(obj, cb) {
    if (!obj.guid) {
      return new Error('[Assoc] Missing GUID while updating assoc object ' + obj) 
    }
    let param = {guid: obj.guid, type: obj.type, guidDest: obj.guidDest};
    return AssocModel.findOneAndUpdate(param, obj, null, null).exec(cb);
  }
}

export default Assoc;
