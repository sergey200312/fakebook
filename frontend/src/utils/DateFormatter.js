import moment from "moment";

export const formattedDate = (date) => {
    return moment(date).format('MMMM D, YYYY');
  };

export const formattedDatePost = (date) => {
  return moment(date).format('MMMM D,  YYYY HH:mm')
}