import { formatCurrency } from "./currency";

type Exchange = {
  id: string;
  currency: string;
  rate: number;
};

export function getSummary(
  items: Record<string, string>[],
  agencyFee: number,
  exchange?: Exchange
) {
  const itemsSubTotal = items
    ?.flat()
    .reduce(
      (acc: any, item: any) =>
        acc +
        parseFloat(item?.unitPrice) *
        parseFloat(item?.quantity) *
        (item?.days == 0 ? 1 : item?.days),
      0
    );
  const finalSubTotal = exchange
    ? itemsSubTotal / exchange?.rate
    : itemsSubTotal;

  const agencyFeeAmount = (finalSubTotal * agencyFee) / 100;
  const withAgencyFee = finalSubTotal + agencyFeeAmount;
  const taxAmount = (withAgencyFee * 15) / 100;
  const withTax = withAgencyFee + taxAmount;
  const total = withTax;

  const summary = [
    {
      id: "quotationSubTotal",
      key: "Sub Total",
      value: formatCurrency(finalSubTotal, exchange?.currency),
    },
    {
      id: "agencyFee",
      key: `Agency Fee Amount (${agencyFee}%)`,
      value: `${formatCurrency(agencyFeeAmount, exchange?.currency)}`,
    },
    {
      id: "taxRate",
      key: "Tax Rate",
      value: `15%`,
    },
    // {
    //   id: "vat",
    //   key: "Tax Amount",
    //   value: formatCurrency(taxAmount),
    // },
    {
      id: "total",
      key: "Total",
      value: formatCurrency(total, exchange?.currency),
    },
  ];

  return { summary };
}
export function getSummaryPurchaseOrder(
  items: Record<string, string>[],
  exchange?: Exchange
) {
  const itemsSubTotal = items
    ?.flat()
    .reduce(
      (acc: any, item: any) =>
        acc +
        parseFloat(item?.unitPrice) *
        parseFloat(item?.quantity) *
        (!item?.days || item?.days == 0 ? 1 : item?.days),
      0
    );
  const finalSubTotal = exchange
    ? itemsSubTotal / exchange?.rate
    : itemsSubTotal;

  const total = finalSubTotal + (finalSubTotal * 15) / 100;

  const summary = [
    {
      id: "quotationSubTotal",
      key: "Sub Total",
      value: formatCurrency(finalSubTotal, exchange?.currency),
    },

    {
      id: "taxRate",
      key: "Tax Rate",
      value: `15%`,
    },
    // {
    //   id: "vat",
    //   key: "Tax Amount",
    //   value: formatCurrency(taxAmount),
    // },
    {
      id: "total",
      key: "Total",
      value: formatCurrency(total, exchange?.currency),
    },
  ];

  return { summary };
}
