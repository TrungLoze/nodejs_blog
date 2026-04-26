const mongoose = require('mongoose');
const slugify = require('slugify');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema({
  name: { type: String, require: true },
  description: { type: String },
  image: { type: String },
  slug: { type: String, slug: 'name', unique: true },
  videoId: { type: String, require: true },
  level: { type: String },
}, {
  timestamps: true,
});

Course.plugin(mongooseDelete, { 
  overrideMethods: 'all',
  deletedAt : true 
})

Course.pre('save', function(next) {
  if (this.name) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
  next();
});

module.exports = mongoose.model('Course', Course);
