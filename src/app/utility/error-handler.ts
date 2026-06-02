export function errorHandler(error: any) {
  const {
    data: { message },
  } = error;
  if (message && message.includes("duplicate")) {
    return "Duplicate entry found.";
  } else if (message.includes("foreign key")) {
    return "Cannot delete a parent row. Please delete the child rows first.";
  } else if (message.includes("unique")) {
    return "Entry with the same value exists. Please enter a unique value.";
  }
  return message || "Something went wrong.";
}
