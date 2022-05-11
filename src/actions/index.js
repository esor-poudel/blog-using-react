
import JsonPlaceHolder from "../components/api/JsonPlaceHolder";
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch,getState) => {
  await dispatch(fetchPosts());
//  const userId =  _.uniq(_.map(getState().posts,'userId'));
//  userId.forEach(id=> dispatch(fetchUser(id)));

 _.chain(getState().posts)
 .map('userId')
 .uniq()
 .forEach(id=>dispatch(fetchUser(id)))
 .value();
};

export const fetchPosts =  () => async dispatch => {
        const resposne =  await  JsonPlaceHolder.get('/posts');
        dispatch({type:'FETCH_POSTS',payload:resposne.data})   
 };

 export const fetchUser = (id) => async dispatch => {
  const response = await JsonPlaceHolder.get(`/users/${id}`);
  dispatch({type: "FETCH_USER", payload:response.data})
 };

 



//  export const fetchUser = (id) => dispatch => {
//   _fetchUser(id,dispatch);
// };

// const _fetchUser = _.memoize(async (id,dispatch) => {
//    const response = await JsonPlaceHolder.get(`/users/${id}`);
//    dispatch({type: "FETCH_USER", payload:response.data})
// });