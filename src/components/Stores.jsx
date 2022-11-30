import React from 'react'
import '../css/store.css'
import Header from './header/Header'
import Sidebar from './Sidebar'
const Stores = () => {
  return (
    <section id='dashboard'>
      <nav>
        <Sidebar />
      </nav>
      <header>
        <Header title={'STORE'} />
      </header>
      <main>
        <div className='store-wrapper'>
          <div className='store-card'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.8117607578506!2d121.01927281484089!3d14.666621589760458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b74b90d19f77%3A0xe2eea9b7b2334da!2sDBTK%20FLAGSHIP%20STORE!5e0!3m2!1sen!2sph!4v1668063828729!5m2!1sen!2sph'
              width='350'
              height='350'
              style={{ border: 0 }}
              allowFullScreen=''
              loading='lazy'
            ></iframe>
            <h4>
              <span>
                <i className='bi bi-globe'></i>
              </span>{' '}
              <a href='https://dbtkco.com/' target='_blank' rel='noreferrer'>
                https://dbtkco.com/
              </a>
            </h4>
            <h4>
              <span>
                <i className='bi bi-telephone-fill'></i> 0945 577 9652
              </span>
            </h4>
          </div>
          <div className='store-card'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3158.884113226841!2d121.05469539857754!3d14.679520794698915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b73514246a25%3A0x989e04ab1fceff31!2sPingkian%201%2C%20Himlayan%20Ave%2C%20Quezon%20City%2C%201107%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1668613250107!5m2!1sen!2sph'
              width='350'
              height='350'
              style={{ border: 0 }}
              allowfullscreen=''
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
            <h4>
              <span>
                <i className='bi bi-globe'></i>
              </span>{' '}
              <a
                href=' https://www.facebook.com/extnph'
                target='_blank'
                rel='noreferrer'
              >
                https://www.facebook.com/extnph
              </a>
            </h4>
            <h4>
              <span>
                <i className='bi bi-telephone-fill'></i> 0945 577 9652
              </span>
            </h4>
          </div>
          <div className='store-card'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.5867614517406!2d120.99809610000001!3d14.565608099999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c978166749e7%3A0xeea155e7bbdfc86d!2s1049%20Arellano%20Ave%2C%20San%20Andres%20Bukid%2C%20Manila%2C%201004%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1668063544014!5m2!1sen!2sph'
              width='350'
              height='350'
              style={{ border: 0 }}
              allowfullscreen=''
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
            <h4>
              <span>
                <i className='bi bi-globe'></i>
              </span>{' '}
              <a href=' https://www.facebook.com/HGHMNDS/' target='_blank'>
                {' '}
                https://www.facebook.com/HGHMNDS/
              </a>
            </h4>
            <h4>
              <span>
                <i className='bi bi-telephone-fill'></i> 0916 406 9200
              </span>
            </h4>
          </div>
        </div>
      </main>
    </section>
  )
}

export default Stores
