module.exports = {
  truncate: (str, len) => {
    if (str.length > len && str.length > 0) {
      str = str.substring(0, len) + "...";
    }
    return str;
  },
};
