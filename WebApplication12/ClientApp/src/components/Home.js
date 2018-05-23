import React from 'react';
import { connect } from 'react-redux';

const Home = props =>
  <div>
    <h1>Welcome to Chatalo!</h1>
    <p>Here you can communicate with other about your interests, people from all over the world!</p>
    <ul>
      <li>Read and post to our forums</li>
      <li>Talk to others instantly via our chat channels</li>
    </ul>
    <p>Have Fun!</p>
 </div>;

Home.displayName = 'Home';
export default connect()(Home);
