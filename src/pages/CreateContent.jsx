import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateContent() {
  const navigate = useNavigate();
  const [date, setDate] = useState();
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
    const localTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    setDate(localTime);
  }, []);
  const [data, setData] = useState({
    title: "",
    desc: "",
    status: "IDEA",
    contentType: "ARTICLE",
    dateCreated: "",
    url: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
      dateCreated: date,
    });
  };
  const uploadData = async () => {
    axios.post(`${import.meta.env.VITE_API_URL}`, data);
    navigate("/");
  };
  console.log(data);
  return (
    <div className="create">
      <div className="createPage">
        <h1>Create a Content Idea</h1>
        <div className="inputContainer">
          <div>
            <label htmlFor="title">TITLE</label>
            <input
              value={data.title}
              name="title"
              id="title"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="desc">DESCRIPTION</label>
            <textarea
              value={data.desc}
              name="desc"
              id="desc"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="status">STATUS</label>
            <select
              value={data.status}
              name="status"
              id="status"
              onChange={handleChange}
            >
              <option value="IDEA">IDEA</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="PUBLISHED">PUBLISHED</option>
            </select>
          </div>
          <div>
            <label htmlFor="content">CONTENT TYPE</label>
            <select
              value={data.contentType}
              name="contentType"
              id="content"
              onChange={handleChange}
            >
              <option value="ARTICLE">ARTICLE</option>
              <option value="VIDEO">VIDEO</option>
              <option value="COURSE">COURSE</option>
              <option value="CONFERENCE_TALK">CONFERENCE TALK</option>
            </select>
          </div>
          <div>
            <label htmlFor="link">LINK TO CONTENT</label>
            <input
              value={data.url}
              name="url"
              id="link"
              type="text"
              onChange={handleChange}
            />
          </div>
          <button onClick={uploadData}>SUBMIT</button>
        </div>
      </div>
    </div>
  );
}
