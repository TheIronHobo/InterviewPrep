const gaussian = (x, variance, center, scale = 1) => scale * (Math.E**((-1*((x-center)**2))/2*(variance*variance)));

module.exports = { gaussian };