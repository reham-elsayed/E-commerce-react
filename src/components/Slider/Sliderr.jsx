import styles from "./Sliderr.module.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Slider({product}) {

console.log(product)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
 <>
   <Slider {...settings}>
        {product.images.map((item)=>
          <div key={item} className={styles.sliderimg}>
          <img src={item}/>
         </div>
      )}
     </Slider>
 </>
  )
}
