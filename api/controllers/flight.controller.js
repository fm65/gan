const models      = require('../models');
const Flight      = models.Flight;
const Op = models.Sequelize.Op;

// Create and Save a new Flight
exports.create = (req, res) => {
    /**
     * @param city
     * @param arrival
     * @param departureDate
     * @param arrivalDate
     * @returns {}
     */
    // Validate request
    if (!req.body.city && !req.body.arrival && !req.body.departureDate && !req.body.arrivalDate) {
        return res.status(400).json({ 
            status: "error", 
            message: "missing parameters" 
        });
    };

    // Create a Flight
    const flight = {
        city: req.body.city,
        arrival: req.body.arrival,
        departure: "Gan airport",
        departureDate: req.body.departureDate,
        arrivalDate: req.body.arrivalDate,
        published: req.body.published ? req.body.published : false
  };

    // Save Flight in the database
    Flight.create(flight)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ 
                status: "error", 
                message: "cannot add flight" 
        });
    });
};

// Retrieve all Flights from the database.
exports.findAll = (req, res) => {
    const city = req.query.city;
    var condition = city ? { city: { [Op.like]: `%${city}%` } } : null;

    Flight.findAll({ where: condition })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            return res.status(500).json({ 
                status: "error", 
                message: "cannot retrieve flights" 
        });
    });
};

// Find a single Flight with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Flight.findByPk(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            return res.status(500).json({ 
                status: "error", 
                message: `cannot retrieve flight with id=${id}` 
        });
    });
  
};

// Update a Flight by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Flight.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                return res.status(200).json({
                    status: "success",
                    message: "flight was updated successfully"
                });
            } else {
                return res.status(204).json({
                    status: "success",
                    message: `cannot update flight with id=${id}`
                });
            }
        })
        .catch(err => {
            return res.status(500).json({ 
                status: "error", 
                message: `cannot retrieve flight with id=${id}`
            });
        });
};

// Delete a Flight with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Flight.destroy({
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            return res.status(200).json({
                status: "success",
                message: "flight was deleted successfully"
            });
        } else {
            return res.status(204).json({
                status: "success",
                message: `cannot delete flight with id=${id}`
            });
        }
    })
    .catch(err => {
        return res.status(500).json({ 
            status: "error", 
            message: `could not delete flight with id=${id}`
        });
    });
};

// Delete all Flights from the database.
exports.deleteAll = (req, res) => {
    Flight.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        return res.status(200).json({
            status: "success",
            message: `${nums} flights were deleted successfully`
        });
    })
    .catch(err => {
        return res.status(500).json({ 
            status: "error", 
            message: "cannot remove all flights"
        });
    });
};

// Find all published Flights
exports.findAllPublished = (req, res) => {
    Flight.findAll({ 
        where: { published: true } 
    })
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        return res.status(500).json({ 
            status: "error", 
            message: "cannot retrieve flights"
        });
    });
};
