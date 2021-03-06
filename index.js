// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

const moment = require('moment-timezone');

const chrono              = require('chrono-node');
const TimezoneAbbrRefiner = require('./src/timezone-abbr-refiner.js');
const CityRefiner         = require ('./src/city-refiner.js');

var custom = new chrono.Chrono();
custom.refiners.push(TimezoneAbbrRefiner);
custom.refiners.push(CityRefiner);


fastify.register(require('fastify-cors'), {
  origin: (origin, cb) => {
   //if(/localhost/.test(origin)){
    //  Request from localhost will pass
    cb(null, true)
    return
  //}
  //cb(new Error("Not allowed"), false)
  }
});

// Declare a route
//
// this should accept a user tz as well to convert to
fastify.get('/', function (request, reply) {
  const parsedDate = custom.parse(request.query.date);

  // XXX: obviously temporary!
  if (!request.query.tz || !request.query.date) {
    return reply.send({ valid: false });
  }

  if (!parsedDate[0]) {
    return reply.send({ valid: false });
  }

  const dateObj    = parsedDate[0].start;
  const timezone = dateObj.get('timezone') || dateObj.get('timezoneAbbr');
  const date = moment(dateObj.date()).tz(timezone, true).tz('UTC');

  reply.send({
    utc_date: date,
    timezone: timezone,
    from_now: date.fromNow(),

    user_timezone: request.query.tz,
    input: request.query.date,

    valid: date.isValid(),
  });

})


const port = process.env.PORT || 3000;
const server = process.env.SERVER || '127.0.0.1';

// Run the server!
fastify.listen(port, server, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
