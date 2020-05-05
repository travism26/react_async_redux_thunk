import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  console.log("About to fetch posts");
  await dispatch(fetchPosts());
  
  const userids = _.uniq(_.map(getState().posts, 'userId'));
  console.log(userids);
  userids.forEach(id => dispatch(fetchUser(id)));
};


// child actions // 
export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};

// this is not the best solution?
// pitfall of this solution: you cannot research another user again since we memoize it...
// can only fetch each user one time...

// Memoized version!!
// export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });

// need a better solution, search users multiple times if needed.
