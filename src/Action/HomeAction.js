import { HomeReducer } from "../Config/ReducerKeys";
import { BASE_URL } from '../Config/Config';

const userListUrl = 'api/users?page='
export const getApiData = async (dispatch, PageCount, apiListData) => {
    try {
        dispatch({
            type: HomeReducer.IS_LOADING,
            payload: true
        })

        const myHeaders = new Headers();
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`${BASE_URL}${userListUrl}${PageCount}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                let res = JSON.parse(result)
                if (PageCount <= res.page) {
                    dispatch({
                        type: HomeReducer.API_LIST_DATA,
                        payload: [...apiListData, ...res.data]
                    })
                }

            })
            .catch(error => console.log('error', error));

        dispatch({
            type: HomeReducer.IS_LOADING,
            payload: false
        })
    } catch (e) {
        dispatch({
            type: HomeReducer.API_LIST_DATA,
            payload: []
        })
        dispatch({
            type: HomeReducer.IS_LOADING,
            payload: false
        })
    }
}

export const clearApiData = async (dispatch) => {
    dispatch({
        type: HomeReducer.API_LIST_DATA,
        payload: []
    })
}

export const addDataToList = async (dispatch, content, apiListData) => {
    let obj = {
        email:content
    }
    dispatch({
        type: HomeReducer.API_LIST_DATA,
        payload: [obj, ...apiListData]
    })
}


