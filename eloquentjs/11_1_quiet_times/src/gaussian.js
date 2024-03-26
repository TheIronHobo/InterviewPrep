const gaussian = (x, variance, center, scale = 1) => scale * Math.E ** ((x - center) * (x - center) / -2 * variance * variance);

module.exports = { gaussian };
