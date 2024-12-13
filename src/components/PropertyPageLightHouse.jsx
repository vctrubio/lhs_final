import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';


//this is all depreciated....

function PropertyImageGallery({ property }) {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    const mainSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: nav2,

    };

    const thumbSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: nav1,
        centerMode: true,
        focusOnSelect: true,
        arrows: true,
    };

    return (
        <div className="mb-6 sm:mb-8 lg:mb-12 border">

            {/* Main Image Slider */}
            <div className="relative rounded-t-lg w-full">
                <Slider
                    {...mainSettings}
                    ref={(slider1) => setNav1(slider1)}
                    className="w-full aspect-[16/9] border"
                >
                    {property.photos_url.map((image, index) => (
                        <div key={index} className="relative w-full aspect-[16/9]">
                            <Image
                                src={image}
                                alt={`${property.title} - View ${index + 1}`}
                                fill
                                className="object-contain"
                                priority={index === 0}
                            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                            />
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Thumbnail Slider */}
            <div className="rounded-b-lg p-2 sm:p-3 md:p-4">
                <Slider
                    {...thumbSettings}
                    ref={(slider2) => setNav2(slider2)}
                    className="thumbnail-slider"
                >
                    {property.photos_url.map((image, index) => (
                        <div
                            key={index}
                            className="px-1 sm:px-2"
                        >
                            <div className="relative aspect-video rounded-lg overflow-hidden">
                                <Image
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}


function PropertyLightboxGallery({ property }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = property.photos_url.map((url) => ({ src: url }));

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)} className="open-lightbox-button">
                Open Gallery
            </button>
            <Lightbox
                open={isOpen}
                close={() => setIsOpen(false)}
                slides={images}
                index={currentIndex}
            />
            <style jsx>{`
                .carousel-container {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                }
                .carousel {
                    display: flex;
                    align-items: center;
                }
                .carousel-images {
                    display: flex;
                    transition: transform 0.5s ease;
                    transform: translateX(-${currentIndex * 100}%);
                }
                .carousel-image {
                    min-width: 100%;
                    height: 300px;
                    position: relative;
                }
                .prev, .next {
                    background: rgba(0, 0, 0, 0.5);
                    color: white;
                    border: none;
                    padding: 10px;
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 1;
                }
                .prev {
                    left: 10px;
                }
                .next {
                    right: 10px;
                }
                .thumbnail-navigation {
                    display: flex;
                    justify-content: center;
                    margin-top: 10px;
                }
                .thumbnail {
                    margin: 0 5px;
                    cursor: pointer;
                    border: 2px solid transparent;
                }
                .thumbnail.active {
                    border-color: #000;
                }
            `}</style>
        </div>
    );
}

