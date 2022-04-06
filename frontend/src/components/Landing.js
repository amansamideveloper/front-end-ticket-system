import React from 'react'

function Landing() {
    return (
        <div id="booking" className="section">
            <div className="section-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="booking-cta">
                                <h1>Book your Bus today</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate laboriosam numquam at</p>
                            </div>
                        </div>
                        <div className="col-md-7 col-md-offset-1">
                            <div className="booking-form">
                                <form>
                                    <div className="form-group">
                                        <div className="form-checkbox">
                                            <label for="roundtrip">
                                                <input type="radio" id="roundtrip" name="flight-type" />
                                                <span></span>Roundtrip
                                            </label>
                                            <label for="one-way">
                                                <input type="radio" id="one-way" name="flight-type" />
                                                <span></span>One way
                                            </label>
                                            <label for="multi-city">
                                                <input type="radio" id="multi-city" name="flight-type" />
                                                <span></span>Multi-City
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <span className="form-label">Flying from</span>
                                                <input className="form-control" type="text" placeholder="City or airport" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <span className="form-label">Flyning to</span>
                                                <input className="form-control" type="text" placeholder="City or airport" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <span className="form-label">Departing</span>
                                                <input className="form-control" type="date" required />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <span className="form-label">Returning</span>
                                                <input className="form-control" type="date" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <span className="form-label">Adults (18+)</span>
                                                <select className="form-control">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                </select>
                                                <span className="select-arrow"></span>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <span className="form-label">Children (0-17)</span>
                                                <select className="form-control">
                                                    <option>0</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                </select>
                                                <span className="select-arrow"></span>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <span className="form-label">Travel className</span>
                                                <select className="form-control">
                                                    <option>Economy className</option>
                                                    <option>Business className</option>
                                                    <option>First className</option>
                                                </select>
                                                <span className="select-arrow"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-btn">
                                        <button className="submit-btn">Show flights</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing