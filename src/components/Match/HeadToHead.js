import React from 'react';
import Fixture from '../fixture/Fixture';

const HeadToHead = ({data})=>{
    return (
        <div className="head__to__head">
            <Fixture fixture={data} />
        </div>
    )
}

export default HeadToHead;