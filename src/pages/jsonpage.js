import React, { useState } from "react";
import JsonHeadElement from "../components/jsonheadelement";
import JsonSpanElement from "../components/jsonspanelement";
import TButton from "../components/tbutton";

function JsonPage(props) {
  const [zoom, setZoom] = useState(100);

  const handleZoomChange = (event) => {
    setZoom(event.target.value);
  };

  const imageWidth = `${zoom}%`;

  return (
    <div class="mt-12 pb-24 dark:bg-gray-800">
    
      <div class="fixed bottom-0  left-0 pt-6 px-4 flex-shrink-0  w-600 mt-200 border border-gray-200  shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div class="flex flex-grow justify-start">
          <TButton label="+ Add Section"></TButton>
          <TButton label="Save & Close"></TButton>
        </div>
        <div class="flex justify-between">
          <svg
            class="ml-2 -mr-1 w-5 h-5 "
            fill="White"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            ></path>
          </svg>
          <span class="text-white">1 of 1</span>

          <svg
            class="ml-2 mr-2 w-5 h-5 "
            fill="White"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            ></path>
          </svg>
        </div>
      </div>

      
      

      <div class="p-6 w-auto fixed top-0 right-0  border border-gray-200  shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <input
          type="range"
          class="w-600 "
          min="50"
          max="200"
          step="10"
          value={zoom}
          onChange={handleZoomChange}
        />
      </div>

      <div class="flex h-screen w-full overflow-hidden">
        <div class="flex flex-col overflow-y-scroll scrollbar-hide ">
          <JsonHeadElement label="Basic Information"></JsonHeadElement>
          <JsonSpanElement label="Texas,USA"></JsonSpanElement>
          <JsonSpanElement label="Issue Date"></JsonSpanElement>
          <JsonSpanElement label="Terms"></JsonSpanElement>
          <JsonSpanElement label="Order Id/ Tracking No"></JsonSpanElement>
          <TButton label="+Add Field"></TButton>

          <JsonHeadElement label="Buyer Detail"></JsonHeadElement>
          <JsonSpanElement label="Name"></JsonSpanElement>
          <JsonSpanElement label="Address"></JsonSpanElement>
          <JsonSpanElement label="VAT No."></JsonSpanElement>
          <TButton label="+Add Field"></TButton>

          <JsonHeadElement label="Buyer Detail"></JsonHeadElement>
          <JsonSpanElement label="Name"></JsonSpanElement>
          <JsonSpanElement label="Address"></JsonSpanElement>
          <JsonSpanElement label="VAT No."></JsonSpanElement>
          <TButton label="+Add Field"></TButton>

          <JsonHeadElement label="Buyer Detail"></JsonHeadElement>
          <JsonSpanElement label="Name"></JsonSpanElement>
          <JsonSpanElement label="Address"></JsonSpanElement>
          <JsonSpanElement label="VAT No."></JsonSpanElement>
          <TButton label="+Add Field"></TButton>

          <JsonHeadElement label="Buyer Detail"></JsonHeadElement>
          <JsonSpanElement label="Name"></JsonSpanElement>
          <JsonSpanElement label="Address"></JsonSpanElement>
          <JsonSpanElement label="VAT No."></JsonSpanElement>
          <TButton label="+Add Field"></TButton>

          <JsonHeadElement label="Buyer Detail"></JsonHeadElement>
          <JsonSpanElement label="Name"></JsonSpanElement>
          <JsonSpanElement label="Address"></JsonSpanElement>
          <JsonSpanElement label="VAT No."></JsonSpanElement>
          <TButton label="+Add Field"></TButton>
        </div>

        <div class="flex-1  flex flex-col h-screen justify-center ml-32 overflow-clip">
          <div class=" h-890 overflow-x-scroll scrollbar-hide ">
            <img
              src="https://d7pdsiqo9rcig.cloudfront.net/wp-content/uploads/2019/11/Receipt-OCR-Taggun-demo.png"
              alt="Document Image"
              id="document-image"
              class="h-890 mx-auto  object-contain"
              style={{ width: imageWidth,maxWidth: "none",maxHeight:"890" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JsonPage;
