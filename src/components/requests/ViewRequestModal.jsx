import { useState, React, useRef } from "react";
// FORM DETAILS
import PersonalDetails from "./PersonalDetails";
import OtherDetails from "./OtherDetails";
import PrintForm from "./form/PrintForm";

import { jsPDF } from "jspdf";

function ViewRequestModal({ request }) {
  const [detail, setDetail] = useState(request);
  const [empty, setEmpty] = useState(false);
  const pdfRef = useRef(null);

  const returnFile = (string) => {
    for (const item of detail.file) {
      if (item.name.includes(string)) {
        return (
          <div className="block p-1 w-full h-24">
            <article
              tabIndex={0}
              className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline elative bg-gray-100 cursor-pointer relative shadow-sm"
            >
              <img
                alt="upload preview"
                className="img-preview hidden w-full h-full sticky object-cover rounded-md bg-fixed"
              />
              <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                <a
                  href={item.link}
                  target="_blank"
                  className="flex-1 group-hover:text-blue-800 line-clamp-1"
                >
                  {item.name}
                </a>
                <div className="flex">
                  <span className="p-1 text-blue-800">
                    <i>
                      <svg
                        className="fill-current w-4 h-4 ml-auto pt-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                      >
                        <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                      </svg>
                    </i>
                  </span>
                </div>
              </section>
            </article>
          </div>
        );
      }
    }

    return null;
  };

  // const generatePDF = async () => {
  //   try {
  //     const result = await pdf(<SampleDocument detail={detail} />).toBlob();
  //     saveAs(new File([result], "filename"), "NewFile.pdf");
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = pdfRef.current;

    const doc = new jsPDF();
    doc.html(content, {
      callback: function (doc) {
        doc.save("sample.pdf");
      },
      x: 0,
      y: 0,
      autoPaging: "text",
      margin: 20,
      width: 500,
      windowWidth: 595,
    });
  };

  return (
    <div>
      <div
        id="hs-view-request-modal"
        className="hs-overlay hidden fixed top-0 left-0 z-[80] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center "
      >
        {/* Modal */}
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 py-5 md:px-5 opacity-0 transition-all w-full h-auto">
          <div className="flex flex-col bg-white shadow-sm rounded-t-3xl rounded-b-3xl w-full h-full md:max-w-xl lg:max-w-2xl xxl:max-w-3xl mx-auto max-h-screen">
            {/* Header */}
            <div className="py-5 px-3 flex justify-between items-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#3e5fc2] to-[#1f2f5e] overflow-hidden rounded-t-2xl">
              <h3
                className="font-bold text-white mx-auto md:text-xl text-center"
                style={{ letterSpacing: "0.3em" }}
              >
                REQUEST SERVICE
              </h3>
            </div>

            {/* BODY */}
            <div className="scrollbarWidth scrollbarTrack scrollbarHover p-4 scrollbarThumb flex flex-col mx-auto w-full overflow-y-auto relative h-[470px]">
              <form className="space-y-4">
                {empty && (
                  <div
                    className="bg-red-50 border text-center border-red-200 text-sm text-red-600 rounded-md py-4 mt-2 mb-4"
                    role="alert"
                  >
                    Please fill out the required information!
                  </div>
                )}
                <div className="flex mx-5">
                  <div className="relative lg:w-4/12 flex m-auto justify-end items-center">
                    <img
                      id="formPicture"
                      src={detail.file[0].link}
                      className={`border-[#295141] w-[200px] border-[1px] h-[200px] sm:mb-3 lg:mb-0  object-cover`}
                    />
                  </div>
                </div>
                <PersonalDetails detail={detail} />
                <OtherDetails detail={detail} returnFile={returnFile} />
                <fieldset className="flex-col border-[1px] border-black rounded-md">
                  <legend className="ml-2 px-2 text-sm font-medium">
                    Other Requirements
                  </legend>
                  <div className="w-full px-6 py-3">
                    <label
                      for="message"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Purpose of this Request
                    </label>
                    <textarea
                      readOnly
                      defaultValue={detail.purpose}
                      id="message"
                      rows="4"
                      className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-gray-400 border focus:ring-green-500 focus:border-green-500"
                      placeholder="Write your thoughts here..."
                    ></textarea>
                  </div>
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-center items-start gap-3 px-6 pb-5">
                    <div>
                      <label
                        htmlFor="signature"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                      >
                        Signature of the Requester
                      </label>
                      {returnFile(
                        `${detail.form[0].lastName.value} - SIGNATURE`
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="signature"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                      >
                        Signature of the Guardian
                      </label>
                      {returnFile(
                        `${detail.form[0].lastName.value} - SIGNATURE GUARDIAN`
                      )}
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
            {/* END OF BODY */}
            {/* BUTTON BELOW */}
            <div className="flex justify-center items-center gap-x-2 py-3 px-6 dark:border-gray-700">
              <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-full flex sm:flex-col md:flex-row">
                <button
                  type="submit"
                  className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-teal-900 text-white shadow-sm"
                  onClick={handleSubmit}
                >
                  PRINT
                </button>
                <button
                  type="button"
                  className="h-[2.5rem] w-full py-1 px-6  gap-2 rounded-md borde text-sm font-base bg-pink-800 text-white shadow-sm"
                  data-hs-overlay="#hs-view-request-modal"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PrintForm pdfRef={pdfRef} />
    </div>
  );
}

export default ViewRequestModal;
