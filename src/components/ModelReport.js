import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const MR = {
    "name": "validation", "version": "v11", "metrics": {
        'ADDRESS LINE': {
            'precision': 0.9166666666666666,
            'recall': 0.9705882352941176,
            'f1-score': 0.9428571428571428,
            'support': 34
        },
        'CAT NO': {
            'precision': 1.0,
            'recall': 1.0,
            'f1-score': 1.0,
            'support': 77
        },
        'DLN': {
            'precision': 0.8778280542986425,
            'recall': 1.0,
            'f1-score': 0.9349397590361446,
            'support': 194
        },
        'EMPLOYER IDENTIFICATION NUMBER': {
            'precision': 1.0,
            'recall': 1.0,
            'f1-score': 1.0,
            'support': 182
        },
        "FIRM'S ADDRESS": {
            'precision': 0.32558139534883723,
            'recall': 0.3888888888888889,
            'f1-score': 0.35443037974683544,
            'support': 36
        },
        "FIRM'S EIN": {
            'precision': 1.0,
            'recall': 1.0,
            'f1-score': 1.0,
            'support': 35
        },
        "FIRM'S NAME": {
            'precision': 0.7692307692307693,
            'recall': 0.8,
            'f1-score': 0.7843137254901961,
            'support': 25
        },
        'FORM OF ORGANIZATION': {
            'precision': 0.65,
            'recall': 0.7647058823529411,
            'f1-score': 0.7027027027027027,
            'support': 17
        },
        'GROSS RECEIPTS': {
            'precision': 0.5952380952380952,
            'recall': 0.8620689655172413,
            'f1-score': 0.7042253521126761,
            'support': 58
        },
        'NAME AND ADDRESS OF PRINCIPAL OFFICER': {
            'precision': 0.2857142857142857,
            'recall': 0.18181818181818182,
            'f1-score': 0.2222222222222222,
            'support': 11
        },
        'NAME OF ORGANIZATION': {
            'precision': 0.6666666666666666,
            'recall': 0.631578947368421,
            'f1-score': 0.6486486486486486,
            'support': 19
        },
        'NUMBER AND STREET': {
            'precision': 0.9523809523809523,
            'recall': 0.9523809523809523,
            'f1-score': 0.9523809523809523,
            'support': 21
        },
        'OMB NO': {
            'precision': 0.8275862068965517,
            'recall': 1.0,
            'f1-score': 0.9056603773584906,
            'support': 120
        },
        'STATE OF LEGAL DOMICILE': {
            'precision': 0.7777777777777778,
            'recall': 1.0,
            'f1-score': 0.8750000000000001,
            'support': 7
        },
        'TAX YEAR BEGINNING': {
            'precision': 0.974025974025974,
            'recall': 0.9868421052631579,
            'f1-score': 0.9803921568627451,
            'support': 76
        },
        'TAX YEAR ENDING': {
            'precision': 1.0,
            'recall': 0.974025974025974,
            'f1-score': 0.9868421052631579,
            'support': 77
        },
        'TELEPHONE NUMBER': {
            'precision': 1.0,
            'recall': 1.0,
            'f1-score': 1.0,
            'support': 107
        },
        'WEBSITE': {
            'precision': 0.9032258064516129,
            'recall': 0.8,
            'f1-score': 0.8484848484848486,
            'support': 35
        },
        'YEAR OF FORMATION': {
            'precision': 0.8,
            'recall': 1.0,
            'f1-score': 0.888888888888889,
            'support': 8
        },
        'micro avg': {
            'precision': 0.8758169934640523,
            'recall': 0.9411764705882353,
            'f1-score': 0.9073212018620398,
            'support': 1139
        },
        'macro avg': {
            'precision': 0.8064169816156227,
            'recall': 0.858573585942625,
            'f1-score': 0.8279994348450344,
            'support': 1139
        },
        'weighted avg': {
            'precision': 0.8855083481308824,
            'recall': 0.9411764705882353,
            'f1-score': 0.9099838017326403,
            'support': 1139
        }
    }
}

function ModelReport () {
    const location = useLocation();
    const [modelDetails, setModelDetails] = useState( {} );
    const [modelId, setModelId] = useState( () => location.pathname.split( "/" )[3] || "" );
    useEffect( () => {
        setModelDetails( MR )
    }, [] );
    return (
        <div class="p-4 sm:ml-64">
            <div className="rounded-lg p-4">
                <h2 className="text-lg text-gray-100 font-medium mb-2">MODEL: {modelId} - v{11}</h2>
                <div className="flex flex-wrap mb-2">
                    <div className="w-full md:w-1/2 lg:w-1/2">
                        <p className="font-large text-gray-100 mb-1">Train Ratio:</p>
                        <p className="text-lg text-blue-200">{0.8}</p>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/2">
                        <p className="font-large text-gray-100 mb-1">Epochs:</p>
                        <p className="text-lg text-blue-200">{3}</p>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/2 mt-2">
                        <p className="font-large text-gray-100 mb-1">Batch Size:</p>
                        <p className="text-lg text-blue-200">{2}</p>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/2 mt-2">
                        <p className="font-large text-gray-100 mb-1">Labels Count:</p>
                        <p className="text-lg text-blue-200">{39}</p>
                    </div>
                </div>
            </div>

            <div class="flex border border-gray-500">
                <div class="w-full">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400  p-2 border">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th colspan="5" class="px-4 py-2 text-center border-b-2 border-gray-500">Validation Data</th>
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
                                    <td class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-400">
                                        {key}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {modelDetails.metrics[key].precision.toFixed( 2 )}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {modelDetails.metrics[key].recall.toFixed( 2 )}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {modelDetails.metrics[key]["f1-score"].toFixed( 2 )}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {modelDetails.metrics[key]["support"]}
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