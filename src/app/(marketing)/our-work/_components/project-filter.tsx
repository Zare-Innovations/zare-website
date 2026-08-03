import { Select } from "@mantine/core";
import React from "react";

export default function Projectfilter({
  category,
  categories,
  selectCategory
}: {
  category: string | null;
  categories: string[];
  selectCategory: (loc: string | null) => void;
}) {
  return (
    <Select
      placeholder="Select Category"
      label="Filter by Catagory"
      data={categories}
      value={category}
      onChange={selectCategory}
      styles={{
        input: {
          backgroundColor: "#f8f8f8",
          color: "#000",
          padding: "18px 18px"
        }
      }}
      className="min-w-64 flex-1"
    />
  );
}
