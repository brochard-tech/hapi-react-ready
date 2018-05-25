const Hapi = require("hapi"),
  util = require("util"),
  path = require("path"),
  Bell = require("bell"),
  Inert = require("inert"),
  Vision = require("vision"),
  Mongoose = require("mongoose"),
  Cookie = require("hapi-auth-cookie");

const parameters = require("./parameters"),
  routes = require("./routes"),
  utils = require("./utils");

const server = Hapi.Server({
  ...parameters.server,
  routes: {
    files: {
      relativeTo: path.join(__dirname, "..", "public")
    }
  }
});

async function start() {
  try {
    await server.register([
      Cookie,
      Vision,
      Inert,
      Bell
    ]);
  } catch (e) {
    utils.log(e, "error");
    process.exit(1);
  }

  Mongoose.Promise = global.Promise;
  Mongoose.connect(`mongodb://${process.env.NODE_ENV === "development"
    ? parameters.database.hostDev
    : parameters.database.host}:${parameters.database.port}/${parameters.database.name}`);

  Mongoose.connection.on("error", (err) => {
    utils.log(err, "error");
    throw err;
  });

  server.events.on("request", (request, event, tags) => {
    if (tags.error) {
      utils.log({
        message: event.error.message,
        output: util.inspect(event.error.output, false, null)
      }, "error");
    }
  });

  server.route(routes);
  await server.start();
  utils.log(`Server starting at: ${server.info.uri}`, "info");
}

start();

module.exports = server;
