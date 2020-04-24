import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPosts = () => {
    // const response = await jsonPlaceholder.get('/posts');
  
    return {
    type: "FETCH_POSTS"
    // playload: response
  };
};
