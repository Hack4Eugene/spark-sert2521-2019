export default () => {
  if (window.localStorage.getItem('token')) {
    return { Authorization: `Bearer ${window.localStorage.getItem('token')}` };
  }

  // is there a way to send an error or something better than a string?
  return 'User Not Logged In';
};
// grab token from window.localstorage.token
// append to header
