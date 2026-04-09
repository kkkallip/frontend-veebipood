import { useState } from "react";
import { Product } from "../../models/Product";

function AddProduct() {
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    active: false,
    stock: 0,
    category: {
      name: ""
    }
  });

  const addProduct = () => {
    fetch(import.meta.env.VITE_BACK_URL + "/products", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(() => alert("Toode lisatud!"));
  }

  return (
    <div>
      <label>Name</label> <br />
      <input onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} type="text" /> <br />
      <label>Description</label> <br />
      <input onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} type="text" /> <br />
      <label>Price</label> <br />
      <input onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})} type="number" /> <br />
      <label>Active</label> <br />
      <input onChange={(e) => setNewProduct({...newProduct, active: e.target.checked})} type="checkbox" /> <br />
      <label>Stock</label> <br />
      <input onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})} type="number" /> <br />
      <label>Category</label> <br />
      {/* <select>
        {categories.map(category => <option></option>)}
      </select> */}
      <button onClick={addProduct}>Add product</button>
    </div>
  )
}

export default AddProduct