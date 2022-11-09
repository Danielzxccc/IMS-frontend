/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const ProductItems = ({
  products,
  setProducts,
  query,
  openViewModal,
  openEditModal,
  openDeleteModal,
  reload,
}) => {
  const { isLoading, error } = useQuery({
    queryKey: ['Products', reload],
    queryFn: async () => {
      const response = await axios.get('/products/get')
      setProducts(response.data)
      return response.data
    },
  })

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <>
      {products
        .filter((asd) => asd.pname.toLowerCase().includes(query))
        .map((item, index) => (
          <div className='product-item' key={index}>
            <img src={item.pimageurl} width={300} height={300} />
            <div className='product-info'>
              <p>Product Name: {item.pname}</p>
              <p>Category: {item.pcategory}</p>
            </div>
            <div className='product-actions'>
              <div className='action-div1'></div>
              <div
                className='action-div2'
                onClick={() => openViewModal(item.id)}
              >
                VIEW MORE
              </div>
              <div className='action-div3'>
                <i
                  className='bi bi-pencil-square'
                  onClick={() => openEditModal(item.id)}
                ></i>
                <i
                  className='bi bi-trash3-fill'
                  onClick={() =>
                    openDeleteModal(item.id, item.pname, item.pimagename)
                  }
                ></i>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export default ProductItems
