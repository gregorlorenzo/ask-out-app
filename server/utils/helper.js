const paginateResults = async (model, query = {}, page = 1, limit = 10, select = '', populate = null) => {
    const startIndex = (page - 1) * limit;

    let results = model.find(query);

    if (select) {
        results = results.select(select);
    }

    if (populate) {
        results = results.populate(populate);
    }

    const data = await results.skip(startIndex).limit(limit);
    const total = await model.countDocuments(query);

    return {
        data,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total
    };
};

module.exports = { paginateResults };