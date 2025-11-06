import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists!'],
      required: [true, 'Email is required!'],
    },
    storename: {
      type: String,
      required: [true, 'A name for your store is required!'],
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
      default: 'South Africa',
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    about: {
      type: String,
      maxLength: [500, 'About section cannot be more than 500 characters'],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model('User', UserSchema);

export default User;