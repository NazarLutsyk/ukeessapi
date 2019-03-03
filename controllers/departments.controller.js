const ControllerError = require('../errors/ControllerError');
const DepartmentsService = require('../db/services').departments;

const controller = {};

controller.findById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return next(new ControllerError('Missed id', 400, 'Department[findById]'));
        }
        const department = await DepartmentsService.findById(id);
        return res.json(department);
    } catch (e) {
        return next(new ControllerError(e.message, e.status, 'Department[findById]'));
    }
};

controller.find = async (req, res, next) => {
    try {
        const departments = await DepartmentsService.find({
            skip: req.query.skip,
            limit: req.query.limit,
        });
        const count = await DepartmentsService.count();
        return res.json({models: departments, count});
    } catch (e) {
        return next(new ControllerError(e.message, e.status, 'Department[find]'));
    }
};

controller.create = async (req, res, next) => {
    try {
        const department = await DepartmentsService.create(req.body);
        return res.status(201).json(department);
    } catch (e) {
        return next(new ControllerError(e.message, e.status, 'Department[create]'));
    }
};

controller.updateById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        if (!id || !body || Object.keys(body).length === 0) {
            return next(new ControllerError('Missed id or body', 400, 'Department[updateById]'));
        }
        const updatedDepartment = await DepartmentsService.updateById(id, body);
        return res.json(updatedDepartment);
    } catch (e) {
        return next(new ControllerError(e.message, e.status, 'Department[updateById]'));
    }
};

controller.deleteById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return next(new ControllerError('Missed id', 400, 'Department[deleteById]'));
        }
        await DepartmentsService.deleteById(id);
        return res.status(204).json({});
    } catch (e) {
        return next(new ControllerError(e.message, e.status, 'Department[deleteById]'));
    }
};

module.exports = controller;
