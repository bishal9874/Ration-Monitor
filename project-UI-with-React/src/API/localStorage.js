import Cookies from 'js-cookie';

const storeToken = (value) => {
  if (value) {
    const { access, refresh} = value;
    Cookies.set('access_token', access);
    Cookies.set('refresh_token', refresh);

  }
};

const getverify = (value) => {
  if (value) {
    const { isfaceverify } = value;
    Cookies.set('isfaceVerify', isfaceverify);
  }
};

const getToken = () => {
  const access_token = Cookies.get('access_token');
  const refresh_token = Cookies.get('refresh_token');
  return { access_token, refresh_token };
};

const removeToken = () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
};

const getIsverifyFace =() =>{
    const isfaceVerify = Cookies.get('isfaceVerify');
    return isfaceVerify
}

export { storeToken, getToken, removeToken,getIsverifyFace,getverify };
