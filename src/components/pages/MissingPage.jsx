import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'

const MissingPage = () => {
  return (
    <section id='dashboard'>
      <nav>
        <Sidebar />
      </nav>
      <main>
        <h1>missing page</h1>
      </main>
    </section>
  )
}

export default MissingPage
