import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Search() {
  const [keyword, setKeyword] = useState("Platform");
  const [data, setData] = useState();
  const fetchData = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/filter/${keyword}`
    );
    setData(res.data);
  };
  useEffect(() => {
    fetchData();
  }, [keyword]);
  console.log(keyword);
  console.log(data);
  return (
    <>
      <div className="searchDiv">
        <h1> Search project</h1>
        <input
          placeholder="e.g Platform"
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className="contentContainer">
        {data &&
          data.map((x, i) => (
            <Link key={i} to={`/${x.id}`}>
              <div className="contentBody">
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
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}
// ${import.meta.env.VITE_API_URL}
