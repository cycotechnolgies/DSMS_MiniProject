import React, { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
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

const StaffTable = ({ Staffs, onEdit, onDelete, onView }) => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">ID</span>,
    }),
    columnHelper.accessor("name", {
      cell: (info) => (
        <button onClick={() => onView(info.row.original)} className="text-blue-500">
          {info.getValue()}
        </button>
      ),
      header: () => <span className="flex items-center">Name</span>,
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Email</span>,
    }),
    columnHelper.accessor("phone", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Phone</span>,
    }),
    columnHelper.accessor("age", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Age</span>,
    }),
    columnHelper.accessor("address", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Address</span>,
    }),
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

  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const table = useReactTable({
    data: Staffs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 2 },
    },
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });

  const handleModalToggle = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-md rounded-md">
        {/* Search Bar */}
        <div className="flex justify-end items-center gap-2 bg-gray-200 dark:bg-gray-900">
          <Search />
          <input
            type="text"
            className="bg-white border dark:border-gray-200 border-gray-400 rounded-lg dark:bg-gray-900 my-4 mx-4 w-3/4"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search Staffs"
          />
        </div>

        {/* Data Table */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-gray-600">
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
                      {flexRender(header.column.columnDef.header, header.getContext())}
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

      <hr className="border border-white mt-4" />

      {/* Pagination */}
      <div className="py-4 px-2 bg-gray-200 dark:bg-gray-900 flex md:flex-row flex-col justify-between items-center gap-4">
        <div>
          <span>Items Per Page</span>
          <select
            name="ipp"
            className="bg-gray-200 dark:bg-gray-900 rounded-lg mx-2"
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20, 30].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-around items-center">
          <button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </button>
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
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </button>
          <button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 rounded-md w-[80%] md:w-[50%] p-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Staff Details</h2>
            {/* Place the form or content for the popup here */}
            <button onClick={handleModalToggle} className="text-red-500">Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default StaffTable;
