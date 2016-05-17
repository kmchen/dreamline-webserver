import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export let MetaSchema = new Schema({
  guid: String,
  data: Schema.Types.Mixed,
  type: String,
  invType: String
},{collection: 'meta'});

export let MetaModel = mongoose.model('meta', MetaSchema);
