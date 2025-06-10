'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages?: number; // optional if unknown
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (!totalPages || currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div
      className={`flex justify-center items-center space-x-4 mt-4 ${className}`}
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
        aria-label="Previous Page"
      >
        Prev
      </button>

      <span className="text-sm dark:text-gray-300" aria-live="polite">
        Page {currentPage}
        {totalPages ? ` of ${totalPages}` : ''}
      </span>

      <button
        onClick={handleNext}
        disabled={totalPages ? currentPage === totalPages : false}
        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
        aria-label="Next Page"
      >
        Next
      </button>
    </div>
  );
}
