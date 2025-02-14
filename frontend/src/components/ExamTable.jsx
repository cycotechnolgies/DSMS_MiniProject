import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const ExamTable = ({ Exams }) => {
  const [examResults, setExamResults] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  // Load results from localStorage on component mount
  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem("examResults")) || [];
    setExamResults(savedResults);
  }, []);

  // Handle delete exam result
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    const updatedResults = examResults.filter((exam) => exam.id !== id);
    setExamResults(updatedResults);
    localStorage.setItem("examResults", JSON.stringify(updatedResults));
  };

  // Handle view progress
  const handleViewProgress = (progress) => {
    console.log("Progress Data:", progress); // Debugging
    alert(JSON.stringify(progress, null, 2)); // Display progress in an alert (for testing)
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">ID</span>,
    }),
    columnHelper.accessor("type", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Type</span>,
    }),
    columnHelper.accessor("score", {
      cell: (info) => `${info.getValue()} / 100`,
      header: () => <span className="flex items-center">Score</span>,
    }),
    columnHelper.accessor("correctAnswers", {
      cell: (info) => `${info.getValue()} / 10`,
      header: () => <span className="flex items-center">Correct Answers</span>,
    }),
    columnHelper.accessor("exam_date", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Date</span>,
    }),
    columnHelper.accessor("time", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Time</span>,
    }),
    columnHelper.display({
      id: "actions",
      header: () => <span className="flex items-center">Actions</span>,
      cell: ({ row }) => (
        <div className="flex space-x-2 justify-start">
          {/* View Progress Button */}
          <button
            onClick={() => handleViewProgress(row.original.progress)}
            className="text-blue-500 hover:text-blue-700"
            aria-label="View Progress"
          >
            <Eye className="w-5 h-5" />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(row.original.id)}
            className="text-red-500 hover:text-red-700"
            aria-label="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: [...Exams, ...examResults],
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 5 },
    },
  });

  return (
    <>
      {/* Search Bar */}
      <div className="flex justify-end items-center gap-2">
        <Search />
        <input
          type="text"
          className="bg-white border border-gray-400 rounded-lg my-4 mx-4 w-1/2 p-2"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search Exams"
        />
      </div>

      {/* DataTable */}
      <div className="overflow-x-auto bg-white shadow-md rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider"
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
                      {header.column.getCanSort() && (
                        <ArrowUpDown className="w-4 h-4" />
                      )}
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
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
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
      <div className="py-4 px-2 bg-gray-200 flex md:flex-row flex-col justify-between items-center gap-4">
        <div>
          <span>Items Per Page</span>
          <select
            name="ipp"
            className="bg-gray-200 rounded-lg mx-2"
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
          {/* First Page */}
          <button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </button>
          {/* Previous Page */}
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </button>
          {/* Page Navigation */}
          <span>
            <input
              min={1}
              max={table.getPageCount()}
              className="bg-gray-200 rounded-lg mx-2 border border-gray-600 px-2"
              type="number"
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
            />
            <span>of {table.getPageCount()}</span>
          </span>
          {/* Next Page */}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </button>
          {/* Last Page */}
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

export default ExamTable;