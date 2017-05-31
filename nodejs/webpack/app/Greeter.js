// Greeter.js
import React, {Component} from 'react'
import config from './config.json';
import styles from './Greeter.css';

class Greeter extends Component{
  componentDidMount() {
    console.log('componentDidMount')
  }

  render() {    
    return (
      <div className={styles.root}>
        <p>
          {config.greetText}
        </p>
      </div>
    );
  }
}

export default Greeter