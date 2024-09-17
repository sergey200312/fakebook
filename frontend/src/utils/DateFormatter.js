import moment from "moment";

export const formattedDate = (date) => {
    return moment(date).format('MMMM D, YYYY [at] h:mm A');
  };