module.exports = (req, res, next) => {
    try {
        let query = {};
        query.skip = req.query.skip ? +req.query.skip : null;
        query.limit = req.query.limit ? +req.query.limit : null;
        query.include = req.query.include ? JSON.parse(req.query.include).filter(s => s.length > 0) : [];
        req.query = {...req.query, ...query};
    } catch (e) {
        next(e);
    }
    next();
};
