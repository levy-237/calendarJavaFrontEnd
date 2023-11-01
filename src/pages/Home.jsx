import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Home() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="contentContainer">
      {data.map((x, i) => (
        <div className="contentBody" key={i}>
          <Link to={`/${x.id}`}>
            <h4>{x.title}</h4>
            <p>{x.desc.slice(0, 350)}...</p>
            <br />
            <div className="contentBottom">
              <div>
                Created on: <b>{x.dateCreated.slice(0, 10)}</b>
              </div>

              <span>
                <span> {x.contentType}</span>
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
