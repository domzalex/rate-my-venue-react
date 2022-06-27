import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Create(props) {

    const allVenues = []
    if (typeof props.venues !== 'undefined') {
        props.venues.forEach(name => {
            allVenues.push(name)
        })
    }



    let navigate = useNavigate()
    const [data, setData] = useState()
    const [reviews, setReviews] = useState()
    const [reviewName, setName] = useState("");
    const [reviewVenue, setVenue] = useState('')
    const [reviewCommunication, setCommunication] = useState("5");
    const [reviewMarketing, setMarketing] = useState("5");
    const [reviewStage, setStage] = useState('5')
    const [reviewManagement, setManagement] = useState("5");
    const [reviewEquipment, setEquipment] = useState("5");
    const [reviewEngineer, setEngineer] = useState('5')
    const [reviewLoadin, setLoadin] = useState("5");
    const [reviewTiming, setTiming] = useState("5");
    const [reviewPay, setPay] = useState('5')
    const [reviewReliability, setReliability] = useState("5");
    const [reviewDiscount, setDiscount] = useState("5");
    const [reviewComments, setComments] = useState('')
    const [isDuplicate, checkIfDuplicate] = useState(0)

    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8080/user",
          }).then((res) => {
            setData(res.data);
          });
    }, [])

    useEffect(() => {
        const url = "http://192.168.1.170:8080/reviews";
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
      }, []);
   
    

    const postReview = () => {
        if (isDuplicate == 1) {
            alert('Only one review per venue per user.')
        } else {
            console.log('Success')
            axios({
                method: "POST",
                data: {
                    name: data.username,
                    venue: reviewVenue,
                    communication: reviewCommunication,
                    marketing: reviewMarketing,
                    stage: reviewStage,
                    management: reviewManagement,
                    equipment: reviewEquipment,
                    engineer: reviewEngineer,
                    loadin: reviewLoadin,
                    timing: reviewTiming,
                    pay: reviewPay,
                    reliability: reviewReliability,
                    discount: reviewDiscount,
                    comments: reviewComments
                },
                withCredentials: true,
                url: 'http://localhost:8080/create',
            })
            alert('Review created successfully.')
            navigate(`/`)
        }
    };

    useEffect(() => {
        if (reviews) {
            checkIfDuplicate(0)
            reviews.forEach(review => {
                if (review.venue == reviewVenue && review.name == data.username) {
                    checkIfDuplicate(1)
                } else {
                    // do nothing..?
                }
            })
        }
    }, [reviewVenue])



    if (data) {
        return (
            <div className="create-container">
                <datalist id="venue-list">
                  {allVenues.map(name => {
                    return (
                      <option>{name}</option>
                    )
                  })}
                </datalist>
                <p id="create-top-p">Categories rated 1 - 5</p>
                <span><i>**Set slider to 'N/A' if not applicable and include in your comment**</i></span>
                <div className="create-review">
                    <div className="create-input">
                        <input onChange={(e) => setName(e.target.value)} type="text" maxLength="30" value={data.username} placeholder="Your name..." />
                        <label htmlFor="name">Username</label>
                    </div>
                    <div className="create-input">
                        <input onChange={(e) => setVenue(e.target.value)} type="text" placeholder="Enter a venue or choose from the list..." list="venue-list"/>
                        <label htmlFor="venue">Venue Name</label>
                    </div>
                    <div className="create-input">
                        <div className="slider">
                            <input onChange={(e) => setCommunication(e.target.value)} type="range" min="0" max="5" />
                            <output>{reviewCommunication}</output>
                            <ul className="slider-background">
                                <li className="slider-rating">N/A</li>
                                <li className="slider-rating">1</li>
                                <li className="slider-rating">2</li>
                                <li className="slider-rating">3</li>
                                <li className="slider-rating">4</li>
                                <li className="slider-rating">5</li>
                            </ul>
                        </div>  
                        <label htmlFor="communication">How well did the venue communicate?</label>
                    </div>
                    <div className="create-input">
                        <div className="slider">
                        <input onChange={(e) => setMarketing(e.target.value)} type="range" min="0" max="5" />
                            <output>{reviewMarketing}</output> 
                            <ul className="slider-background">
                                <li className="slider-rating">N/A</li>
                                <li className="slider-rating">1</li>
                                <li className="slider-rating">2</li>
                                <li className="slider-rating">3</li>
                                <li className="slider-rating">4</li>
                                <li className="slider-rating">5</li>
                            </ul>
                        </div>
                        <label htmlFor="marketing">How well did the venue market the event?</label>
                    </div>
                    <div className="create-input">
                        <div className="slider">
                            <input onChange={(e) => setStage(e.target.value)} type="range" min="0" max="5" />
                            <output>{reviewStage}</output>
                            <ul className="slider-background">
                                <li className="slider-rating">N/A</li>
                                <li className="slider-rating">1</li>
                                <li className="slider-rating">2</li>
                                <li className="slider-rating">3</li>
                                <li className="slider-rating">4</li>
                                <li className="slider-rating">5</li>
                            </ul>
                        </div>
                        <label htmlFor="stage">How usable was the stage? (i.e. size, location, etc)</label>
                    </div>
                    <div className="create-input">
                        <div className="slider">
                            <input onChange={(e) => setManagement(e.target.value)} type="range" min="0" max="5" />
                            <output>{reviewManagement}</output>
                            <ul className="slider-background">
                                <li className="slider-rating">N/A</li>
                                <li className="slider-rating">1</li>
                                <li className="slider-rating">2</li>
                                <li className="slider-rating">3</li>
                                <li className="slider-rating">4</li>
                                <li className="slider-rating">5</li>
                            </ul>
                        </div>
                        <label htmlFor="management">How professional/competent was the management?</label>
                    </div>
                    <div className="create-input">
                        <div className="slider">
                            <input onChange={(e) => setEquipment(e.target.value)} type="range" min="0" max="5" />
                            <output>{reviewEquipment}</output>
                            <ul className="slider-background">
                                <li className="slider-rating">N/A</li>
                                <li className="slider-rating">1</li>
                                <li className="slider-rating">2</li>
                                <li className="slider-rating">3</li>
                                <li className="slider-rating">4</li>
                                <li className="slider-rating">5</li>
                            </ul>
                        </div>
                        <label htmlFor="equipment">If applicable, how was the provided equipment?</label>
                    </div>
                    <div className="create-input">
                        <div className="slider">
                            <input onChange={(e) => setEngineer(e.target.value)} type="range" min="0" max="5" />
                            <output>{reviewEngineer}</output>
                            <ul className="slider-background">
                                <li className="slider-rating">N/A</li>
                                <li className="slider-rating">1</li>
                                <li className="slider-rating">2</li>
                                <li className="slider-rating">3</li>
                                <li className="slider-rating">4</li>
                                <li className="slider-rating">5</li>
                            </ul>
                        </div>
                        <label htmlFor="engineer">If applicable, how knowledgable/competent was the house sound engineer?</label>
                    </div>
                    <div className="create-input">
                        <div className="slider">
                            <input onChange={(e) => setLoadin(e.target.value)} type="range" min="0" max="5" />
                            <output>{reviewLoadin}</output>
                            <ul className="slider-background">
                                <li className="slider-rating">N/A</li>
                                <li className="slider-rating">1</li>
                                <li className="slider-rating">2</li>
                                <li className="slider-rating">3</li>
                                <li className="slider-rating">4</li>
                                <li className="slider-rating">5</li>
                            </ul>
                        </div>
                        <label htmlFor="loadin">How enjoyable was the load-in process? (i.e., were there stairs to climb? how far did you have to move equipment?)</label>
                    </div>
                    <div className="create-input">
                        <div className="slider">
                            <input onChange={(e) => setTiming(e.target.value)} type="range" min="0" max="5" />
                            <output>{reviewTiming}</output>
                            <ul className="slider-background">
                                <li className="slider-rating">N/A</li>
                                <li className="slider-rating">1</li>
                                <li className="slider-rating">2</li>
                                <li className="slider-rating">3</li>
                                <li className="slider-rating">4</li>
                                <li className="slider-rating">5</li>
                            </ul>
                        </div>
                        <label htmlFor="timing">Was the time slot lucrative/preferred?</label>
                    </div>
                    <div className="create-input">
                        <div className="slider">
                            <input onChange={(e) => setPay(e.target.value)} type="range" min="0" max="5" />
                            <output>{reviewPay}</output>
                            <ul className="slider-background">
                                <li className="slider-rating">N/A</li>
                                <li className="slider-rating">1</li>
                                <li className="slider-rating">2</li>
                                <li className="slider-rating">3</li>
                                <li className="slider-rating">4</li>
                                <li className="slider-rating">5</li>
                            </ul>
                        </div>
                        <label htmlFor="pay">How fair was the pay?</label>
                    </div>
                    <div className="create-input">
                        <div className="slider">
                            <input onChange={(e) => setReliability(e.target.value)} type="range" min="0" max="5" />
                            <output>{reviewReliability}</output>
                            <ul className="slider-background">
                                <li className="slider-rating">N/A</li>
                                <li className="slider-rating">1</li>
                                <li className="slider-rating">2</li>
                                <li className="slider-rating">3</li>
                                <li className="slider-rating">4</li>
                                <li className="slider-rating">5</li>
                            </ul>
                        </div>
                        <label htmlFor="reliability">In terms of wants/needs/concerns, how reliable was the venue?</label>
                    </div>
                    <div className="create-input">
                        <div className="slider">
                            <input onChange={(e) => setDiscount(e.target.value)} type="range" min="0" max="5" />
                            <output>{reviewDiscount}</output>
                            <ul className="slider-background">
                                <li className="slider-rating">N/A</li>
                                <li className="slider-rating">1</li>
                                <li className="slider-rating">2</li>
                                <li className="slider-rating">3</li>
                                <li className="slider-rating">4</li>
                                <li className="slider-rating">5</li>
                            </ul>
                        </div>
                        <label htmlFor="discount">Did the band have a food/drink tab and/or get a discount on food/drinks/etc?</label>
                    </div>
                    <div className="create-input">
                        <input onChange={(e) => setComments(e.target.value)} type="text" maxLength="500" placeholder="Comments go here..."/>
                        <label htmlFor="comments">Any other comments about your time at the venue?</label>
                    </div>
                    <button onClick={postReview} className="create-submit">Submit</button>
                </div>
            </div>
        )
    } else {
        navigate(`/Login`)
    }
}

export default Create