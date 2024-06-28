import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";

const tableStyle = {
  border: "1px solid red",
  borderCollapse: "collapse",
  width: "100%"
};

const cellStyle = {
  border: "1px solid red",
  padding: "8px",
  textAlign: "left"
};

const containerStyle = {
  width: "90%",
  marginTop: "30px",
  // border: "1px solid red",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px"
};

const buttonAdd = {
  backgroundColor: "green",
  color: "white",
  cursor: "pointer"
}


function App() {
  const [data, setData] = useState([]);

  const [text, setText] = useState({
    title: "",
    price: "",
    category: "",
    rating: "",

  });

  console.log("text", text);
  console.log("data", data);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setData(data);
    } catch (err) {

    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (list) => {
    const result = data.filter((item)=>{
           return item.id != list
    })
     setData(result);
  }

  const handleAdd = () => {
    const Id = data.length+1
    console.log("Id", Id);
    const payload = { ...text, id: Id };
    setData((prev) => [...prev, payload])
  }

  return (
    <div className="App">
      <div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={cellStyle}>id</th>
              <th style={cellStyle}>title</th>
              <th style={cellStyle}>price</th>
              <th style={cellStyle}>rating</th>
              <th style={cellStyle}>category</th>
            </tr>
          </thead>
          <tbody style={{ border: "1px solid red" }}>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td style={cellStyle}>{item.id}</td>
                  <td style={cellStyle}>{item.title}</td>
                  <td style={cellStyle}>{item.price}</td>
                  <td style={cellStyle}>{`Rate: ${item.rating.rate}, Count: ${item.rating.count}`}</td>
                  <td style={cellStyle}>{item.category}</td>
                  <button
                    style={{ padding: "10px", textAlign: "center", marginTop: "10px", cursor: "pointer", backgroundColor: "gray", color: "white" }}
                    onClick={() => handleDelete(item.id)}
                  >Delete</button>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={containerStyle}>
        <input
          placeholder="add title"
          style={{ width: "200px", padding: "10px" }}
          name="title"
          onChange={handleChange}
        />
        <input
          placeholder="add prize"
          style={{ width: "200px", padding: "10px" }}
          name="price"
          onChange={handleChange}
        />
        <input
          placeholder="add rating"
          style={{ width: "200px", padding: "10px" }}
          name="rating"
          onChange={handleChange}
        />
        <input
          placeholder="add category"
          style={{ width: "200px", padding: "10px" }}
          name="category"
          onChange={handleChange}
        />
        <button style={buttonAdd} onClick={handleAdd}>Add Product</button>
      </div>
    </div>

  );
}

export default App;
