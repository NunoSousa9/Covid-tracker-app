export const formatNumberWithSpaces = (number) => {
    if (number || number === 0) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    } else {
      return "Data not available";
    }
  };