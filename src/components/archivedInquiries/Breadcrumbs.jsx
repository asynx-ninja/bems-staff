import React from 'react';

const Breadcrumb = () => {
  return (
    <nav className="flex ">
      <ol className="flex items-center space-x-2 text-gray-500 mt-[-1rem]">
        <li>
          <a href="/inquiries" className="text-gray-900 hover:underline">Inquiries</a>
        </li>
        <li>
          <span>/</span>
        </li>
        <li className="text-teal-600">Archived Inquiries</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
