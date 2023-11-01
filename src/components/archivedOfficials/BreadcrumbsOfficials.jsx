import React from 'react';

const BreadcrumbsOfficials = () => {
  return (
    <nav className="flex ">
      <ol className="flex items-center space-x-2 text-gray-500 mt-[-1rem]">
        <li>
          <a href="/officials" className="text-xs md:text-md text-gray-900 hover:underline">BARANGAY OFFICIALS</a>
        </li>
        <li>
          <span>/</span>
        </li>
        <li className="text-xs md:text-md text-teal-600">ARCHIVED OFFICIALS</li>
      </ol>
    </nav>
  );
};

export default BreadcrumbsOfficials;
