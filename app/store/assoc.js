import uuid     from 'uuid';
import mongoose from 'mongoose';
import moment   from 'moment';

import {AssocModel, AssocSchema} from '../models/assocSchema';

const emptyVal = '0';

class Assoc {
  //constructor(dest, type, data = {}) {
    //this.assocData = new AssocModel({
      //guid: uuid.v1(),
      //guidDest: dest,
      //data: data,
      //type: type,
      //timestamp: moment().valueOf()
    //});
  //}
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
  Get(guid, cb) {
    if (guid === emptyVal) {
      return new Error('[Assoc] Empty GUID ' + guid);
    }
    if (typeof guid != 'string') {
      return new Error('[Assoc] GUID must be a string ' + guid);
    }
    return AssocModel.find({guid: guid}).exec(cb);
  }
  //Gets() {
    //if (!this.assocData.guid && this.assocData.type) {
      //return new Error('[Assoc] Missing GUID or type ' + this.assocData);
    //}
    //that = this.assocData;
    //return AssocModel.find({guid: that.guid, type: that.type}).exec(cb);
  //}
  // Add an assoc object
  Add(assoc, cb) {
    if(!assoc) {
      return new Error('[Assoc] assoc object is null' + assoc);
    }
    return assoc.save(cb);
  }
  // Delete
  Delete(guid, cb) {
    if (guid === emptyVal) {
      return new Error('[Assoc] Missing guid to delete assoc object ' + obj);
    }
    if (typeof guid != 'string') {
      return new Error('[Assoc] Trying to delete invalid GUID ' + guid);
    }
    return AssocModel.findOneAndRemove({guid: guid}).exec(cb);
  }
  //Update
  Update(obj, cb) {
    if (!obj.guid) {
      return new Error('[Assoc] Missing GUID while updating assoc object ' + obj) 
    }
    return AssocModel.findOneAndUpdate({guid: obj.guid}, obj, null, null).exec(cb);
  }
}

export default Assoc;
