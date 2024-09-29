import React, {useRef} from 'react'
import HomeHeader from '../homePage/HomeHeader'
function ProduitDetailHeader() {
  const swiperRef = useRef(null);
    
  return (
    <div ref={swiperRef}>
    <HomeHeader />
    </div>
  )
}

export default ProduitDetailHeader