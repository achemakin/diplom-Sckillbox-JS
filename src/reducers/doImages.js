import { likePhoto, unlikePhoto } from '../unsplash';

const doImages = (state = [], action) => {
  switch(action.type) {
    case 'ADD_IMAGES':      
      return [...state, ...action.images]
       
    case 'LIKED_PHOTO': 
      return state.map((img) => {
        if(img.id === action.id) {
          console.log(img);
          if (img.liked_by_user) {
            img.liked_by_user = false;
            img.likes = img.likes - 1;                      
            unlikePhoto(action.id, localStorage.getItem('token'));
            console.log(img);
            return img;                                                 
          } else {
            img.liked_by_user = true;
            img.likes = img.likes + 1;                      
            likePhoto(action.id, localStorage.getItem('token')); 
            console.log(img);
            return img;                                    
          }    
        }        
        return img;
      })
      
    default:
      return state;
  }
}

export default doImages;