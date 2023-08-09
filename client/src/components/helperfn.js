module.exports = {
  capitalize: (input) => {
    return input.split(' ').map(x => x[0].toUpperCase() + x.slice(1)).join(' ');
  },
  getAverageRating: (inputObj) => {
    let total = 0;
    let count = 0;
    for (let key in inputObj) {
      total += key * inputObj[key];
      count += inputObj[key];
    }
    if ((total === 0) || (count === 0)) {
      return 0;
    } else {
      return (total / count).toFixed(1);
    }
  },
  getRatingCount: (inputObj) => {
    let count = 0;
    for (let key in inputObj) {
      count += inputObj[key];
    }
    return count;
  },
  joinWithDash: (input) => {
    return input.split(' ').join('-');
  }
}