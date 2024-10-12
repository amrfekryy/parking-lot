"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { DataTable } from "@/components/datatable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InputProps } from "@/components/ui/input";

interface Vehicle {
  parkingLot: number;
  plateNumber: string;
  timer: string;
}

const data: Vehicle[] = [
  {
    parkingLot: 1,
    plateNumber: "INV001",
    timer: "1:30",
  },
  {
    parkingLot: 1,
    plateNumber: "INV002",
    timer: "1:30",
  },
  {
    parkingLot: 1,
    plateNumber: "INV003",
    timer: "1:30",
  },
  {
    parkingLot: 1,
    plateNumber: "INV004",
    timer: "1:30",
  },
  {
    parkingLot: 1,
    plateNumber: "INV005",
    timer: "1:30",
  },
  {
    parkingLot: 1,
    plateNumber: "INV006",
    timer: "1:30",
  },
  {
    parkingLot: 1,
    plateNumber: "INV007",
    timer: "1:30",
  },
  {
    parkingLot: 1,
    plateNumber: "INV004",
    timer: "1:30",
  },
  {
    parkingLot: 1,
    plateNumber: "INV005",
    timer: "1:30",
  },
  {
    parkingLot: 1,
    plateNumber: "INV006",
    timer: "1:30",
  },
  {
    parkingLot: 1,
    plateNumber: "INV007",
    timer: "1:30",
  },
  {
    parkingLot: 1,
    plateNumber: "INV004",
    timer: "1:30",
  },
  {
    parkingLot: 1,
    plateNumber: "INV005",
    timer: "1:30",
  },
  {
    parkingLot: 1,
    plateNumber: "INV006",
    timer: "1:30",
  },
  {
    parkingLot: 1,
    plateNumber: "INV007",
    timer: "1:30",
  },
];

export const columns: ColumnDef<Vehicle>[] = [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    accessorKey: "parkingLot",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Parking Lot
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("parkingLot")}</div>,
  },
  {
    accessorKey: "plateNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Plate Number
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("plateNumber")}</div>,
  },
  {
    accessorKey: "timer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Timer
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("timer")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const vehicle = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(vehicle.plateNumber)}
            >
              Copy Plate Number
            </DropdownMenuItem>
            <DropdownMenuItem>Free Parking Lot</DropdownMenuItem>
            <DropdownMenuItem>Reset Timer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function VehiclesTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const SearchProps: InputProps = {
    value: (table.getColumn("plateNumber")?.getFilterValue() as string) ?? "",
    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      table.getColumn("plateNumber")?.setFilterValue(event.target.value),
    className: "max-w-sm",
    placeholder: "Search By Plate Number",
  };

  return <DataTable table={table} SearchProps={SearchProps} />;
}
