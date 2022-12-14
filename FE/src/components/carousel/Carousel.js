import Slider from "react-slick"
import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactComponent as Next } from "../../assets/next.svg";
import { ReactComponent as Prev } from "../../assets/prev.svg";

const StyledSlider = styled(Slider)`
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-slide div {
    cursor: pointer;
  }
  *:focus { 
    outline:none; 
  }
`;
const DivNext = styled.div`
  width: 16px;
  height: 16px;
  position: absolute;
  right: 16px;
  z-index: 99;
  fill: rgba(0, 0, 0, 0.5);
`;
const DivPre = styled.div`
  width: 16px;
  height: 16px;
  position: absolute;
  left: 16px;
  z-index: 99;
  fill: rgba(0, 0, 0, 0.5);
`;

const Carousel = (props) => {
  const images = props.images
  const settings = {
    infinite: true,
    speed: 500,
    slideToShow: 1,
    slideToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,

    nextArrow: (
      <DivNext>
        <Next />
      </DivNext>
    ),
    prevArrow: (
      <DivPre>
        <Prev />
      </DivPre>
    ),
  };

  return (
    <div>
      <StyledSlider {...settings}>
        {images.map(image => {
          return (
            <div key={image.id}>
              <img src={image.url} alt='' style={{ width: "100%" }} />
            </div>
          )
        })}
      </StyledSlider>
    </div>
  )
}

export default Carousel