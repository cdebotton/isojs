function timestampsPlugin(schema, options) {
  schema.add({
    createdAt: { type: Date },
    updatedAt: { type: Date }
  });

  schema.pre('save', function(next) {
    if (! this.createdAt) {
      this.createdAt = new Date;
    }

    this.updatedAt = new Date;

    next();
  });

  if (options && options.index) {
    schema.path('createdAt').index(options.index);
    schema.path('updatedAt').index(options.index);
  }
};

module.exports = timestampsPlugin;
