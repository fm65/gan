const flightController = require('../controllers').flightController;

module.exports = function(app) {

	// Create a new Flight
    app.post('/api/v1/flights', flightController.create);

    // Retrieve all Flights
    app.get('/api/v1/flights', flightController.findAll);

    // Retrieve all published Flights
    app.get('/api/v1/flights/published', flightController.findAllPublished);

    // Retrieve a single Flight with id
    app.get('/api/v1/flights/:id', flightController.findOne);

    // Update a Flight with id
    app.put('/api/v1/flights/:id', flightController.update);

    // Delete a Flight with id
    app.delete('/api/v1/flights/:id', flightController.delete);

    // Delete all Flights
    app.delete('/api/v1/flights', flightController.deleteAll);

};
