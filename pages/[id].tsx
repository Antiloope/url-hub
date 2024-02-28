import { useEffect } from 'react';

const domain: string = 'https://au5yix9j75.execute-api.us-east-1.amazonaws.com/Prod';
const linkResource: string = '/link'

const Redirect = () => {

  useEffect(() => {
    const redirectToExternalUrl = () => {
      const currentUrl = window.location.href;
      const idMatch = currentUrl.match(/\/(\w+)$/);
      const redirectId = idMatch ? idMatch[1] : null;

      const url: string = domain + linkResource + '/' + redirectId;
      setTimeout(() => {
        window.location.href = url;
      }, 2000);
    };

    redirectToExternalUrl();
  }, []);


  return (
    <div>
      <h1>Redirect</h1>
    </div>
  );
};

export default Redirect;