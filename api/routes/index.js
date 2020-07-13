module.exports = function() {
	require('./auth.route')(...arguments);
	require('./user.route')(...arguments);
	require('./flight.route')(...arguments);
};
