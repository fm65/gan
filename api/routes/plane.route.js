const planeController = require('../controllers').PlaneController;

module.exports = function(app) {

    // Create a new plane
    app.post('/api/v1/planes', planeController.create);

    // Retrieve all planes
    app.get('/api/v1/planes', planeController.findAll);

    // Retrieve a single plane with id
    app.get('/api/v1/planes/:id', planeController.findOne);

    // Update a plane with id
    app.put('/api/v1/planes/:id', planeController.update);

    // Delete a plane with id
    app.delete('/api/v1/planes/:id', planeController.delete);


};
