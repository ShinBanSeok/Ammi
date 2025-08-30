import Carousel from '@/components/Carousel';
import { HERO_SLIDES } from '@/lib/site.config';

export default function HomePage() {
  return <Carousel slides={HERO_SLIDES} autoMs={6000} fadeMs={3000} showDots />;
}