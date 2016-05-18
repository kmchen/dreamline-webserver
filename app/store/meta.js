import uuid  from 'uuid';
import mongoose from 'mongoose';

import {MetaModel, MetaSchema} from '../models/metaSchema';

class Meta {
  new(data = {}, type = "", invType = "") {
    return new MetaModel({
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
  Set(metaObj, cb) {
    if (!metaObj) {
      return new Error('[Meta] Missing obj to set meta object' + metaObj), null 
    }
    return metaObj.save(cb);
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
