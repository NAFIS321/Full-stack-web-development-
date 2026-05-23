import React from 'react';
import Entry from './Entry';
import emojiPedia from '../emojiPedia';


function cheakEmoji(emojiTerm){           //If we use JS ES6 Arrow function we don't this function any more                      
    return (
         <Entry 
         key = {emojiTerm.id}
         emoji ={emojiTerm.emoji}
         name = {emojiTerm.name}
        description={emojiTerm.meaning}



    />

    );
}

function App() {
return (

        <div>

        <h1>

        <span>emojipedia</span>
        </h1>

        <dl className="dictionary">
        {emojiPedia.map(cheakEmoji)}  
        
        

        </dl>                         

        </div>                       

        );                            
} 

export default App;