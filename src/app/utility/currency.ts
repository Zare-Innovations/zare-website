export function formatCurrency(
    value: string | number = 0,
    currency: string | undefined = 'ETB',
  ): string {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }

    const formatter = new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency:currency ?? 'ETB',
      minimumFractionDigits: 2
  });

  let formattedAmount = formatter.format(Math.abs(value)); 
  if (value < 0) {
      formattedAmount = `ETB -${formattedAmount.split("ETB")[1].trim()}`;
  }

  return formattedAmount;
  }