import { useEffect, useState } from "react"
import type { Product } from "../models/Product";

// renderdamine --> esmakordne componendi peale tulek
// re-renderdamine --> componendi HTMLs muutujate olekute muutmine

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [sort, setSort] = useState("id,asc")
  // let products = [];
  // products = json

  // uef --> enter
  // onLoad funktsioon
  useEffect(() => {
    fetch(import.meta.env.VITE_BACK_URL + `/products?page=${page}&size=${size}&sort=${sort}`) // URL kuhu läheb päring
      .then(res => res.json()) // kogu tagastus
      .then(json => {
        setProducts(json.content);
        setTotalElements(json.totalElements);
        setTotalPages(json.totalPages);
      }) // response-i body
  }, [page, size, sort]);

  const sizeHandler = (newSize: number) => {
    setSize(newSize);
    setPage(0);
  }

  const sortHandler = (newSort: string) => {
    setSort(newSort);
    setPage(0);
  }

  return (
    <div>
      <div>{page * size + 1} - {(page + 1) * size > totalElements ? totalElements : (page + 1) * size} kuvatud {totalElements}-st</div>

      <select onChange={(e) => sizeHandler(Number(e.target.value))}>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
      <br/><br/>
      <button onClick={() => sortHandler("id,asc")}>Sorteeri Vanemad Enne</button>
      <button onClick={() => sortHandler("id,desc")}>Sorteeri Uuemad Enne</button>
      <button onClick={() => sortHandler("name,asc")}>Sorteeri A-Z</button>
      <button onClick={() => sortHandler("name,desc")}>Sorteeri Z-A</button>
      <button onClick={() => sortHandler("price,asc")}>Sorteeri Soodsamasd Enne</button>
      <button onClick={() => sortHandler("price,desc")}>Sorteeri Kallimad Enne</button>

      {products.map(product => 
        <div key={product.id}>
          {product.name} - {product.price}€
        </div>)}

        <button disabled={page === 0} onClick={() => setPage(page - 1)}>Eelmine</button>
        <span>{page + 1} / {totalPages}</span>
        <button disabled={page + 1 === totalPages} onClick={() => setPage(page + 1)}>Järgmine</button>
    </div>
  )
}

export default HomePage