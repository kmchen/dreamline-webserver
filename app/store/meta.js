import uuid  from 'uuid';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import {MetaModel, MetaSchema} from '../models/metaSchema';

class Meta {
  constructor(data = {}, type = "", invType = "") {
    this.metaData = new MetaModel({
      guid: uuid.v1(),
      data: data,
      type: type,
      invType: invType
    });
  }
  // Get a meta object given a guid
  Get(guid, cb) {
    if (!guid) {
      return new Error('[Meta] Missing GUId');
    }
    return MetaModel.find({guid: guid}).exec(cb);
  }
  // Set a meta object
  Set(cb) {
    return this.metaData.save(cb);
  }
  //Update
  Update(obj, cb) {
    if (!obj.guid) {
      return new Error('[Meta] Missing GUID while updating meta object' + obj) 
    }
    return MetaModel.findOneAndUpdate({guid: obj.guid}, obj, null, null).exec(cb);
  }
  // Delete
  Delete(guid) {
    if (!guid) {
      return new Error('[Meta] Missing GUID to remove meta object' + obj) 
    }
    return MetaModel.findOneAndRemove({guid: guid}).exec();
  }
}

export default Meta;
