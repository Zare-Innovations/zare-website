export function parseDate(date: Date | null) {
  const d = date ? new Date(date) : new Date();

  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}


export function nextYear(date: Date | null) {
  const d = date ? new Date(date) : new Date()

  return new Date(d.setFullYear(d.getFullYear() + 1));
}

export function previousYear(date: Date | null) {
  const d = date ? new Date(date) : new Date()

  return new Date(d.setFullYear(d.getFullYear() - 1));
}

export function nextMonth(date: Date | null) {
  const d = date ? new Date(date) : new Date()

  return new Date(d.setMonth(d.getMonth() + 1));
}

export function previousMonth(date: Date | null) {
  const d = date ? new Date(date) : new Date()

  return new Date(d.setMonth(d.getMonth() - 1));
}

export function isLeapYear(year: number) {
  if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
    return true
  }

  return false
}



export  function getUtcYearRange(localDate:Date) {
  const date = new Date(localDate);
  const year = date.getFullYear();
  const startOfYear = new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));
  const endOfYear = new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999));

  return {
    from: startOfYear.toISOString(),
    to: endOfYear.toISOString()
  };
}


export function getUtcMonthRange(localDate:Date) {
  const date = new Date(localDate);

 
  const year = date.getFullYear();
  const month = date.getMonth();


  const startOfMonth = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
  const endOfMonth = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));

  return {
  from: startOfMonth.toISOString(),
    to: endOfMonth.toISOString()
  };
}
export function getCurrentEthiopianYear() {
  const currentDate = new Date();
  const ethiopianYearEnd = new Date(currentDate.getFullYear(), 6, 7);

  if (currentDate >= ethiopianYearEnd) {
    return currentDate.getFullYear();
  } else {
    return currentDate.getFullYear() - 1;
  }
}

export function getEthiopianYearStartDate(year?: number) {
  if (!year) {
    year = getCurrentEthiopianYear()
  }

  // July 8th
  return new Date(year, 6, 8)
}

export function getEthiopianYearEndDate(year?: number) {
  if (!year) {
    year = getCurrentEthiopianYear()
  }

  // July 7th
  return new Date(year + 1, 6, 7)
}


const ethiopianMonthOrder = ['jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'jan', 'feb', 'mar', 'apr', 'may', 'jun',];

export function sortByEthiopianMonths(
  a: { month: string; },
  b: { month: string; }
) {
  const indexA = ethiopianMonthOrder.indexOf(a.month.toLowerCase())
  const indexB = ethiopianMonthOrder.indexOf(b.month.toLowerCase())

  // Put known months first
  if (indexA === -1 && indexB === -1) return 0; // Both unknown — stable
  if (indexA === -1) return 1;
  if (indexB === -1) return -1;

  // Both known — compare normally
  return indexA - indexB;
}