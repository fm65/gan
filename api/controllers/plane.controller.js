const models = require('../models');
const Plane = models.Plane;


// Create a new plane
exports.create = (req, res) => {
    /**
     * @param name
     * @param place
     * @returns {}
     */
    // Validate request
    if (!req.body.name && !req.body.place) {
        return res.status(400).json({
            status: "error",
            message: "missing parameters"
        });
    };

    // Create a plane
    const plane = {
        name: req.body.name,
        place: req.body.place
    };

    // Save the plane in the database
    Plane.create(plane)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                status: "error",
                message: "cannot add plane"
            });
        });
};

// Get all planes from the database.
exports.findAll = (req, res) => {
    Plane.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            return res.status(500).json({
                status: "error",
                message: "cannot retrieve planes"
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
                message: `cannot retrieve the plane with id=${id}`
            });
        });
};

// Update a plane by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Plane.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                return res.status(200).json({
                    status: "success",
                    message: "plane was updated successfully"
                });
            } else {
                return res.status(204).json({
                    status: "success",
                    message: `cannot update plane with id=${id}`
                });
            }
        })
        .catch(err => {
            return res.status(500).json({
                status: "error",
                message: `cannot retrieve plane with id=${id}`
            });
        });
};

// Delete a plane with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Plane.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                return res.status(200).json({
                    status: "success",
                    message: "Plane was deleted successfully"
                });
            } else {
                return res.status(204).json({
                    status: "success",
                    message: `cannot delete plane with id=${id}`
                });
            }
        })
        .catch(err => {
            return res.status(500).json({
                status: "error",
                message: `could not delete plane with id=${id}`
            });
        });
};

