import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const MR = {
    "name": "test", "version": "v11", "metrics": {
        'O': { 'precision': 0.67, 'recall': 1.0, 'f1-score': 0.8, 'support': 3 },
        'B-PER': { 'precision': 1.0, 'recall': 1.0, 'f1-score': 1.0, 'support': 1 },
        'I-PER': { 'precision': 1.0, 'recall': 1.0, 'f1-score': 1.0, 'support': 1 },
        'B-LOC': { 'precision': 1.0, 'recall': 0.5, 'f1-score': 0.67, 'support': 2 },
        'I-LOC': { 'precision': 0.0, 'recall': 0.0, 'f1-score': 0.0, 'support': 0 },
        'micro avg': { 'precision': 0.83, 'recall': 0.83, 'f1-score': 0.83, 'support': 7 },
        'macro avg': { 'precision': 0.78, 'recall': 0.75, 'f1-score': 0.76, 'support': 7 },
        'weighted avg': { 'precision': 0.85, 'recall': 0.83, 'f1-score': 0.83, 'support': 7 },
        'samples avg': { 'precision': 0.83, 'recall': 0.83, 'f1-score': 0.83, 'support': 2 }
    }
}

function ModelReport () {
    const location = useLocation();
    const [modelDetails, setModelDetails] = useState( {} );
    const [modelId, setModelId] = useState( () => location.pathname.split( "/" )[3] || "" );
    useEffect( () => {
        console.log( location.pathname.split( "/" ) )
        setModelDetails( MR )
        // console.log(Object.keys(modelDetails.metrics).map((key, index) => {{modelDetails.metrics[key].precision}}))
    }, [] );
    return (
        <div class="p-4 sm:ml-64">
            <h1>Model Report: {modelId}</h1>
            <div class="flex border border-gray-500">
                <div class="w-1/2">

                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400  p-2 border">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th colspan="5" class="px-4 py-2 text-center border-b-2 border-gray-500">Training Data</th>
                            </tr>
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Field Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Precision
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Recall
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    F1-Score
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Support
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {modelDetails && modelDetails.metrics && Object.keys( modelDetails.metrics ).map( ( key, index ) =>
                                <tr
                                    key={index}
                                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-400">
                                        {key}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {modelDetails.metrics[key].precision}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {modelDetails.metrics[key].recall}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {modelDetails.metrics[key]["f1-score"]}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {modelDetails.metrics[key].support}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div class="w-1/2">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400  p-2 border">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th colspan="5" class="px-4 py-2 text-center font-bold border-b-2 border-gray-500">Testing Data</th>
                            </tr>
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Field Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Precision
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Recall
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    F1-Score
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Support
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {modelDetails && modelDetails.metrics && Object.keys( modelDetails.metrics ).map( ( key, index ) =>
                                <tr
                                    key={index}
                                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-400">
                                        {key}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {modelDetails.metrics[key].precision}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {modelDetails.metrics[key].recall}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {modelDetails.metrics[key]["f1-score"]}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {modelDetails.metrics[key].support}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default ModelReport;