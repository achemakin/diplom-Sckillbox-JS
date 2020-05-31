export const addImages = state => {  
  return {
    type: 'ADD_IMAGES',
    images: state
  }
}

export const likedPhoto = state => {
  return {
    type: 'LIKED_PHOTO',
    id: state
  }
}