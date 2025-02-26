import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { Photo } from "#/backend/types";

interface PropertySwiperProps {
	images: Photo[];
}

const PropertySwiper: React.FC<PropertySwiperProps> = ({ images }) => {
	if (!images || images.length === 0) return null;

	return (
		<div className="w-full max-w-6xl mx-auto mb-4">
			<Swiper
				modules={[Navigation, Pagination, Autoplay, EffectFade]}
				navigation
				pagination={{ clickable: true }}
				autoplay={{ delay: 3000 }}
				effect="fade"
				loop
				className="w-full h-[300px] sm:h-[450px]"
			>
				{images.map((photo, idx) => (
					<SwiperSlide key={idx}>
						<div className="relative w-full h-[300px] sm:h-[450px] overflow-hidden">
							<Image
								src={photo.url}
								alt={`Property Photo ${idx + 1}`}
								fill
								sizes="100vw"
								style={{ objectFit: "contain" }}
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default PropertySwiper;
