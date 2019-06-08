import jsonPlaceHolder from "../apis/jsonPlaceHolder";
import _ from 'lodash';



export const fetchPosts = () => {
  return async dispatch => {
    const resp = await jsonPlaceHolder.get("/posts");
    dispatch({ type: "FETCH_POSTS", payload: resp.data });
  };
};

//////////// THE MEMOIZE VERSION \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//On _.memoize notre fonction d 'appel a l'api a l'exterieur de l'action car si on le met dedans :
// on va recreer une nouvelle fonction a chaque utilisation de l'action donc memoize sera useless

export const fetchUser = id => {
  return  dispatch => {
    _fecthuser(id, dispatch);
  };
};

const _fecthuser =  _.memoize(async (id, dispatch) =>  {
  const resp = await jsonPlaceHolder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: resp.data });

});

///////////// VERSION *Super fetch* \\\\\\\\\\\\\\\\
// on va remplacer les fetchuser par les fetchpostandUser dans tous les composants

/* export const fetchPostsAndUsers = () => {
  return async (dispatch , getState) => {
    await dispatch(fetchPosts());

    _.chain(getstate().posts)
      .map('userId)
      .uniq()
      .forEach(id => dispatch(fetchUser(id)))
      .value()
  };
}; 

 export const fetchUser = (id) => {
    return async dispatch => {
      const resp = await jsonPlaceHolder.get(`/users/${id}`)
      dispatch({type : "FETCH_USER", payload : resp.data})
    }
} */