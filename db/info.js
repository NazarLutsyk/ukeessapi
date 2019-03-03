const info = {
    departments: {
        name: 'departments',
        foreignKeys: {
            employees: {
                table: 'employees',
                from: 'dpId',
                to: 'empDpID'
            }
        }
    },
    employees: {
        name: 'employees',
        foreignKeys: {
            departments: {
                table: 'departments',
                from: 'empDpID',
                to: 'dpId'
            }
        }
    },
    users: {
        name: 'users',
        foreignKeys: {}
    }
};

function getForeignKeys(tableName) {
    const res = [];
    let tables = Object.values(info);
    for (const table of tables) {
        if (table.name === tableName) {
            let foreignKeys = Object.values(table.foreignKeys);
            for (const foreignKey of foreignKeys) {
                res.push(foreignKey.from);
            }
        }
    }
    return res;
}

function hasForeignKey(tableName, foreignKey) {
    let tables = Object.values(info);
    for (const table of tables) {
        if (table.name === tableName) {
            return getForeignKeys(tableName).indexOf(foreignKey) > -1;
        }
    }
    return false;
}

module.exports = {info, getForeignKeys, hasForeignKey};
