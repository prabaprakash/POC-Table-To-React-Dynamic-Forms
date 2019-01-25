const _ = require('lodash');

export const formMetaData = (schema) => {
    console.log(schema);
    const typeMapping = {
        'decimal': 'MuNumberInput',
        'int': 'MuNumberInput',
        'datetime': 'MuDateTimeInput',
        'varchar': 'MuTextInput'
    }

    let metaData = {};
    _.each(schema, (column) => {
        const meta = {
            type: typeMapping[column.Type.split('(')[0]],
            label: column.Field,
            placeholder: '',
            className: 'fields'
        }
        metaData[column.Field] = meta;
    });

    const fields = _.map(schema, (column) => ({ id: column.Field }));
    return { fields, metaData }
}