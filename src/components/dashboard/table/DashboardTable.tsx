import React from "react";

import { Transactions, ICashFlow } from "@/types/main";

import { getData } from "@/lib/getData";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { twMerge } from "tailwind-merge";
import DashboardDropdown from "./DashboardDropdown";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const DashboardTable = async ({
  className,
  containerClasses,
  src,
}: {
  className?: string;
  containerClasses?: string;
  src: Transactions;
}) => {
  let data = null;

  // Check src to determine which sheet to render in table
  if (src === Transactions.income) {
    data = (await getData(Transactions.income)) as ICashFlow;
  } else if (src === Transactions.expense) {
    data = (await getData(Transactions.expense)) as ICashFlow;
  }

  // Guard clause data to ensure data won't be null
  if (data === null) {
    return <></>;
  }

  return (
    <>
      <DashboardDropdown headers={Object.keys(data.values[0])} />
      {/* containerClass are classes applied to the parent/wrapper container of
      the table */}
      <Table
        containerClass={twMerge(
          "relative grow max-h-[75vh] overflow-auto max-w-[90vw] border rounded",
          containerClasses,
        )}
        className={twMerge("", className)}
      >
        <TableHeader className="sticky top-0  bg-background">
          <TableRow className="">
            <TableHead className="hover:cursor-pointer hover:bg-muted">
              <Trash2 />
            </TableHead>
            {Object.keys(data.values[0]).map((header, index, arr) => {
              // Base table header class
              let tableHeaderClasses = "";

              if (header === "id") {
                return;
              }

              // Last header
              if (index === 0) {
                tableHeaderClasses += "w-[130px]";
              }

              // Last header
              if (index === arr.length - 1) {
                tableHeaderClasses += "text-right";
              }

              return (
                <TableHead key={index} className={tableHeaderClasses}>
                  {header.toUpperCase()}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>

        <TableBody className="">
          {data.values.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="text-xm text-muted-foreground">
                {row.timestamp as string}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {row.date as string}
              </TableCell>
              <TableCell>{row.category.name}</TableCell>
              <TableCell className="">{row.description}</TableCell>
              <TableCell className="">{row.wallet.name}</TableCell>
              <TableCell className="whitespace-nowrap text-right font-semibold">
                {row.amount.toFixed(2)} PHP
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter className="sticky bottom-0 bg-muted">
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right" colSpan={2}>
              {data.total.toFixed(2)} PHP
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default DashboardTable;
