import React from 'react';
import './app.css';
import axios from 'axios';

class App extends React.Component {
    
    state = { advice : '' , think : false };
    
 

    componentDidMount(){
        this.fetchAdvice();
    }

    fetchAdvice(){ 

        axios.get('https://api.adviceslip.com/advice')
        .then(response => {       
            const lastAdvice = this.state.advice;     
            const currentAdvice = response.data.slip.advice;    
            
            if (currentAdvice === lastAdvice){
                this.fetchAdvice();
                this.setState({think : true});
                
            } else {
                this.setState({advice : currentAdvice , think : false});
            }

            
        })
        .catch((error)=>{
            console.log(error);
        });
            
        
      
    }

    render(){
        const advice = (this.state.think)? 'I am thinking..!' : this.state.advice;
        return (
            <div className="app">
                <div className="card">
                    <h1 className="heading">{advice}</h1>
                    <button className="button" onClick={() => this.fetchAdvice()}>
                        <span>Give ME ADVICE!</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default App;