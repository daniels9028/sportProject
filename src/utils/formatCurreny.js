export const formatCurreny = (price) => {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 2,
  }).format(price);
};
