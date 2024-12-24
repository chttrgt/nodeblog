const moment = require("moment");

const formatDate = (date, formattedDate) => {
  return moment(date).format(formattedDate);
};

module.exports = formatDate;
