import React from 'react';

function Card(props){
    return( <div className ="note">
        
        <h2 >{props.name}</h2>
        <img src={props.img}
        alt=" image_boy"/>
        <p>{props.phone}</p>
        <p>{props.email}</p>
    </div>

    );

}
export default Card;