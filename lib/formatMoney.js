function formatMoney(amount) {
  var options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  };
  if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const intlFormatter = new Intl.NumberFormat('en-US', options);
  return intlFormatter.format(amount / 100);
}
export default formatMoney;
