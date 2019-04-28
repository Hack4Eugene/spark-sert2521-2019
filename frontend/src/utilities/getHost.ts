export default () => {
  const isLocal =
    window.location.host.startsWith('127.0.0.1') ||
    window.location.host.startsWith('localhost');

  if (isLocal) return 'http://127.0.0.1:8080';
  else return '';
};
