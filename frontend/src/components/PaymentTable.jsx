import React,{useState} from "react";
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
  Eye,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

const PaymentTable = ({ Payments}) => {
  const [paymentData, setPaymentData] = useState(Payments); 
	//fuction given by tanstack table to create columns in table - Commented by CYCO
	const columnHelper = createColumnHelper();

	// Handle Delete function
	const handleDelete = (del_id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "Do you want to delete this payment? This action cannot be undone.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "Cancel",
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(`http://localhost:4000/api/pay/del-pay/${del_id}`)
					.then(() => {
						setPaymentData(
							paymentData.filter((payment) => payment.id !== del_id),
						);
						Swal.fire(
							"Deleted!",
							"The student has been deleted.",
							"success",
						).then(() => window.location.reload());
					})
					.catch(() =>
						Swal.fire("Error", "Failed to delete the student!", "error").then(() => window.location.reload()),
					);
			}
		});
	};

	//column accessors - Commented by CYCO
	const columns = [
		//write accesor for each column you need to display on table - Commented by CYCO
		columnHelper.accessor("pay_id", {
			cell: (info) => info.getValue(),
			header: () => <span className='flex items-center'>ID</span>,
		}),
		columnHelper.accessor("uid", {
			cell: (info) => info.getValue(),
			header: () => <span className='flex items-center'>Paid by</span>,
		}),
		columnHelper.accessor("amount", {
			cell: (info) => info.getValue(),
			header: () => <span className='flex items-center'>Amount(Rs.)</span>,
		}),
		columnHelper.accessor("status", {
			cell: (info) => info.getValue(),
			header: () => <span className='flex items-center'>Status</span>,
		}),
		columnHelper.display({
			id: "actions",
			header: () => <span className='flex items-center'>Actions</span>,
			cell: ({ row }) => (
				<div className='flex space-x-2 justify-start'>
					<Link
						to={`/pay/details/${row.original.id}`}
						className='text-blue-500 hover:text-blue-700'
						aria-label='View'>
						<Eye className='w-5 h-5' />
					</Link>
					<Link
						to={`/pay/${row.original.id}?role=branch`}
						className='text-green-500 hover:text-green-700'
						aria-label='Edit'>
						<Pencil className='w-5 h-5' />
					</Link>
					<button
						onClick={() => handleDelete(row.original.id)} // Updated function call
						className='text-red-500 hover:text-red-700'
						aria-label='Delete'>
						<Trash2 className='w-5 h-5' />
					</button>
				</div>
			),
		}),
	];

	if (!Payments || Payments.length === 0) {
		return <div>No payments available</div>;
	}

	//States - Commented by CYCO
	const [sorting, setSorting] = React.useState();
	const [globalFilter, setGlobalFilter] = React.useState();

	//table model - Commented by CYCO
	const table = useReactTable({
		data: Payments, //payment is the data set pass from payment page - Commented by CYCO
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
			<div className='flex justify-end items-center gap-2'>
				<Search />
				<input
					type='text'
					className='bg-white border  border-gray-400 rounded-lg  my-4 mx-4 w-1/2 p-2'
					value={globalFilter ?? ""}
					onChange={(e) => setGlobalFilter(e.target.value)}
					placeholder='Search payments'
				/>
			</div>
			<div className='overflow-x-auto bg-white  shadow-md rounded-md'>
				{/* DataTable */}
				<table className='min-w-full divide-y divide-gray-200'>
					<thead className='bg-gray-50 '>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className='px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider '>
										<div
											{...{
												className: header.column.getCanSort()
													? "cursor-pointer select-none flex item-center gap-2"
													: "flex item-center gap-2",
												onClick: header.column.getToggleSortingHandler(),
											}}>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
											<ArrowUpDown className='w-4 h-4' />
										</div>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 '>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<hr className='border border-white mt-4 ' />
			{/* Pagination */}
			<div className='py-4 px-2 bg-gray-200  flex md:flex-row flex-col justify-between items-center gap-4'>
				<div>
					<span>Items Per Page</span>
					<select
						name='ipp'
						className='bg-gray-200  rounded-lg mx-2'
						id=''
						value={table.getState().pagination.pageSize}
						onChange={(e) => {
							table.setPageSize(Number(e.target.value));
						}}>
						{[5, 10, 20, 30].map((pageSize) => (
							<option
								key={pageSize}
								value={pageSize}>
								{pageSize}
							</option>
						))}
					</select>
				</div>
				<div className='flex justify-around items-center'>
					{/* first page */}
					<button
						onClick={() => table.firstPage()}
						disabled={!table.getCanPreviousPage()}>
						<ChevronsLeft />
					</button>
					{/* forward pages */}
					<button
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}>
						<ChevronLeft />
					</button>
					{/* pages */}
					<span>
						<input
							min={1}
							max={table.getPageCount()}
							className='bg-gray-200 rounded-lg mx-2 border border-gray-600 px-2'
							type='number'
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
						disabled={!table.getCanNextPage()}>
						<ChevronRight />
					</button>
					{/* Last page */}
					<button
						onClick={() => table.lastPage()}
						disabled={!table.getCanNextPage()}>
						<ChevronsRight />
					</button>
				</div>
			</div>
		</>
	);
};

export default PaymentTable;
