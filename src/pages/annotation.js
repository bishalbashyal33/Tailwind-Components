import React, { useState, useEffect, useRef } from 'react'
import JsonHeadElement from '../components/jsonheadelement'
import JsonSpanElement from '../components/jsonspanelement'
import TButton from '../components/tbutton'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import BASE_URL from '../backend'

import './annotation.css'

function AnnotationPage(props) {
    const { docId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const imageRef = useRef(null)
    const imgContainerRef = useRef(null)
    const documentList = location.state.documents

    const [imgUrl, setImgUrl] = useState(
        `${BASE_URL}/annotation/get_file/${docId}`
    )
    const [bboxes, setBboxes] = useState([])
    const [actualBboxes, setactualBboxes] = useState([])

    const [zoom, setZoom] = useState(100)
    const imageWidth = `${zoom}%`
    const [isDrawing, setIsDrawing] = useState(false)
    const [currentField, setCurrentField] = useState(0)
    const [annotationStatus, setAnnotationStatus] = useState(null)
    const [currentDocumentIndex, setCurrentDocumentIndex] = useState(null)

    const [fields, setFields] = useState([])
    const [metadata, setMetadata] = useState({})
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    const [origstartX, setOrigStartX] = useState(0)
    const [origstartY, setOrigStartY] = useState(0)
    const [origendX, setOrigEndX] = useState(0)
    const [origendY, setOrigEndY] = useState(0)

    const handleZoomChange = (event) => {
        console.log(imageWidth)
        setZoom(event.target.value)
    }

    const handleFieldRef = (event, index) => {
        setCurrentField(index)
    }

    // Fetch the ocr and annotation data from the backend
    useEffect(() => {
        setCurrentDocumentIndex((prev) => {
            if (documentList.findIndex((doc) => doc.image_id == docId))
                return documentList.findIndex((doc) => doc.image_id == docId)
            else return 0
        })
        axios(`${BASE_URL}/annotate/get/${docId}`, {
            method: 'GET',
            withCredentials: true,
        })
            .then((res) => {
                setMetadata(res.data.metadata)
                setAnnotationStatus(res.data.metadata.status === 'Processed.')
                setWidth(res.data.metadata.width)
                setHeight(res.data.metadata.height)
                // reads and saves the information of the field
                setFields(
                    res.data.annotation.map((field) => ({
                        id: field.id,
                        name: field.name,
                        value: field.value || '',
                        word_ids: field.word_ids || [],
                    }))
                )
                setactualBboxes(res.data.ocr_data)
                calculateBboxDimensions(
                    res.data.ocr_data,
                    res.data.metadata.height,
                    res.data.metadata.width
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }, [docId])

    // Calculate the dimension of bbox based on the actual image portion visible on the screen
    const calculateBboxDimensions = (
        bboxData,
        _height,
        _width,
        scrollTop = 0,
        scrollLeft = 0
    ) => {
        const widthratio = imageRef.current.width / _width
        const heightratio = imageRef.current.height / _height
        setBboxes(
            bboxData
                .map((bbox, index) => [
                    bbox[0] * widthratio +
                        imageRef.current.offsetLeft -
                        scrollLeft,
                    bbox[1] * heightratio +
                        imageRef.current.offsetTop -
                        scrollTop,
                    bbox[2] * widthratio,
                    bbox[3] * heightratio,
                    bbox[4],
                    bbox[5],
                ])
                .filter((bbox, index) => {
                    return (
                        bbox[1] >= imgContainerRef.current.offsetTop &&
                        bbox[1] + bbox[3] <=
                            imgContainerRef.current.clientHeight +
                                imgContainerRef.current.offsetTop &&
                        bbox[0] >= imgContainerRef.current.offsetLeft &&
                        bbox[0] + bbox[2] <=
                            imgContainerRef.current.clientWidth +
                                imgContainerRef.current.offsetLeft
                    )
                })
        )
    }

    /**
     * Handling of the annotation portion
     */

    // sets the active/current field's value if the user clicks on the bbox
    const handleBboxClick = (event, bbox, index) => {
        if (annotationStatus) return
        if (event.ctrlKey) {
            fields[currentField]['value'] =
                fields[currentField]['value'] + ' ' + bbox[4]
            fields[currentField]['word_ids'].push(bbox[5])
            setFields([...fields])
        } else {
            fields[currentField]['value'] = bbox[4]
            fields[currentField]['word_ids'] = [bbox[5]]
            setFields([...fields])
        }
    }

    // handles the double click event on the image to set initial coordinates of the annotation box
    const handleImageClick = (event) => {
        if (event.detail == 2) {
            if (annotationStatus) return
            setIsDrawing(true)
            console.log('Inside the double click')
            // sets the starting and ending coordinates of the mouse pointer relative to the top-left
            // corner of a specific element when a mouse movement event is triggered.

            setOrigStartX(event.clientX + window.scrollX)
            setOrigStartY(event.clientY + window.scrollY)
            setOrigEndX(event.clientX + window.scrollX)
            setOrigEndY(event.clientY + window.scrollY)
        }
    }
    // Sets the end position of the annotation box when the mouse is moved
    const handleMouseMove = (event) => {
        if (!isDrawing) {
            return
        }
        const boundingRect = event.target.getBoundingClientRect()
        setOrigEndX(event.clientX + window.scrollX)
        setOrigEndY(event.clientY + window.scrollY)
    }

    // Sets the value of the current field when the mouse is released
    const handleMouseDown = (event) => {
        console.log('Inside the mouse down')
        if (isDrawing) {
            const temp = fileteredBboxes()
            fields[currentField]['value'] = ''
            fields[currentField]['word_ids'] = []
            for (let i = 0; i < temp.length; i++) {
                fields[currentField]['value'] =
                    fields[currentField]['value'] + ' ' + temp[i][4]
                fields[currentField]['word_ids'].push(temp[i][5])
            }
            setFields([...fields])
        }
        setIsDrawing(false)
    }

    // Filters the bboxes that are inside the annotation box
    const fileteredBboxes = () => {
        return bboxes.filter(([left, top, width, height, text, id], index) => {
            const right = left + width
            const bottom = top + height
            // Check if the bounding box lies inside rectangle
            return (
                left >= Math.min(origstartX, origendX) &&
                right <= Math.max(origstartX, origendX) &&
                top >= Math.min(origstartY, origendY) &&
                bottom <= Math.max(origstartY, origendY)
            )
        })
    }

    /**
     * Handling of the changes in image display: image zoom, image scroll, window scroll, window resize
     */

    // Handles the zoom event on the image
    useEffect(() => {
        calculateBboxDimensions(actualBboxes, height, width)
    }, [zoom])

    // Handles the window resize event
    window.onresize = () => {
        calculateBboxDimensions(actualBboxes, height, width)
    }

    // Handles the scroll event on the image
    const handleScrollEvent = (event) => {
        calculateBboxDimensions(
            actualBboxes,
            height,
            width,
            event.target.scrollTop,
            event.target.scrollLeft
        )
    }

    // The css style for the annotation box
    const rectStyle = {
        position: 'absolute',
        border: '1px solid black',
        backgroundColor: 'transparent',
        left: `${Math.min(origstartX, origendX)}px`,
        top: `${Math.min(origstartY, origendY)}px`,
        width: `${Math.abs(origendX - origstartX)}px`,
        height: `${Math.abs(origendY - origstartY)}px`,
    }

    /**
     * Saves the current annotation and navigates to the next document
     */
    const handleAnnotationSave = (event) => {
        axios
            .post(
                `${BASE_URL}/annotate/${docId}`,
                { annotations: { annotation: fields }, metadata: metadata },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
                { withCredentials: true }
            )
            .then((res) => {
                navigate(
                    `/annotate/${
                        documentList[
                            Math.min(
                                currentDocumentIndex + 1,
                                documentList.length - 1
                            )
                        ]['image_id']
                    }`,
                    {
                        state: { documents: documentList },
                    }
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }

    /**
     * Handles the change in the status of the annotation
     *  */
    const handleStatusChange = (e) => {
        e.preventDefault()
        metadata['status'] =
            metadata['status'] === 'Processed.' ? 'reviewing' : 'Processed.'
        setAnnotationStatus(metadata['status'] === 'Processed.')
        setMetadata(metadata)
    }

    const handleExit = (e) => {
        e.preventDefault()
        navigate(`/dashboard`)
    }

    return (
        <div class="mt-8 pb-24 dark:bg-gray-800">
            <div class="fixed z-20 bottom-0  left-0 pt-6 px-4 flex-shrink-0  w-550 mt-200 border border-gray-200 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div class="flex flex-grow justify-start">
                    <a
                        href={`${BASE_URL}/annotate/download/json/${docId}`}
                        download
                    >
                        <TButton label="Download"></TButton>
                    </a>
                    <div>
                        <TButton
                            onClick={handleStatusChange}
                            label={
                                annotationStatus
                                    ? 'Start Reviewing'
                                    : 'Finish Annotation'
                            }
                        ></TButton>
                    </div>
                    <TButton
                        onClick={handleAnnotationSave}
                        label="Save and exit"
                    ></TButton>
                </div>
                <div class="flex justify-between">
                    {documentList && (
                        <Link
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            to={`/annotate/${
                                documentList[
                                    Math.max(currentDocumentIndex - 1, 0)
                                ]['image_id']
                            }`}
                            state={{ documents: documentList }}
                        >
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
                        </Link>
                    )}
                    <span class=" text-gray-500">
                        {currentDocumentIndex + 1} of {documentList.length}
                    </span>
                    {documentList && (
                        <Link
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            to={`/annotate/${
                                documentList[
                                    Math.min(
                                        currentDocumentIndex + 1,
                                        documentList.length - 1
                                    )
                                ]['image_id']
                            }`}
                            state={{ documents: documentList }}
                        >
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
                        </Link>
                    )}
                </div>
            </div>

            <div class="flex p-2 z-20 w-auto fixed top-0 right-0 border border-gray-200  shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <input
                    type="range"
                    class="w-600 "
                    min="50"
                    max="200"
                    step="10"
                    value={zoom}
                    onChange={handleZoomChange}
                />
                <svg
                    class="ml-2 mr-1 w-8 h-8 hover:cursor-pointer"
                    fill="White"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    onClick={handleExit}
                >
                    <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    ></path>
                </svg>
            </div>

            <div class="flex h-screen w-full overflow-hidden">
                {/* This div component contains all the fields to be annotated for the document type */}
                <div class="flex flex-col overflow-y-scroll scrollbar-hide ">
                    {fields &&
                        fields.map((field, index) => (
                            <div key={index}>
                                <JsonSpanElement
                                    index={index}
                                    label={field['name']}
                                    handleRef={handleFieldRef}
                                    value={field['value']}
                                />
                            </div>
                        ))}
                </div>

                {/* This component contains all the features for annotation */}
                <div class="flex-1 flex flex-col h-screen justify-center ml-8 overflow-clip">
                    <div
                        class="h-890 overflow-x-scroll scrollbar-hide img-container"
                        onScroll={handleScrollEvent}
                        ref={imgContainerRef}
                    >
                        {imgUrl && (
                            <img
                                ref={imageRef}
                                src={imgUrl}
                                alt="Document Image"
                                id="document-image"
                                class="h-890 mx-auto  object-contain"
                                style={{
                                    width: imageWidth,
                                    maxWidth: 'none',
                                    maxHeight: '890',
                                }}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onClick={(event) => handleImageClick(event)}
                            />
                        )}
                        {isDrawing && <div style={rectStyle}></div>}

                        {/* This component is responsible for displaying the bounding boxes of the texts */}
                        <div className="bboxes">
                            {bboxes &&
                                bboxes.map((bbox, index) => {
                                    if (bbox[4].trim().length > 0) {
                                        return (
                                            <div
                                                key={index}
                                                id={index}
                                                onClick={(event) =>
                                                    handleBboxClick(
                                                        event,
                                                        bbox,
                                                        index
                                                    )
                                                }
                                                className="bbox"
                                                style={{
                                                    left: bbox[0],
                                                    top: bbox[1],
                                                    width: bbox[2],
                                                    height: bbox[3],
                                                }}
                                            ></div>
                                        )
                                    }
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnnotationPage
