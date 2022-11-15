/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import '../../css/viewpaidorder.css'
import { format } from 'date-fns'
const ViewPaidOrder = ({ closeModal, id }) => {
  console.log(id)
  const { isLoading, error, data } = useQuery({
    queryKey: ['paidOrder'],
    queryFn: async () => {
      const response = await axios.get(`/paidorders/get/${id}`)
      return response.data[0]
    },
  })
  if (isLoading)
    return (
      <div className='modal-paidorder-view'>
        <div className='modal-content-paidorder-view'>loading...</div>
      </div>
    )

  if (error)
    return (
      <div className='modal-paidorder-view'>
        <div className='modal-content-paidorder-view'>error</div>
      </div>
    )
  console.log(data)
  return (
    <div className='modal-paidorder-view'>
      <div className='modal-content-paidorder-view'>
        <div className='modal-paidorder-header'>
          <h1>ORDER INFORMATION</h1>
        </div>
        <div className='c'>
          <h4>
            DATE: <span>{format(new Date(data.date_added), 'P')}</span>
          </h4>
          <h4>
            ORDER ID: <span>{data.id}</span>
          </h4>
        </div>
        <div className='modal-paidorder-row'>
          <div>
            <h4>
              CUSTOMER NAME: <span>{data.cname}</span>
            </h4>
            <h4>
              ADDRESS:
              <span>
                {data.street} {data.barangay} {data.city} {data.region}{' '}
                {data.country} {data.postal}
              </span>
            </h4>
            <h4>
              CONTACT NO: <span>{data.contact}</span>
            </h4>
            <h4>
              TOTAL PRICE: <span>P {data.tprice}</span>
            </h4>
            <h4>
              QUANTITY: <span>{data.quantity}</span>
            </h4>
            <h4>
              PAYMENT METHOD<span>{data.pmethod}</span>
            </h4>
          </div>
          <div>
            <h4>
              PRODUCT NAME: <span>{data.pname}</span>
            </h4>
            <h4>
              SIZE: <span>{data.psize}</span>
            </h4>
            <h4>
              COLOR: <span>{data.pcolor}</span>
            </h4>
            <h4>
              CATEGORY: <span>{data.pcategory}</span>
            </h4>
            <h4>
              DELIVERY METHOD: <span>{data.pmethod}</span>
            </h4>
            <h4>
              STORE: <span>{data.st_name}</span>
            </h4>
          </div>
        </div>
        <div className='modal-paidorder-footer'>
          <button onClick={closeModal}>CLOSE</button>
        </div>
      </div>
    </div>
  )
}

export default ViewPaidOrder
