import React from 'react';
import './app.css';
import axios from 'axios';

class App extends React.Component {
    
    state = { advice : ''  };
    lastAdvice = 'lastAdvice';  
    currentAdvice = 'currentAdvice';

    componentDidMount(){
        this.fetchAdvice();
    }

    fetchAdvice(){ 

        axios.get('https://api.adviceslip.com/advice')
        .then(response => {       
            this.lastAdvice = this.currentAdvice;    
            this.currentAdvice = response.data.slip.advice;    
            this.setState({advice : this.currentAdvice});
            console.log("current :" + this.currentAdvice , "/n Last :" +this.lastAdvice );
            if (this.currentAdvice === this.lastAdvice){this.fetchAdvice()}; 
        })
        .catch((error)=>{
            console.log(error);
        });
            
        
      
    }

    render(){
        const {advice} = this.state;
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