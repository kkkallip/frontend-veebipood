import { useEffect, useState } from "react"
import type { Category } from "../../models/Category";

function ManageCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Category>({name: ""});

  useEffect(() => {
    fetch(import.meta.env.VITE_BACK_URL + "/categories")
      .then(res => res.json())
      .then(json => setCategories(json)) 
  }, []);

  const deleteCategory = (categoryId: number) => {
    fetch(import.meta.env.VITE_BACK_URL + "/categories/" + categoryId, {
      method: "DELETE"
    }).then(res => res.json())
      .then(json => setCategories(json));
  }

  const addCategory = () => {
    fetch(import.meta.env.VITE_BACK_URL + "/categories", {
      method: "POST",
      body: JSON.stringify(newCategory),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(json => setCategories(json));
  }

  return (
    <div>
      <label>Name</label> <br />
      <input onChange={(e) => setNewCategory({name: e.target.value})} type="text" /> <br />
      <button onClick={addCategory}>Add category</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => 
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td><button onClick={() => deleteCategory(Number(category.id))}>x</button></td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default ManageCategories