let DBInfo = require('../db/info');

const helper = {};

helper.getJoin = (pool, type = 'join', tbl1, tbl2, f1, f2) => {
    if (pool
        && typeof type === 'string'
        && typeof tbl1 === 'string'
        && typeof tbl2 === 'string'
        && typeof f1 === 'string'
        && typeof f2 === 'string'
    ) {
        // tbl1 = pool.escape(tbl1);
        // tbl2 = pool.escape(tbl2);
        // f1 = pool.escape(f1);
        // f2 = pool.escape(f2);
        return ` ${type} ${tbl2} on ${tbl1}.${f1} = ${tbl2}.${f2}`;
    }
    return '';
};

helper.getIncludes = function (pool, target, include) {
    let joins = '';
    if (include && include.length > 0 && pool && typeof target === 'string') {
        for (const inc of include) {
            let join = helper.getJoin(
                pool,
                'left join',
                target,
                inc,
                DBInfo.info[target].foreignKeys[inc].from,
                DBInfo.info[target].foreignKeys[inc].to);
            joins += ` ${join}`;
        }
    }
    return joins;
};

module.exports = helper;
