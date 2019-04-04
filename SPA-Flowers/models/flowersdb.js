const debug = require("debug")("mongo:model-user");
const mongo = require("mongoose");

module.exports = db => {
  let schema = new mongo.Schema(
    {
      name: {
        type: String,
        required: true
      },
      color: String,
      picture: String,
      price: Number,
      created_at: {
        type: Date,
        default: Date.now
      },
      updated_at: Date
    },
    {
      autoIndex: false
    }
  );

  schema.statics.CREATE = async function(flower) {
    return this.create({
      name: flower[0],
      color: flower[1],
      picture: flower[2],
      price: flower[3]
    });
  };

  // on every save, add the date
  schema.pre("save", function(next) {
    // change the updated_at field to current date
    this.updated_at = new Date();
    next();
  });

  schema.statics.REQUEST = async function() {
    // no arguments - bring all at once
    const args = Array.from(arguments);
    debug(args);
    if (arguments.length === 0) {
      debug("request: no arguments - bring all at once");
      return this.find({}).exec();
    }
    // perhaps last argument is a callback for every document
    let callback = arguments[arguments.length - 1];
    if (callback instanceof Function) {
      let asynch = callback.constructor.name === "AsyncFunction";
      args.pop();
      let cursor, flower;
      try {
        cursor = await this.find(...args).cursor();
      } catch (err) {
        throw err;
      }

      try {
        while (null !== (flower = await cursor.next())) {
          if (asynch) {
            try {
              await callback(flower);
            } catch (err) {
              throw err;
            }
          } else {
            callback(flower);
          }
        }
      } catch (err) {
        throw err;
      }
      return;
    }
    // request by id as a hexadecimal string
    if (args.length === 1 && typeof args === "string") {
      debug("request: by ID");
      return this.findById(args[0]).exec();
    }
    // There is no callback - bring requested at once
    debug(`request: without callback: ${JSON.stringify(args)}`);
    return this.find(...args).exec();
  };

  schema.statics.UPDATE = async function(id, flower) {
    return this.findByIdAndUpdate(id, flower).exec();
  };

  schema.statics.DELETE = async function(id) {
    return this.findByIdAndRemove(id).exec();
  };

  db.model("Flower", schema); // if model name === collection name
  debug("Flower model created");
};
