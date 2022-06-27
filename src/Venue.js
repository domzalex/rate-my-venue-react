import React, { useEffect, useState, useRef } from 'react'


function Venue({venue, allReviews, pageLimit, dataLimit, RenderComponent}) {

    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView()


    ////////////////
    // Sets state; some of this might not be needed, but keeping for now
    ////////////////
    const [selectedVenue, venueSelect] = useState(venue)

    ////////////////
    // Insurance once again to make sure props.reviews is defined. Redefines all props.reviews into a new variable
    ////////////////
    const selectedReviews = []
    if (allReviews) {
        allReviews.forEach(review => {
            if (review.venue === selectedVenue) {
                selectedReviews.push(review)
            } 
        })
    }

    let venueReviewScores = 0
    let iterator = 0
    let overallRating = 0
    let indRating = 0

    for (let i = 0; i < selectedReviews.length; i++) {
        for (const [key, value] of Object.entries(selectedReviews[i])) {
            if (value > 0) {
                iterator ++
                overallRating += value 
            }
        }
        indRating = (overallRating / iterator)
        venueReviewScores += indRating
    }
    const venueRating = (venueReviewScores / selectedReviews.length)
    

    ////////////////
    // Sets state cont...
    ////////////////
    const [pages] = useState(Math.ceil(selectedReviews.length / dataLimit))
    const [currentPage, setCurrentPage] = useState(1)


    function goToNextPage() {
        if (currentPage < pages) {
            setCurrentPage((page) => page + 1);
            executeScroll()
        } else {
            //do nothing!
        }
    }
    function goToPreviousPage() {
        if (currentPage > 1) {
            setCurrentPage((page) => page - 1);
            executeScroll()
        } else {
            //do nothing!
        }
    }
    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }
    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return selectedReviews.slice(startIndex, endIndex);
    };
    // const getPaginationGroup = () => {
    //     let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    //     return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    // };

    return (
        <div className="main-review-container">
            <div ref={myRef} className="scroll-to"></div>
        <div className="all-reviews">
            <h1 className="venue-name">{venue}</h1>
            <div className="venue-rating-stars-cont">
                <div className="venue-rating-stars">
                    <h2 className="rating-opaque" style={{ width: `${venueRating * 20}%` }}>&#11088; &#11088; &#11088; &#11088; &#11088;</h2>
                    <h2 className="rating-transparent" style={{ opacity: 0.3 }}>&#11088; &#11088; &#11088; &#11088; &#11088;</h2>
                </div>
            </div>

            <div className="pagination">
                {/* previous button */}
                <a href="#title" onClick={goToPreviousPage}>
                    prev
                </a>
                {/* show page numbers */}
                {/* {getPaginationGroup().map((item, index) => (
                    <button
                    key={index}
                    onClick={changePage}
                    className={`paginationItem ${currentPage === item ? 'active' : null}`}
                    >
                    <span>{item}</span>
                    </button>
                ))} */}
                {/* next button */}
                <a href="#title" onClick={goToNextPage}>
                    next
                </a>
            </div>

            <div className="main-review">
                {getPaginatedData().map((d, idx) => (
                    <RenderComponent key={idx} selectedReviews={d} />
                ))}
            </div>


            <div className="pagination">
                {/* previous button */}
                <a href="#title" onClick={goToPreviousPage}>
                    prev
                </a>
                {/* show page numbers */}
                {/* {getPaginationGroup().map((item, index) => (
                    <button
                    key={index}
                    onClick={changePage}
                    className={`paginationItem ${currentPage === item ? 'active' : null}`}
                    >
                    <span>{item}</span>
                    </button>
                ))} */}
                {/* next button */}
                <a href="#title" onClick={goToNextPage}>
                    next
                </a>
            </div>
        </div> 
        </div>
    )
    
}

export default Venue;