
import React from 'react';
import DocType from '../dashboardcomponents/doctype';
import SerType from '../dashboardcomponents/servicetype';

function APIService(props) {

  return (
    

    <div class="p-4 sm:ml-64">
    <div class="p-4 flex overflow-auto scrollbar-hide  border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
     
        <SerType img="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png" apiname="Google Drive" />
        <SerType img="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png" apiname="Mail Server" />
        <SerType img="https://styles.redditmedia.com/t5_22y58b/styles/communityIcon_r5ax236rfw961.png" apiname="Fast API" />
    </div>
  </div>


  
  );
}

export default APIService;