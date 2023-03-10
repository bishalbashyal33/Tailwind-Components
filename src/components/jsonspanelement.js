
import React from 'react';

function JsonSpanElement(props) {

  return (
    <div class="block w-600  border-gray-200  shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div class="flex flex-grow ml-16 py-2">
          <div class="flex justify-start">
           
            <span class="text-white font-medium ">{props.label}</span>
          </div>

          <div class="flex flex-grow justify-end">
            <svg
              class="ml-2 mr-1 w-5 h-5 "
              fill="White"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z"></path>
            </svg>

            <svg
              class="ml-2 mr-1 w-5 h-5 "
              fill="White"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              ></path>
            </svg>
          </div>
        </div>
        </div>

    
  );
}

export default JsonSpanElement;