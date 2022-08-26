import mongoose from 'mongoose';

export const WorkspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  slag: {
    type: String,
    required: true,
  },
  channelIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

WorkspaceSchema.virtual('channels', {
  ref: 'Channel',
  localField: 'channelIds',
  foreignField: '_id',
});
