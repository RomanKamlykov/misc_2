class Lodash {
    /**
     * @param {array} array
     * @returns {array}
     */
    compact(array) {
        return array.filter(el => el)
    }
    /**
     * @param {array} array
     * @param {any} prop
     * @returns {object}
     */
    groupBy(array, prop) {
        return array.reduce((acc, i) => {
            const key = typeof prop === 'function' ? prop(i) : i[prop]
            if(!acc[key]) acc[key] = []
            acc[key].push(i)
            return acc
        }, {})
    }
}

module.exports = {Lodash}