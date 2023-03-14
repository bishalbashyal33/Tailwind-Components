
import React from 'react';
import DocType from '../dashboardcomponents/doctype';
import FormType from '../dashboardcomponents/formtype';

function DocumentTypes(props) {

  return (
    

    <div class="p-4 h-screen overflow-y-scroll overflow-x-clip scrollbar-hide sm:ml-64">
    <div class="flex flex-wrap p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
   
        <DocType />
       
        <FormType/>
        
        <FormType/>
     
    </div>
  </div>

  
  );
}

export default DocumentTypes;