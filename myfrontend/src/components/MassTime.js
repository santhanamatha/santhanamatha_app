import React, { useState, useEffect } from 'react';
import '../App.css';
import { Helmet } from 'react-helmet';
 

const MassTime = () => {
    return (
        <div className="container-flued">
            <Helmet>
                <title>MassTime</title>
            </Helmet>
            <div className="ffbox mb-5 card_align mass-res"> 
                <div className="ffbox1 p-5 background-container"> 
                <div>
                    <h1 className="gfg mt-4 v_title">திருப்பலி நேரம்</h1>
                    <h2 className="weekdays"> Week Days </h2> 
                    <h4 className=" days"> Monday, Wednesday, Thursday </h4>
                    <h5 className="tcontent">- 6.30 am : Holy Mass in Tamil<br /></h5>
                    <h4 className="days"> Tuesday, Friday </h4>
                    <h5 className="tcontent">- 6.30 pm : Holy Mass in Tamil<br /></h5>
                </div>
                <div className="ttopdic">
                    <h2 className="weekdays"> All Saturday </h2> 
                    <h5 className="tcontent">- 6. 00 pm : Rosary and Holy Mass in Tamil<br /></h5>
                </div>
                <div className="ttopdic">
                    <h2 className="weekdays"> All Sunday </h2> 
                    <h5 className="tcontent">- 8.00 am : Holy Mass in Tamil<br /></h5>
                </div>
                <div className="ttopdic">
                    <h2 className="weekdays"> First Saturday </h2> 
                    <h5 className="tcontent">- 6.00 pm : Rosary, procession around the church, Blessed sacrament, St Anne's prayer, Holy Mass in Tamil and Food providing<br /></h5>
                </div>
                </div>
            </div>
        </div>
    );
};

export default MassTime;