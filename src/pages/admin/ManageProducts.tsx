import { useEffect, useState } from "react"
import type { Product } from "../../models/Product";

function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_BACK_URL + "/products")
      .then(res => res.json())
      .then(json => setProducts(json)) 
  }, []);

  const deleteProduct = (productId: number) => {
    fetch(import.meta.env.VITE_BACK_URL + "/products/" + productId, {
      method: "DELETE"
    }).then(res => res.json())
      .then(json => setProducts(json));
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Active</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => 
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.active}</td>
              <td>{product.stock}</td>
              <td>{product.category?.name}</td>
              <td><button>Edit</button></td>
              <td><button onClick={() => deleteProduct(Number(product.id))}>x</button></td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default ManageProducts