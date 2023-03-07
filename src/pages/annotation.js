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
    const documentList = location.state.documents
    console.log(`${BASE_URL}/annotation/get_file/${docId}`)

    const [actualBboxes, setactualBboxes] = useState([])
    const [metadata, setMetadata] = useState({})
    const [fields, setFields] = useState([])
    const [currentField, setCurrentField] = useState(0)
    const [bboxes, setBboxes] = useState([])
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [rect, setRect] = useState({})
    const [currentDocumentIndex, setCurrentDocumentIndex] = useState(null)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [annotationStatus, setAnnotationStatus] = useState(null)

    const [startX, setStartX] = useState(0)
    const [startY, setStartY] = useState(0)
    const [endX, setEndX] = useState(0)
    const [endY, setEndY] = useState(0)
    const [isDrawing, setIsDrawing] = useState(false)

    const [zoom, setZoom] = useState(100)

    const imageRef = useRef(null)
    const navigate = useNavigate()

    const handleZoomChange = (event) => {
        setZoom(event.target.value)
    }

    useEffect(() => {
        setCurrentDocumentIndex((prev) => {
            if (documentList.findIndex((doc) => doc.image_id == docId))
                return documentList.findIndex((doc) => doc.image_id == docId)
            else return 0
        })
        const y = documentList.findIndex((doc) => doc.image_id == docId) || 0
        console.log(
            'new indexes',
            Math.max(y - 1, 0),
            Math.min(y + 1, documentList.length - 1)
        )
        console.log(
            'documentList: ',
            documentList[Math.min(y + 1, documentList.length - 1)],
            documentList[Math.max(y - 1, 0)]
        )
        axios(`${BASE_URL}/annotate/get/${docId}`, {
            method: 'GET',
            withCredentials: true,
        })
            .then((res) => {
                console.log(res)
                setMetadata(res.data.metadata)
                setRect(res.data.annotation.map((field) => []))
                setAnnotationStatus(res.data.metadata.status === 'Processed.')

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
                    774 || res.data.height,
                    1492 || res.data.width
                )
                setHeight(774 || res.data.height)
                setWidth(1492 || res.data.width)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [docId])

    const imageWidth = `${zoom}%`

    const calculateBboxDimensions = (
        bboxData,
        _height,
        _width,
        scrollTop = 0
    ) => {
        const widthratio = imageRef.current.width / _width
        const heightratio = imageRef.current.height / _height
        setBboxes(
            bboxData
                .map((bbox, index) => [
                    bbox[0] * heightratio + imageRef.current.offsetLeft,
                    bbox[1] * widthratio +
                        imageRef.current.offsetTop -
                        scrollTop,
                    bbox[2] * widthratio,
                    bbox[3] * heightratio,
                    bbox[4],
                    bbox[5],
                ])
                .filter((bbox, index) => {
                    return (
                        bbox[1] >= imageRef.current.offsetTop &&
                        bbox[1] + bbox[2] <= imageRef.current.height
                    )
                })
        )
    }

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

    const handleRef = (event, index) => {
        setCurrentField(index)
    }

    const handleImageClick = (event) => {
        if (event.detail == 1) {
            console.log('Inside the click')
        } else if (event.detail == 2) {
            if (annotationStatus) return
            setIsDrawing(true)
            const boundingRect = event.target.getBoundingClientRect()
            setStartX(
                event.clientX - boundingRect.left + event.target.offsetLeft
            )
            setStartY(event.clientY - boundingRect.top + event.target.offsetTop)
            setEndX(event.clientX - boundingRect.left + event.target.offsetLeft)
            setEndY(event.clientY - boundingRect.top + event.target.offsetTop)
        }
    }

    const fileteredBboxes = () => {
        return bboxes.filter(([left, top, width, height, text, id], index) => {
            const right = left + width
            const bottom = top + height
            // Check if the bounding box intersects with the rectangle
            return (
                left >= Math.min(startX, endX) &&
                right <= Math.max(startX, endX) &&
                top >= Math.min(startY, endY) &&
                bottom <= Math.max(startY, endY)
            )
        })
    }

    const handleMouseUp = () => {
        console.log(fields)
        console.log('Inside the mouse up')
    }

    const handleMouseDown = (event) => {
        console.log('Inside the mouse down')
        if (isDrawing) {
            let temp = fileteredBboxes()
            rect[currentField] = [startX, startY, endX, endY]
            setRect([...rect])
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

    const handleMouseMove = (event) => {
        if (!isDrawing) {
            return
        }

        const boundingRect = event.target.getBoundingClientRect()
        setEndX(event.clientX - boundingRect.left + event.target.offsetLeft)
        setEndY(event.clientY - boundingRect.top + event.target.offsetTop)
    }

    const handleScrollEvent = (event) => {
        calculateBboxDimensions(
            actualBboxes,
            height,
            width,
            event.target.scrollTop
        )
    }

    useEffect(() => {
        calculateBboxDimensions(actualBboxes, height, width)
    }, [zoom])

    const rectStyle = {
        position: 'absolute',
        border: '1px solid black',
        backgroundColor: 'transparent',
        left: `${Math.min(startX, endX)}px`,
        top: `${Math.min(startY, endY)}px`,
        width: `${Math.abs(endX - startX)}px`,
        height: `${Math.abs(endY - startY)}px`,
    }

    window.onresize = () => {
        calculateBboxDimensions(actualBboxes, height, width)
    }

    const handleAnnotationSave = (event) => {
        console.log('Annotation Save Requested')
        console.log(fields)
        let formdata = new FormData()
        formdata.append('fields', JSON.stringify(fields))
        axios
            .post(
                `${BASE_URL}/annotate/${docId}`,
                { annotation: fields },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
                { withCredentials: true }
            )
            .then((res) => {
                console.log('Successfully annotated ', res)
                navigate(-1)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleStatusChange = (e) => {
        e.preventDefault()
        metadata['status'] =
            metadata['status'] === 'Processed.' ? 'reviewing' : 'Processed.'
        setAnnotationStatus(metadata['status'] === 'Processed.')
        setMetadata(metadata)
    }

    return (
        <div class="mt-12 pb-24 dark:bg-gray-800">
            <div class="fixed z-20 bottom-0  left-0 pt-6 px-4 flex-shrink-0  w-550 mt-200 border border-gray-200  shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div class="flex flex-grow justify-start">
                    <a href={`${BASE_URL}/annotate/download/${docId}`} download>
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

                        {/* {metadata &&
                        (annotationStatus ? (
                        ) : (
                            <TButton>Finish Annotation</TButton>
                        ))} */}
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
                    <span class="text-white">
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

            <div class="p-6 z-20 w-auto fixed top-0 right-0  border border-gray-200  shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
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
                {/* This div component contains all the fields to be annotated for the document type */}
                <div class="flex flex-col overflow-y-scroll scrollbar-hide ">
                    {fields &&
                        fields.map((field, index) => (
                            <div key={index}>
                                {/* <span label="label">{field['name']}</span> */}

                                {/* {metadata['status'] === 'Processed.' && (
                                    <input
                                        onClick={(event) =>
                                            handleRef(event, index)
                                        }
                                        type={'text'}
                                        name="value"
                                        value={field['value']}
                                        className="value"
                                        readOnly="readonly"
                                    />
                                )} */}
                                {/* {metadata['status'] === 'reviewing' && (
                                    <input
                                        onClick={(event) =>
                                            handleRef(event, index)
                                        }
                                        type={'text'}
                                        name="value"
                                        value={field['value']}
                                        className="value"
                                    />
                                )} */}
                                {/* <input
                                    onClick={(event) => handleRef(event, index)}
                                    type={'text'}
                                    name="value"
                                    value={field['value']}
                                    className="value"
                                    readOnly={
                                        metadata['status'] === 'Processed.'
                                    }
                                /> */}
                                <JsonSpanElement
                                    index={index}
                                    label={field['name']}
                                    handleRef={handleRef}
                                    value={field['value']}
                                />
                            </div>
                        ))}
                </div>

                {/* This component contains all the features for annotation */}
                <div class="flex-1  flex flex-col h-screen justify-center ml-8 overflow-clip">
                    <div
                        class="h-890 overflow-x-scroll scrollbar-hide"
                        onScroll={handleScrollEvent}
                    >
                        <img
                            ref={imageRef}
                            src={`${BASE_URL}/annotation/get_file/${docId}`}
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
                            onMouseUp={handleMouseUp}
                            onClick={(event) => handleImageClick(event)}
                        />
                        {isDrawing && <div style={rectStyle}></div>}
                        {/* {isDrawing && <div style={rectStyle}></div>} */}

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
            <div></div>
        </div>
    )
}

export default AnnotationPage
