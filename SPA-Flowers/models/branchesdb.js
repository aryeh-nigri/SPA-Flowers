const debug = require("debug")("mongo:model-branches");
const mongo = require("mongoose");

// "isActive":"true",
//             "address":"Jerusalem",
//             "id":123

module.exports = db => {
  let schema = new mongo.Schema(
    {
      isActive: Boolean,
      address: {
        type: String,
        required: true
      },
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

  schema.statics.CREATE = async function(branch) {
    return this.create({
      isActive: branch[0],
      address: branch[1]
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
      let cursor, branch;
      try {
        cursor = await this.find(...args).cursor();
      } catch (err) {
        throw err;
      }

      try {
        while (null !== (branch = await cursor.next())) {
          if (asynch) {
            try {
              await callback(branch);
            } catch (err) {
              throw err;
            }
          } else {
            callback(branch);
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

  schema.statics.UPDATE = async function(id, branch) {
    return this.findByIdAndUpdate(id, branch).exec();
  };

  schema.statics.DELETE = async function(id) {
    return this.findByIdAndRemove(id).exec();
  };

  db.model("Branch", schema); // if model name === collection name
  debug("Branch model created");
};
