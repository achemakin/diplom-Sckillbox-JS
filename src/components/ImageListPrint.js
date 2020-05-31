import React from 'react';
import { Link } from 'react-router-dom';

import { listPhoto } from '../unsplash';

let isResizeble = false;

class ImageListPrint extends React.Component {
  constructor(props) {
    super(props);

    this.loadImages = this.loadImages.bind(this);
    this.pageScroll = this.pageScroll.bind(this);
  }

  componentDidMount() {
    if(!isResizeble) {
      this.loadImages();
      isResizeble = true;
    };

    window.addEventListener('scroll', this.pageScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.pageScroll);
  } 

  loadImages() {
    const start = this.props.images.length + 1;
    const images = listPhoto(start, localStorage.getItem('token'));
    images.then(img => this.props.addImages(img));
  }

  pageScroll() {
    let scrollHeight = Math.max(
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight,
          document.body.clientHeight, document.documentElement.clientHeight
        ), 
        scrollTop = window.pageYOffset,
        clientHeight = document.documentElement.clientHeight;

   if (scrollHeight - scrollTop == clientHeight) {
      this.loadImages();
    }
  }

  render() {
    return (
      <div className="ImageListPrint">
        <ul className="app__grid grid">
          {
            this.props.images.map((img, i) => {          
              let span = "span " + parseInt((img.height*400/img.width)/30+5.5);
              let date = img.created_at[8] + img.created_at[9] + '.' + img.created_at[5] + img.created_at[6] + '.' + img.created_at[0] + img.created_at[1] + img.created_at[2] + img.created_at[3];
              let liked = (img.liked_by_user) ? 'user__img-like liked' : 'user__img-like';
              
              return (
                <li className="grid__item" key={img.id} style={{gridRowEnd: span}}>
                  <div className="grid__name name">
                    <img className="name__img" src= {img.user.profile_image.small} />
                    <h2 className="name__title"> 
                      Foto by
                      <a href={img.user.links.html} target="_blank"> {img.user.name} </a> 
                      on
                      <a href="https://unsplash.com" target="_blank"> Unsplash </a>
                    </h2>
                  </div>
                  
                  <Link className="grid__link-img" to={"/photo_tape/auth/foto_page/" + i} >
                    <img className="grid__img" src= {img.urls.small} /> 
                  </Link>               
                  
                  <div className="grid__user user">
                    <p className="user__public-date">Дата публикации: 
                      <time dateTime={img.created_at}> {date} </time>
                    </p>

                    <button className={ liked } type="button" onClick={event => this.props.likedPhoto(img.id)}> {img.likes}</button>
                  </div>                   
                </li>            
              )
            })
          }
        </ul>
      
        <button className="btn" type="button" onClick={this.loadImages}>Загрузить еще</button>
      </div>
    )          
  }
}  

export default ImageListPrint;