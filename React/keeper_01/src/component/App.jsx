import React from 'react';
import Header from './Header';
import Note from './Note';
import Footer from './Footer';


function App(){
    return( <div>
         <Header/>
         <Note head ="Today's Note :(" text="I am happpy Today**"/>
         <Note head ="Tommorow's Note :(" text ="I will be happy ISA"/>
         <Note head ="Yestarday Note :)" text="That was not my day "/>
         <Footer/>

            </div>
       
    );
}
export default App;