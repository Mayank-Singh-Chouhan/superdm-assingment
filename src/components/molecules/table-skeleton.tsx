import React from 'react'

const TableSkeleton = () => {
  return (
    <table className="min-w-full">
        <thead className="sticky backdrop-blur-md bg-fs-border top-0 z-50">
          <tr>
            {[...Array(6)].map((_, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-4 text-left text-[14px] font-medium text-white whitespace-nowrap tracking-wider"
              >
                <span className='inline-block h-2 bg-fs-border rounded-2xl w-full'></span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-fs-border">
          {[...Array(20)].map((_, index) => (
            <tr
              key={index}
              role='button'
            >
              {[...Array(6)].map((_, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-white text-[14px] font-normal"
                >
                  <span className='inline-block h-2 bg-fs-border rounded-2xl min-w-14 w-full'></span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
  )
}

export default TableSkeleton