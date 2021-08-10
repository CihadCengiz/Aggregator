import React from 'react';
import './App.css';
import Navigation from './Navigation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Internships from './Internships';
import Faq from './Faq';
import Home from './Home';
import Contact from './Contact';
import Footer from './Footer';


function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/internships" component={Internships} />
          <Route path="/Faq" component={Faq} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
