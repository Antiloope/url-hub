import { useState } from 'react';
import axios from 'axios';

const domain: string = 'https://au5yix9j75.execute-api.us-east-1.amazonaws.com/Prod';
const linkResource: string = '/link'

const Landing = () => {
  const [responseLinkList, setResponseLinkList] = useState<{url: string, id: string}[]>([]);
  const [inputNewLinkValue, setInputNewLinkValue] = useState<string>("");

  const getAllLinks = async () => {
    try {
      const response = await axios.get(domain + linkResource);
      setResponseLinkList(response.data);
    } catch (error) {
      console.error('Error fetching links', error);
    }
  };

  const newLink = async () => {
    try {
      const payload = {
        url: inputNewLinkValue
      };
      await axios.post(domain + linkResource, payload);
      await getAllLinks();
    } catch (error) {
      console.error('Error posting new link', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputNewLinkValue(event.target.value);
  };

  const linkElementsList:React.ReactNode[] = [];
  for(const i in responseLinkList) {
    linkElementsList.push(
      <div key={i} className="z-10 max-w-5xl w-full items-center font-mono text-sm lg:flex bg-slate-100 p-2 my-2 text-black border-2 border-blue-300">
        <div className="w-full p-2 text-black">{responseLinkList[i]['url']}</div>
        <div className="w-1/2 p-2 text-black border-l-2 border-blue-300">{responseLinkList[i]['id']}</div>
      </div>);
  }
  
  return (
    <main className="flex flex-col items-center justify-between p-24">
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <button onClick={newLink} className="rounded-full bg-slate-100 w-1/5 py-2 text-black" type="button">New link</button>
        <input className="text-black w-full mx-4 rounded-full p-2" type='text' placeholder="https://www.google.com" name="myInput" onChange={handleInputChange} value={inputNewLinkValue} />
        <button onClick={getAllLinks} className="rounded-full bg-slate-100 w-1/5 py-2 text-black" type="button">Get links</button>
    </div>
    <div className="z-10 max-w-5xl w-full items-center font-mono text-sm lg:flex bg-slate-100	rounded-t-lg p-2 my-2 text-black border-4 border-blue-300">
      <div className="w-full p-2 text-black text-center text-lg"><b>Url</b></div>
      <div className="w-1/2 p-2 text-black border-l-2 border-blue-300 text-center text-lg"><b>ID</b></div>
    </div>
    <div className='z-10 max-w-5xl w-full'>
      {linkElementsList}
    </div>
    </main>
  );
};

export default Landing;
