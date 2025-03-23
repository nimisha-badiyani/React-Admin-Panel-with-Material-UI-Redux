export const calculateTotals = (items) => {
  const subTotal = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const totalMargin = items.reduce(
    (acc, item) => acc + item.quantity * item.price * (item.margin / 100),
    0
  );
  const totalAmount = subTotal + totalMargin;

  return {
    subTotal: subTotal.toFixed(2),
    totalMargin: totalMargin.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
  };
};
