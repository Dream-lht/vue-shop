import axios from 'axios';
import qs from 'qs';

function http (method, url, param) {
  param = param && typeof param === 'object' ? param : {};
  const config = {
      baseURL:'http://127.0.0.1:8888/api/private/v1',
      url: url,
      method: method,
      transformRequest: [function (param) {
          return qs.stringify(param);
      }],
      headers: {
          'X-Requested-With': 'XMLHttpRequest'
      }
  };

  // post请求时需要设定Content-Type
  if (method === 'post') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
      config.data = param;
  } else if (method === 'get') {
      config.params = param;
  }

  return axios(config);
}

export {
  http
};