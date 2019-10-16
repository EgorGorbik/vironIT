import * as mongoose from 'mongoose';

export const RaceSchema = new mongoose.Schema({
  title: String,
  description: String,
  time: Number,
  userId: String,
  stageId: String,
});
