import React from 'react';

interface TableProps {
  headers: string[];
  rows: React.ReactNode[][];
  className?: string;
}

export default function Table({ headers, rows, className = '' }: TableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-6 py-4 text-sm text-gray-900">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}