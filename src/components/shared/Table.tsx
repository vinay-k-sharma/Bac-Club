  'use client'
  import { FaAngleDoubleLeft } from "react-icons/fa";
  import { FaAngleDoubleRight } from "react-icons/fa";
  import { FaAngleLeft } from "react-icons/fa";
  import { FaAngleRight } from "react-icons/fa";
  import React from 'react'
  import { flexRender, getCoreRowModel, getPaginationRowModel,getFilteredRowModel, useReactTable, ColumnDef } from '@tanstack/react-table'

  type TableProps<T extends object> = {
  data:T[],
  columns: ColumnDef<T>[]
  }

  const Table = <T extends object>({ columns, data }:TableProps<T>) => {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel()
    })

    return (
      <div className="p-4 bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => ( 
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-100">
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="">
        <button
            className="px-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <FaAngleDoubleLeft/>
          </button>
          <button
            className="px-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <FaAngleLeft/>
          </button>
          <span className="text-sm text-gray-700">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <button
            className="px-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <FaAngleRight/>
          </button>
          <button
            className="px-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
            onClick={() => table.lastPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <FaAngleDoubleRight/>
          </button>
        </div>
      </div>
    )
  }

  export default Table
