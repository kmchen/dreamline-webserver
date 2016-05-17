import uuid  from 'uuid';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import {MetaModel, MetaSchema} from '../models/metaSchema';

function Meta(data = {}, type = "", invType = ""){
  this.metaData = new MetaModel({
    guid: uuid.v1(),
    data: data,
    type: type,
    invType: invType
  });
}

// Get
Meta.prototype.get = (guid, cb) => {
  if (guid) {
    console.error('Missing GUId');
    return;
  }
  return MetaModel.find({guid:guid}).exec(cb);
}

// Set
Meta.prototype.set = function(cb){
  return this.metaData.save(cb);
}

export default Meta;
// Invalidate
//import mongoose from 'mongoose';
//var child = new Schema({ name: String });
//var schema = new Schema({ name: String, age: Number, children: [child] });
//var Tree = mongoose.model('SomeTree', schema);
