function HomePage () {
    return (
        <div class="flex flex-wrap py-40 dark:bg-gray-800 justify-center ">
            <h1 class="text-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                We create AI Powered Info Extraction Tools
            </h1>
            <p class=" text-center mb-6 text-lg font-normal text-gray-500 lg:text-xl  sm:px-16 xl:px-48 dark:text-gray-400">
                Here at DocBite we focus on markets where technology,
                innovation, and AI to extract valuable information that can
                unlock long-term value and drive economic growth.
            </p>
            <div class="flex justify-center">
                <a
                    href="/UploadPage"
                    class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                >
                    Get Started
                    <svg
                        class="ml-2 -mr-1 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </a>
            </div>
        </div>
    )
}

export default HomePage
