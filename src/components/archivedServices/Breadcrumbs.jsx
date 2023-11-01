import React from 'react';

const Breadcrumbs = () => {
  return (
    <nav className="flex ">
      <ol className="flex items-center space-x-2 text-gray-500 mt-[-1rem]">
        <li>
          <a href="/services" className="text-gray-900 hover:underline">SERVICES</a>
        </li>
        <li>
          <span>/</span>
        </li>
        <li className="text-teal-600">ARCHIVED SERVICES</li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
