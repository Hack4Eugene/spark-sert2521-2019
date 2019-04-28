export default () => {
  if (window.localStorage.getItem('token')) {
    return { Authorization: `Bearer ${window.localStorage.getItem('token')}` };
  }
};
// grab token from window.localstorage.token
// append to header
