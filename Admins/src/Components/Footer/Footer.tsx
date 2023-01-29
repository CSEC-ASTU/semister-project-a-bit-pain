import React from 'react'
import facebook from '../../Icons/facebook.png';
import email from '../../Icons/email.png';
import instagram from '../../Icons/instagram.png';
import telegram from '../../Icons/telegram.png';
import twitter from '../../Icons/twitter.png';
import youtube from '../../Icons/youtube.png'

const Footer = () => {
  return (
    <div className='shadow border-t-2 border-gray-400 p-8 mt-16 font-lg md:mx-16'>
      <div  className='mb-2 grid grid-cols-2 md:flex md:flex-row flex-wrap md:justify-around md:px-4'>
          <div className='md:mx-8 md:mt-0 mt-2'>
            <p className='border-b-4 border-purple-600 w-24 text-lg'>Quick Links</p>
            <ul className='text-gray-500'>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'><button>Home</button></li>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'><button>Laptops</button></li>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'><button>Gaming</button></li>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'><button>Phones</button></li>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'><button>Accessories</button></li>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'><button>Tv</button></li>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'><button>Ps</button></li>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'><button>Contact</button></li>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'><button>About</button></li>
            </ul>
          </div>
          <div className='md:mx-8 md:mt-0 mt-2'>
            <p className='border-b-4 border-purple-600 w-36 text-lg'>Customer Service</p>
            <ul className='text-gray-500'>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'><button>Terms Of Use</button></li>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'><button>Privacy Policy</button></li>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'><button>Contact Us</button></li>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'><button>How to pay</button></li>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'><button>FAQ?</button></li>
            </ul>
          </div>
          <div className='md:mx-8 md:mt-0 mt-2'>
            <p className='border-b-4 border-purple-600 w-20 text-lg'>Services</p>
            <ul className='text-gray-500'>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'><button>Free Delivery</button></li>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'><button>Book Your Favourites</button></li>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'><button>Easy Cart</button></li>
            </ul>
          </div>
          <div className='md:mx-8 md:mt-0 mt-2'>
            <p className='border-b-4 border-purple-600 w-28 text-lg'>Get in Touch</p>
            <ul className='flex flex-col justify-center text-gray-500'>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'>Phone: +251911121314</li>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'>E-mail: blackneb@gmail.com</li>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'>Web: www.blackneb.com</li>
              <li className='hover:border-l-2 hover:pl-1 border-black text-left'>Fax: 5261</li>
            </ul>
          </div>
          <div className='md:mx-8 md:mt-0 mt-2'>
            <p className='border-b-4 border-purple-600 mx-4 md:mx-28 text-lg'>Social Medias</p>
            <ul className='flex flex-row justify-start py-2'>
              <li className='px-4'>
                <img className='w-6' src={facebook} alt=''/>
              </li>
              <li className='px-4'>
                <img className='w-6' src={email} alt=''/>
              </li>
              <li className='px-4'>
                <img className='w-6' src={instagram} alt=''/>
              </li>
              <li className='px-4'>
                <img className='w-6' src={telegram} alt=''/>
              </li>
              <li className='px-4'>
                <img className='w-6' src={twitter} alt=''/>
              </li>
              <li className='px-4'>
                <img className='w-6' src={youtube} alt=''/>
              </li>
            </ul>
          </div>
      </div>
      {/* <hr className='mx-10'/>
      <div>
        <div className='flex justify-center py-4'>
          <p className='border-b-4 border-purple-600 w-24'>Social Media</p>
        </div>
            <ul className='flex flex-row justify-center py-2'>
              <li className='px-4'>
                <img className='w-6' src={facebook} alt=''/>
              </li>
              <li className='px-4'>
                <img className='w-6' src={email} alt=''/>
              </li>
              <li className='px-4'>
                <img className='w-6' src={instagram} alt=''/>
              </li>
              <li className='px-4'>
                <img className='w-6' src={telegram} alt=''/>
              </li>
              <li className='px-4'>
                <img className='w-6' src={twitter} alt=''/>
              </li>
              <li className='px-4'>
                <img className='w-6' src={youtube} alt=''/>
              </li>
            </ul>
          </div>     
          <div>
        <div className='flex justify-center py-4'>
          <p className='border-b-4 border-purple-600 w-24'>Get in touch</p>
        </div>
            <ul className='flex flex-col justify-center'>
              <li className='px-4'>Phone +251911121314</li>
              <li className='px-4'>E-mail: blackneb@gmail.com</li>
              <li className='px-4'>Web: www.blackneb.com</li>
              <li className='px-4'>Fax: 5261</li>
            </ul>
          </div>       */}
    </div>
  )
}

export default Footer
