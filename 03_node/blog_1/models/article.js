const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now //or ()=>Date.now()
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
});

// код для генерации slug перед добавлением документа в коллекцию
articleSchema.pre('validate', function(next) {
  if (this.title) {
    this.slug = slugify(this.title, { 
      lower: true, 
      strict: true // removes invalid characters
    });
  }

  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown)); // конвертирует markdown в html и выполняет санизацию
  }

  next();
});

module.exports = mongoose.model('Article', articleSchema);
// thus, the database will have a table named Article