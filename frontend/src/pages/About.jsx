import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t' >
        <Title text1={'ABOUT'} text2={'US'} />

      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} alt='' className='w-full md:max-w-[450px] ' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 ' >
            <p>Loom Luxe is a premium clothing brand dedicated to offering timeless fashion with a modern twist. Our mission is to create high-quality garments that blend comfort, style, and craftsmanship for those who appreciate the art of refined dressing. Each piece is carefully designed with attention to detail, using sustainable materials to ensure not only a stylish look but also a conscious choice for the planet</p>
            <p>At Loom Luxe, we believe in empowering individuals to express their unique personality through fashion, all while embracing luxury that lasts. Whether you're looking for everyday essentials or special occasion pieces, our collection brings you the perfect fusion of elegance and sophistication.</p>
            <b  className='text-gray-800' >Our Mission</b>
            <p>At Loom Luxe, our mission is to deliver high-quality, stylish clothing that blends comfort with sustainability. We aim to provide our customers with timeless pieces that inspire confidence and elevate everyday wear, all while prioritizing eco-conscious practices.</p>
        </div>
      </div>
      <div className='text-xl py-4' >
        <Title  text1={'WHY'} text2={'CHOOSE US'}/>

      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20' >
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5' >
          <b>Quality Assuarance</b>
          <p className='text-gray-600'>At Loom Luxe, quality is at the heart of everything we do. We meticulously inspect each garment to ensure it meets the highest standards of craftsmanship and durability. From selecting the finest materials to ensuring precise stitching and fit.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5' >
          <b>Convinience</b>
          <p className='text-gray-600'>At Loom Luxe, we prioritize your convenience by offering an easy and seamless shopping experience. From user-friendly navigation on our website to fast and reliable shipping, we strive to make your journey with us as simple and enjoyable as possible. Your satisfaction is our top priority.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5' >
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>At Loom Luxe, we are dedicated to providing exceptional customer service. Our team is always ready to assist you with any questions or concerns, ensuring a smooth and enjoyable shopping experience. We value your satisfaction and are committed to going the extra mile to meet your needs.</p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default About