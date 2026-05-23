import React from 'react';
import Heading from './Heading';
import Card from './Card';
function App(){
    return( <div >
         <Heading/>
        
        <Card 
        name="Name:schoolBoy" 
        img ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqAbh_gXnSlpOwVsDjYm8Oi7GY1npbIoBJEg&s"
        phone="Phone:123456"
        email="Email:boy78@gmail.com"

          />
         <Card 
        name="Name:schoolGirl" 
        img ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsDXzQIHax2IYtOZWFgkyZWPGO5ip6N9yS-Q&s"
        phone="Phone:6789"
        email="Email:girl85@gmail.com"

          />  
             <Card 
        name="Name:femBoy" 
        img ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqAbh_gXnSlpOwVsDjYm8Oi7GY1npbIoBJEg&s"
        phone="Phone:215478"
        email="Email:femboyl85@gmail.com"

          /> 
           <Card 
        name="Name:schoolGirl" 
        img ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsDXzQIHax2IYtOZWFgkyZWPGO5ip6N9yS-Q&s"
        phone="Phone:6789"
        email="Email:girl85@gmail.com"

          /> 
         <Card 
        name="Name:schoolBoy" 
        img ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqAbh_gXnSlpOwVsDjYm8Oi7GY1npbIoBJEg&s"
        phone="Phone:123456"
        email="Email:boy78@gmail.com"

          />   
            

    </div>
          
    );
}
export default App;