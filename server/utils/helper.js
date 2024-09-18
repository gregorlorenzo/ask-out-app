const paginateResults = async (model, query = {}, page = 1, limit = 10, select = '', populate = null, sort = null) => {
    const startIndex = (page - 1) * limit;

    let results = model.find(query);

    if (select) {
        results = results.select(select);
    }

    if (populate) {
        results = results.populate(populate);
    }

    if (sort) {
        results = results.sort(sort);
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

const reorderSlides = async (model, slideshowId) => {
    const slideshow = await model.findById(slideshowId);
    if (!slideshow) {
        throw new Error('Slideshow not found');
    }

    if (!slideshow.slides || !Array.isArray(slideshow.slides)) {
        throw new Error('Slideshow does not have a valid slides array');
    }

    slideshow.slides = slideshow.slides
        .sort((a, b) => a.position - b.position)
        .map((slide, index) => ({
            ...slide,
            position: index + 1
        }));

    await slideshow.save();
    return slideshow;
};

module.exports = { paginateResults, reorderSlides };