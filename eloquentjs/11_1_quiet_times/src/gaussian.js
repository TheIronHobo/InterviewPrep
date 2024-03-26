function gaussian(x, variance, center, scale = 1) {
    const exponent = (x - center) ** 2 / -2 * variance * variance;
    return scale * Math.E ** exponent;
};

module.exports = { gaussian };
