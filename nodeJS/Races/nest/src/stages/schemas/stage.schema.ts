import * as mongoose from 'mongoose';

export const StageSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  leagueId: String,
});
