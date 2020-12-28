import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';

import useCardCount from './useCardCount';

const useCarousel = (isHero: boolean) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { pos, slideCount } = useCardCount({ xs: 2, sm: 3, md: 4, lg: 5, xl: 7 });
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    duration: isHero ? 1200 : 2500,
    spacing: isHero ? 12 : 0,
    slidesPerView: isHero ? 1 : slideCount,
    controls: true,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
    breakpoints: {
      '(min-width: 1024px)': { controls: isHero },
      '(min-width: 1280px)': { controls: isHero },
    },
  });

  const next = () => (isHero ? slider.next() : slider.moveToSlide(currentSlide + slideCount));
  const prev = () => (isHero ? slider.prev() : slider.moveToSlide(currentSlide - slideCount));

  const leftDisable = currentSlide === 0;
  const rightDisable = isHero ? currentSlide === 5 : false;

  return { sliderRef, next, prev, pos, leftDisable, rightDisable };
};

export default useCarousel;
