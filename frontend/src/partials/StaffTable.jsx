import React from "react";
//used tanstack table library for make tables - Commented by CYCO
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

//used lucid-react icons as Icon library - Commented by CYCO
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

const StaffTable = ({ Staffs, onEdit, onDelete }) => {
  //fuction given by tanstack table to create columns in table - Commented by CYCO
  const columnHelper = createColumnHelper();

  //column accessors - Commented by CYCO
  const columns = [
    //write accesor for each column you need to display on table - Commented by CYCO
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">ID</span>,
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Name</span>,
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Email</span>,
    }),
    //action buttons ( this is a default column for this table dont change it) - Commented by CYCO
    columnHelper.display({
      id: "actions",
      header: () => <span className="flex items-center">Actions</span>,
      cell: ({ row }) => (
        <div className="flex space-x-2 justify-start">
          <button
            onClick={() => onView(row.original)}
            className="text-blue-500 hover:text-blue-700"
            aria-label="View"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => onEdit(row.index)}
            className="text-blue-500 hover:text-blue-700"
            aria-label="Edit"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(row.index)}
            className="text-red-500 hover:text-red-700"
            aria-label="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ),
    }),
  ];

  //States - Commented by CYCO
  const [sorting, setSorting] = React.useState();
  const [globalFilter, setGlobalFilter] = React.useState();

  //table model - Commented by CYCO
  const table = useReactTable({
    data: Staffs, //StaffTable is the data set pass from StaffTable page - Commented by CYCO
    columns,
    getCoreRowModel: getCoreRowModel(),

    initialState: {
      pagination: { pageSize: 5 }, // Set initial page size
    },

    state: {
      sorting,
      globalFilter,
    },

    //sorting - Commented by CYCO
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    //filtering - Commented by CYCO
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {/* searchBar */}
      <div className="flex md:flex-row flex-col-reverse justify-end items-end md:justify-between  md:items-center gap-4 mb-4">
        <div className="flex md:justify-start justify-end items-center md:gap-2 md:mx-4">
          <Search />
          <input
            type="text"
            className="bg-white border dark:border-gray-200 border-gray-400 rounded-lg dark:bg-gray-900 md:my-4 md:mx-4 "
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search Staff"
          />
        </div>
        <Link
          to="/staff/enroll"
          className="bg-green-600 px-4 py-2 text-white font-semibold md:mx-4 rounded-lg"
        >
          Add Staff
        </Link>
      </div>
      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-md rounded-md">
        {/* DataTable */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200 dark:bg-gray-600">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider dark:bg-gray-600 dark:text-white"
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex item-center gap-2"
                          : "flex item-center gap-2",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:bg-gray-800 dark:text-white"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr className="border border-white mt-4 " />
      {/* Pagination */}
      <div className="py-4 px-2 bg-gray-200 dark:bg-gray-900 flex md:flex-row flex-col justify-between items-center gap-4">
        <div>
          <span>Items Per Page</span>
          <select
            name="ipp"
            className="bg-gray-200 dark:bg-gray-900 rounded-lg mx-2"
            id=""
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-around items-center">
          {/* first page */}
          <button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </button>
          {/* forward pages */}
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </button>
          {/* pages */}
          <span>
            <input
              min={1}
              max={table.getPageCount()}
              className="bg-gray-200 dark:bg-gray-900 rounded-lg mx-2"
              type="number"
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
            />
            <span>of {table.getPageCount()}</span>
          </span>
          {/* Backword pages */}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </button>
          {/* Last page */}
          <button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default StaffTable;
