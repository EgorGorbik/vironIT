import * as mongoose from 'mongoose';

export const RaceSchema = new mongoose.Schema({
  title: String,
  description: String,
  tiem: String,
  userId: String,
  stageId: String,
});
