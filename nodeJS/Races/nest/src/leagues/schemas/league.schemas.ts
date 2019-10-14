import * as mongoose from 'mongoose';

export const LeagueSchema = new mongoose.Schema({
  title: String,
  description: String,
  season: String,
  usersId: Array
});
