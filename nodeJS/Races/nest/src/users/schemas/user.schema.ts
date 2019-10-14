import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  username: String,
});
