import { useEffect, useState } from 'react';
import Cards from '../components/Card';

function Home() {
  const [data, setData] = useState([]);

  const getApi = async () => {
    try {
      const res = await fetch("https://api.tvmaze.com/search/shows?q=all");
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getApi();
  }, []);

  return (
    <div className="Home" style = {{backgroundColor:"grey"}}>
      <div className="poster" style={{display: "flex", flexDirection:"row", flexWrap:"wrap", padding:"20px"}}>
      <Cards/>
      </div>
    </div>
  );
}

export default Home;
