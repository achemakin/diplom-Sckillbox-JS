import React from 'react';
import { authenticationUrl } from '../unsplash';

class Start extends React.Component {
  goAuth() {
    location.assign(authenticationUrl);
  }

  render() {   
    return (
      <div className="Start">
        <button className="btn js-btn" type="button" onClick={this.goAuth}>Авторизоваться на Unsplash.com</button>
      </div>
    )          
  }
}

export default Start;