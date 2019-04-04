const debug = require("debug")("mongo:model-user");
const mongo = require("mongoose");

const SECURITY_LEVELS = {
  MANAGER: "manager",
  WORKER: "worker",
  CUSTOMER: "customer",
  SUPPLIER: "supplier"
};

module.exports = db => {
  let schema = new mongo.Schema(
    {
      name: {
        type: String,
        required: true
      },
      securityLevel: {
        type: SECURITY_LEVELS,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      email: String,
      address: String,
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

  schema.statics.CREATE = async function(user) {
    return this.create({
      name: user[0],
      password: user[1],
      email: user[2],
      address: user[3],
      securityLevel: user[4]
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
      let cursor, user;
      try {
        cursor = await this.find(...args).cursor();
      } catch (err) {
        throw err;
      }

      try {
        while (null !== (user = await cursor.next())) {
          if (asynch) {
            try {
              await callback(user);
            } catch (err) {
              throw err;
            }
          } else {
            callback(user);
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

  schema.statics.UPDATE = async function(id, user) {
    return this.findByIdAndUpdate(id, user).exec();
  };

  schema.statics.DELETE = async function(id) {
    return this.findByIdAndRemove(id).exec();
  };

  db.model("User", schema); // if model name === collection name
  debug("User model created");
};
