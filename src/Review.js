import React from 'react'

function Review(props) {
    const { name, venue, communication, marketing, stage, management, equipment, engineer, loadin, timing, pay, reliability, discount, comments } = props.selectedReviews

    let posterName = ''
    function containsChar(name) { return /[a-zA-Z]/.test(name); }
    if (name && containsChar(name)) {
        posterName = name
    } else {
        posterName = 'Anonymous'
    }


    let iterator = 0
    let overallRating = 0
    for (const [key, value] of Object.entries(props.selectedReviews)) {
        if (value > 0) {
            iterator ++
            overallRating += value 
        }
    }
    let rating = (overallRating / iterator)

    return (
        <div className="review">
            <h1>
                {posterName} <div className="review-divider"></div>
                <div className="review-rating-stars">
                    <h2 className="rating-opaque" style={{ width: `${rating * 20}%` }}>&#11088; &#11088; &#11088; &#11088; &#11088;</h2>
                    <h2 className="rating-transparent" style={{ opacity: 0.3 }}>&#11088; &#11088; &#11088; &#11088; &#11088;</h2>
                </div>
            </h1>
            <div className="review-grid">
            <div className="grid-item">
                    <div className={`rating ${communication < 3 && communication > 0 ? 'rating-bad' : ''} ${communication == 0 ? 'rating-na' : ''}`}>{`${communication == 0 ? 'N/A' : communication}`}</div><p>communication</p>
                </div>
                <div className="grid-item">
                    <div className={`rating ${marketing < 3 && marketing > 0 ? 'rating-bad' : ''} ${marketing == 0 ? 'rating-na' : ''}`}>{`${marketing == 0 ? 'N/A' : marketing}`}</div><p>marketing</p>
                </div>
                <div className="grid-item">
                    <div className={`rating ${stage < 3 && stage > 0 ? 'rating-bad' : ''} ${stage == 0 ? 'rating-na' : ''}`}>{`${stage == 0 ? 'N/A' : stage}`}</div><p>stage</p>
                </div>
                <div className="grid-item">
                    <div className={`rating ${management < 3 && management > 0 ? 'rating-bad' : ''} ${management == 0 ? 'rating-na' : ''}`}>{`${management == 0 ? 'N/A' : management}`}</div><p>management</p>
                </div>
                <div className="grid-item">
                    <div className={`rating ${equipment < 3 && equipment > 0 ? 'rating-bad' : ''} ${equipment == 0 ? 'rating-na' : ''}`}>{`${equipment == 0 ? 'N/A' : equipment}`}</div><p>equipment</p>
                </div>
                <div className="grid-item">
                    <div className={`rating ${engineer < 3 && engineer > 0 ? 'rating-bad' : ''} ${engineer == 0 ? 'rating-na' : ''}`}>{`${engineer == 0 ? 'N/A' : engineer}`}</div><p>engineer</p>
                </div>
                <div className="grid-item">
                    <div className={`rating ${loadin < 3 && loadin > 0 ? 'rating-bad' : ''} ${loadin == 0 ? 'rating-na' : ''}`}>{`${loadin == 0 ? 'N/A' : loadin}`}</div><p>load-in</p>
                </div>
                <div className="grid-item">
                    <div className={`rating ${timing < 3 && timing > 0 ? 'rating-bad' : ''} ${timing == 0 ? 'rating-na' : ''}`}>{`${timing == 0 ? 'N/A' : timing}`}</div><p>timing</p>
                </div>
                <div className="grid-item">
                    <div className={`rating ${pay < 3 && pay > 0 ? 'rating-bad' : ''} ${pay == 0 ? 'rating-na' : ''}`}>{`${pay == 0 ? 'N/A' : pay}`}</div><p>pay</p>
                </div>
                <div className="grid-item">
                    <div className={`rating ${reliability < 3 && reliability > 0 ? 'rating-bad' : ''} ${reliability == 0 ? 'rating-na' : ''}`}>{`${reliability == 0 ? 'N/A' : reliability}`}</div><p>reliability</p>
                </div>
                <div className="grid-item">
                    <div className={`rating ${discount < 3 && discount > 0 ? 'rating-bad' : ''} ${discount == 0 ? 'rating-na' : ''}`}>{`${discount == 0 ? 'N/A' : discount}`}</div><p>discount</p>
                </div>
            </div>
            <p className="comments"><span>comments...</span><br></br><br></br>"{comments}"</p>
        </div>
    )
}

export default Review