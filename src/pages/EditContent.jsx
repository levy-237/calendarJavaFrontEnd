import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    desc: "",
    status: "",
    contentType: "",
    dateCreated: "",
    url: "",
  });
  const [fetchedData, setFetchData] = useState();
  const fetchContent = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const editData = async () => {
    axios.put(`${import.meta.env.VITE_API_URL}/${id}`, data);
    navigate("/");
  };
  console.log(data);
  return (
    <div className="create">
      <div className="createPage">
        <h1>Update dontent data</h1>
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
          <button onClick={editData}>SUBMIT</button>
        </div>
      </div>
    </div>
  );
}
