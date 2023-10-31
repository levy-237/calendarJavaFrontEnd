import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FcDeleteDatabase, FcEditImage } from "react-icons/fc";
import { IconContext } from "react-icons";

export default function Content() {
  const [content, setContent] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchContent = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`);
      setContent(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContent = async () => {
    try {
      const response = axios.delete(`${import.meta.env.VITE_API_URL}/${id}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <>
      {content && (
        <div className="ContentPage">
          <div className="ContentPageContainer">
            <h2>{content.title}</h2>
            <p>{content.desc}</p>
            <br></br>
            <div className="pageContainerBottom">
              <div>
                <section>
                  Content Status:
                  <b>{content.status}</b>
                </section>
                <br />
                <section>
                  Content Type:<span> {content.contentType}</span>
                </section>
              </div>
              <br />

              <div>
                <section>
                  Created on:
                  <b>
                    {content.dateCreated ? (
                      content.dateCreated.slice(0, 10)
                    ) : (
                      <p>09-01-2023</p>
                    )}
                  </b>
                </section>
                <br />
                <section className="contentUrl">
                  {content ? (
                    <>
                      <a target="_blank" href={content.url}>
                        {content.url}
                      </a>
                    </>
                  ) : (
                    <a href="/google.com">Google.com</a>
                  )}
                </section>
              </div>
            </div>
            <div className="icons">
              <section className="iconsEdit">
                <Link to={`/edit/${content.id}`}>
                  <IconContext.Provider value={{ size: "50px" }}>
                    <FcEditImage />
                  </IconContext.Provider>
                  <span>EDIT</span>
                </Link>
              </section>
              <section onClick={deleteContent}>
                <IconContext.Provider value={{ size: "50px" }}>
                  <FcDeleteDatabase />
                </IconContext.Provider>
                <span>REMOVE</span>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
