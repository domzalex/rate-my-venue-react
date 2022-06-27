import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


function Home(props) {

    


    ////////////////
    // This is insurance to make sure that props.venues is defined; runs conditional to check type and then permanently instantiates it into its own local variable (allVenues)
    ////////////////
    const allVenues = []
    if (typeof props.venues !== 'undefined') {
        props.venues.forEach(name => {
            allVenues.push(name)
        })
    }

    useEffect(() => {
        window.scrollTo({ behavior: 'smooth', top: '0px' });
    }, [])

    ////////////////
    // Sets state so when the input field changes, selectedVenue changes in the main App as well
    ////////////////
    const [selectedVenue, venueSelect] = useState()


    return (
        <div className="home-container">
            <main id="heading-container">
                <h1 className="home-heading">music venues <i>honestly</i> rated.</h1>
                <div className="heading-inner-container">
                    <form autoComplete="off" className="main-search-form">
                        <input name="venue" className="venue-search" type="search" placeholder="select a venue from the list..." list="venue-list" value={selectedVenue} onChange={e => props.venueSelect(e.target.value)}/>
                        <NavLink className="home-submit" to="/venue">Go</NavLink>
                    </form>

                    {/* Temporary 'submit' button since the TRUE submit button causes the form to POST; trying to figure out a better solution */}
                    
                    <h2>...or, leave a <NavLink className="review-link" to="/create">review</NavLink></h2>
                </div>
                <datalist id="venue-list">
                  {allVenues.map(name => {
                    return (
                      <option>{name}</option>
                    )
                  })}
                </datalist>
            </main>
        </div>
    )
}

export default Home