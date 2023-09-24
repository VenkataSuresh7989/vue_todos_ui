import axios from 'axios';
import { store } from '../../store/index.js';

export async function displayPageInfo(method, url, data=[]) {
  try {
    let headers = { 'Content-Type': 'application/json' };
    if((sessionStorage.getItem("auth_token") != undefined) && (sessionStorage.getItem("auth_token") != null))
    {
      let tokenKey = "auth_token" + sessionStorage.getItem("auth_token").toString();
      let token = localStorage.getItem(tokenKey.toString())
      
      if ((token != undefined) && (token != null)) {
        headers['Authorization'] = `Bearer ${token.toString()}`;
      }
    }    

    let response = await axios({
      method: method,
      url: axios.defaults.baseURL.toString() + url.toString(),
      data: data,
      headers: headers,
    });  

    if(response)
      return response.data;

  } catch (error) {
    store.state.gblConsolePrints.push(error);
    throw error;
  }
}

export function chgDataValidation(storeMethod = '', chgData = {}) {
  let data = [];
	if (Object.keys(chgData).length > 0) {
		let orgInfo = JSON.parse(localStorage.getItem(storeMethod.toString() + sessionStorage.getItem("auth_token").toString()));
		for (let chgVal in chgData) {
			if (orgInfo[chgVal.toString()] == chgData[chgVal.toString()].value) {
        delete chgData[chgVal];
			}
		}

		if (Object.keys(chgData).length > 0) {
			for (let item in chgData) {
				data.push({ 'key': item, 'value': chgData[item]['value'] });
			}
      
      let result = {};
      data.forEach(item => {
        result[item.key] = item.value;
      });
			return [result];
		} 
    else 
      return data;
	}
  else
    return data;
}
