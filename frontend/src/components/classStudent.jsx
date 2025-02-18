import React, {useState} from "react";
import { Link } from "react-router-dom";
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
  Edit,
  Eye,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

const ClassStuTable = ({ studentData, ScheduleId }) => {
  //fuction given by tanstack table to create columns in table - Commented by CYCO
  const columnHelper = createColumnHelper();
  const [students, setStudents] = useState(studentData);
  const scheduleId = ScheduleId

    const handleUpdate = async (stu_id) => {
			console.log("Updating studentID:", stu_id);

			// Generate options for the score selection (1-10)
			const scoreOptions = Array.from({ length: 10 }, (_, i) => i + 1)
				.map((num) => `<option value="${num}">${num}</option>`)
				.join("");

			// Show SweetAlert2 with a select dropdown
			const { value: newScore } = await Swal.fire({
				title: "Update Student Score",
				html: `
      <select id="scoreSelect" class="swal2-select">
        ${scoreOptions}
      </select>
    `,
				showCancelButton: true,
				confirmButtonText: "Update",
				cancelButtonText: "Cancel",
				preConfirm: () => {
					const selectedValue = document.getElementById("scoreSelect").value;
					return selectedValue ? Number(selectedValue) : null;
				},
			});

			if (newScore !== null) {
				try {
					const response = await axios.put(
						`http://localhost:4000/api/class/score/${scheduleId}/${stu_id}`,
						{
							score: newScore,
						},
					);

					console.log("API Response:", response.data);

					// Check if the API response indicates success
					if (response.data?.success) {
						Swal.fire({
							icon: "success",
							title: "Score Updated",
							text: `Student's score has been updated to ${newScore}`,
							confirmButtonText: "OK",
						}).then(() => {
							window.location.reload();
						});
					} else {
						Swal.fire({
							icon: "error",
							title: "Update Failed",
							text: response.data.message || "Failed to update score.",
						}).then(() => {
							window.location.reload();
						});
					}
				} catch (error) {
					console.error("Error updating score:", error);
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "An error occurred while updating the score.",
					}).then(() => {
						window.location.reload();
					});
				}
			}
		};



  //column accessors - Commented by CYCO
  const columns = [
		//write accesor for each column you need to display on table - Commented by CYCO
		columnHelper.accessor("uid", {
			cell: (info) => info.getValue(),
			header: () => <span className='flex items-center'>ID</span>,
		}),
		columnHelper.accessor("name", {
			cell: (info) => info.getValue(),
			header: () => <span className='flex items-center'>Name</span>,
		}),
		columnHelper.accessor("score", {
			cell: (info) => info.getValue(),
			header: () => <span className='flex items-center'>Score</span>,
		}),
		columnHelper.display({
			id: "actions",
			header: () => <span className='flex items-center'>Actions</span>,
			cell: ({ row }) => (
				<div className='flex space-x-2 justify-start'>
					<button
						onClick={() => handleUpdate(row.original.id)}
						className='text-green-500 hover:text-green-700'
						aria-label='Delete'>
						<Edit  className='w-5 h-5' />
					</button>
				</div>
			),
		}),
	];

  if (!studentData || studentData.length === 0) {
    return <div>No studentData available</div>;
  }

  //States - Commented by CYCO
  const [sorting, setSorting] = React.useState();
  const [globalFilter, setGlobalFilter] = React.useState();

  //table model - Commented by CYCO
  const table = useReactTable({
    data: studentData, //payment is the data set pass from payment page - Commented by CYCO
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
        <div className="flex justify-end items-center gap-2">
          <Search />
          <input
            type="text"
            className="bg-white border  border-gray-400 rounded-lg  my-4 mx-4 w-1/2 p-2"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search studentData"
          />
        </div>
      <div className="overflow-x-auto bg-white  shadow-md rounded-md">

        {/* DataTable */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider "
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
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 "
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
      <div className="py-4 px-2 bg-gray-200  flex md:flex-row flex-col justify-between items-center gap-4">
        <div>
          <span>Items Per Page</span>
          <select
            name="ipp"
            className="bg-gray-200  rounded-lg mx-2"
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

export default ClassStuTable;
