import React from 'react'
import {AiFillEye} from 'react-icons/ai';

const SubPendingRequest = () => {
  return (
    <div className="relative w-full lg:w-6/12 flex flex-col overflow-y-auto h-full">
      <b className="border-solid border-0 border-black border-b-2 pb-2 uppercase font-heavy text-lg md:text-xl mb-4">
        PENDING REQUESTS
      </b>
      <div className="overflow-y-auto h-[300px] lg:h-[400px] xl:h-[400px] xxl:h-[400px] xxxl:h-[500px]">
        <table className="table-auto w-full h-full">
          <thead className="uppercase text-xs md:text-sm bg-gray-100 sticky top-0 ">
            <tr>
              <th className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                Name
              </th>
              <th className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                Service Type
              </th>
              <th className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                Requested Date
              </th>
              <th className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-center">
            {Array(20)
              .fill("")
              .map((item, idx) => (
                <tr className="even:bg-gray-100">
                  <td className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                    The Sliding Mr. Bones (Next Stop, Pottersville)
                  </td>
                  <td className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                    Malcolm Lockyer
                  </td>
                  <td className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                    1961
                  </td>
                  <td className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                    <button className="rounded-xl bg-[#295141] text-white p-2 text">
                      <AiFillEye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubPendingRequest