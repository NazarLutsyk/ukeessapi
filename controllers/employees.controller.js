let ControllerError = require('../errors/ControllerError');
let EmployeesService = require('../db/services').employees;

const controller = {};

controller.findById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return next(new ControllerError('Missed id', 400, 'Employee[findById]'));
        }
        const employee = await EmployeesService.findById(id, {
            include: req.query.include
        });
        return res.json(employee);
    } catch (e) {
        return next(new ControllerError(e.message, e.status, 'Employee[findById]'));
    }
};

controller.find = async (req, res, next) => {
    try {
        const employees = await EmployeesService.find({
            skip: req.query.skip,
            limit: req.query.limit,
            include: req.query.include,
            name: req.query.name
        });
        const count = await EmployeesService.count();
        return res.json({models: employees, count});
    } catch (e) {
        return next(new ControllerError(e.message, e.status, 'Employee[find]'));
    }
};

controller.create = async (req, res, next) => {
    try {
        const employee = await EmployeesService.create(req.body);
        return res.status(201).json(employee);
    } catch (e) {
        return next(new ControllerError(e.message, e.status, 'Employee[create]'));
    }
};

controller.updateById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        if (!id || !body || Object.keys(body).length === 0) {
            return next(new ControllerError('Missed id or body', 400, 'Employee[updateById]'));
        }
        const updatedEmployee = await EmployeesService.updateById(id, body);
        return res.json(updatedEmployee);
    } catch (e) {
        return next(new ControllerError(e.message, e.status, 'Employee[updateById]'));
    }
};

controller.deleteById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return next(new ControllerError('Missed id', 400, 'Employee[deleteById]'));
        }
        await EmployeesService.deleteById(id);
        return res.status(204).json({});
    } catch (e) {
        return next(new ControllerError(e.message, e.status, 'Employee[deleteById]'));
    }
};


module.exports = controller;
