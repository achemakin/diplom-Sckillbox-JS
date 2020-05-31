import React from 'react';
import { Link, useParams } from 'react-router-dom';

import './photo_page.scss';

const Photo_page = (props) => {
  const { images, likedPhoto } = props;
  const { id } = useParams();
  const idNext = (id == images.length-1) ? parseInt(id) : parseInt(id)+1;
  const classNext = (id == images.length-1) ? 'link__next off' : 'link__next';
  const idPrevious = (id == 0) ? parseInt(id) : parseInt(id)-1;
  const classPrevious = (id == 0) ? 'link__previous off' : 'link__previous';

  let date = images[id].created_at[8] + images[id].created_at[9] + '.' + images[id].created_at[5] + images[id].created_at[6] + '.' + images[id].created_at[0] + images[id].created_at[1] + images[id].created_at[2] + images[id].created_at[3];
  let liked = (images[id].liked_by_user) ? 'user__img-like liked' : 'user__img-like';  
  
  return (
    <div className='app__photo photo'> 
      <img className="photo__img" src= {images[id].urls.full} />

      <div className="photo__user user">
        <div className='user__logo'>
          <img className="user__img" src= {images[id].user.profile_image.medium} />
          
          <h3 className="user__name"> 
            Foto by
            <a href={images[id].user.links.html} target="_blank"> {images[id].user.name} </a> 
            on
            <a href="https://unsplash.com" target="_blank"> Unsplash </a>
          </h3>
        </div>     
        
        <p className="user__public-date">Дата публикации: 
          <time dateTime={images[id].created_at}> {date} </time>
        </p>

        <button className={ liked } type="button" onClick={event => likedPhoto(images[id].id)}> {images[id].likes}</button>
      </div>

      <div className='photo__links link'>
        <Link to={"/photo_tape/auth/foto_page/" + idPrevious} className={classPrevious} />
        
        <Link to='/photo_tape/auth' className='link__back' />

        <Link to={"/photo_tape/auth/foto_page/" + idNext} className={ classNext } />
      </div>
    </div>    
  )
}

export default Photo_page;