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
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const StaffTable = ({ Staffs }) => {
  // Make Staffs stateful
  const [staffs, setStaffs] = useState(Staffs);

  const columnHelper = createColumnHelper();

  // Handle Delete function
  const handleDelete = (del_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this staff member? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:4000/api/user/del-user/${del_id}`)
          .then(() => {
            setStaffs(staffs.filter((staff) => staff.id !== del_id)); // Update state
            Swal.fire(
              "Deleted!",
              "The staff member has been deleted.",
              "success"
            );
          })
          .catch(() =>
            Swal.fire("Error", "Failed to delete the staff member!", "error")
          );
      }
    });
  };

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Name</span>,
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Email</span>,
    }),
    columnHelper.accessor("nic", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">NIC No.</span>,
    }),
    columnHelper.accessor("contactNo", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Contact No</span>,
    }),
    columnHelper.display({
      id: "actions",
      header: () => <span className="flex items-center">Actions</span>,
      cell: ({ row }) => (
        <div className="flex space-x-2 justify-start">
          <Link
            to={`/view-staff/${row.original.id}`}
            className="text-blue-500 hover:text-blue-700"
            aria-label="View"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <Link
            to={`/edit-staff/${row.original.id}`}
            className="text-green-500 hover:text-green-700"
            aria-label="Edit"
          >
            <Pencil className="w-5 h-5" />
          </Link>
          <button
            onClick={() => handleDelete(row.original.id)} // Updated function call
            className="text-red-500 hover:text-red-700"
            aria-label="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ),
    }),
  ];

  const [sorting, setSorting] = useState();
  const [globalFilter, setGlobalFilter] = useState();

  const table = useReactTable({
    data: staffs, // Updated to use state
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      pagination: { pageSize: 5 },
    },
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {/* SearchBar */}
      <div className="flex md:flex-row flex-col-reverse justify-end items-end md:justify-between md:items-center gap-4 mb-4">
        <div className="flex md:justify-start justify-end items-center md:gap-2 md:mx-4">
          <Search />
          <input
            type="text"
            className="bg-white border dark:border-gray-200 border-gray-400 rounded-lg dark:bg-gray-900 md:my-4 md:mx-4"
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
      {/* DataTable */}
      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-md rounded-md">
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
                          ? "cursor-pointer select-none flex items-center gap-2"
                          : "flex items-center gap-2",
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
    </>
  );
};

export default StaffTable;
