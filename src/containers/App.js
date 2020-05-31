import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from "react-router-dom";

import './app.scss';

import ImageListPrint from '../components/ImageListPrint';
import Photo_page from '../components/Photo_page';
import Start from '../components/Start';
import { addImages, likedPhoto } from '../actions';

let App = (props) => {
  const { images, addImages, likedPhoto } = props; 
  
  return (    
    <div className="app">
      <h1 className="app__title">Photo.tape</h1>
    
      <Switch>
        <Route exact path='/photo_tape'>
          <Start />
        </Route>
        
        <Route exact path='/photo_tape/auth'>
          <ImageListPrint images = {images } addImages = { addImages } likedPhoto = { likedPhoto } />
        </Route>

        <Route path='/photo_tape/auth/foto_page/:id' children = {
          <Photo_page images = { images } likedPhoto = { likedPhoto } />
        }></Route>
      </Switch>  
    </div>
  )         
}

const mapStateToProps = state => {  
  return {
    images: state
  } 
}

const mapDispatchToProps = dispatch => {
  return {
    addImages: (images) => dispatch(addImages(images)),
    likedPhoto: (id) => dispatch(likedPhoto(id))
  }
}

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;