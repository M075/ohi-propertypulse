import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const blogSchema = new Schema({
  title: String,
  slug: String,
});

const Blog = models.Blog || model('Blog', blogSchema);
export default Blog;