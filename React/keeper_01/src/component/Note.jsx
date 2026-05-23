import React from 'react';
function Note(props){

    return (
        <div className = "note">
            <h1>{props.head}</h1>
            <p>{props.text}</p>
        </div>

    );

}
export default Note;