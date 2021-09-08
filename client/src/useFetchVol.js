import { useReducer, useEffect } from "react";
import axios from "axios";
import {BASE_API_URL} from './BASE_API'


const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
  UPDATE_HAS_NEXT_PAGE: 'update-has-next-page'
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, volunteers: [] };
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, volunteers: action.payload.volunteers, volunteerCount: action.payload.volunteerCount};
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        volunteers: [],
      };
      case ACTIONS.UPDATE_HAS_NEXT_PAGE:
          return { ...state, hasNextPage: action.payload.hasNextPage}
    default:
      return state;
  }
}

export default function useFetchVol(params, page, size) {
  const [state, dispatch] = useReducer(reducer, { volunteers: [], volunteerCount:'', loading: true });

  useEffect(() => {
    const cancelToken1 = axios.CancelToken.source()    
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios.get(`${BASE_API_URL}/volunteers?page=${page}&size=${size}`, { 
        cancelToken: cancelToken1.token,
        params: { page: page, size: size, ...params}
    }).then(res => {
      dispatch({type: ACTIONS.GET_DATA, payload: { volunteers: res.data.content, volunteerCount: res.data.totalVols }});
    }).catch(e => {
        if(axios.isCancel(e)) return
        dispatch({type: ACTIONS.ERROR, payload: { error: e}})
    });
    
    const cancelToken2 = axios.CancelToken.source()
    axios.get(`${BASE_API_URL}/volunteers?page=${page}`, { 
        cancelToken: cancelToken2.token,
        params: { page: page + 1, ...params}
    }).then(res => {
        dispatch({type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: res.data.content.length !== 0 }})
    }).catch(e => {
        if(axios.isCancel(e)) return
        dispatch({type: ACTIONS.ERROR, payload: { error: e}})
    });

    return () => {
        cancelToken1.cancel();
        cancelToken2.cancel();
    }
  }, [params, page, size]);

  return state
}
