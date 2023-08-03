import React, { useState, useEffect } from "react";
import axios from "axios";

const Hero: React.FC = () => {
    const [randomImage, setRandomImage] = useState<string | null>(null);

    useEffect(() => {
        fetchRandomAnimeImage();
    }, []);

    const fetchRandomAnimeImage = async () => {
        try {
            const response = await axios.get("https://picsum.photos/800/600");
            console.log(response.request.responseURL);
            setRandomImage(response.request.responseURL);
        } catch (error) {
            console.error("Error fetching random image:", error);
        }
    };

    return (
        <section className="flex items-center hero">
            <div className="w-full absolute z-20 inset-0 md:relative md:w-1/2 text-center flex flex-col justify-center hero-caption">
                <h1 className="text-3xl md:text-5xl leading-tight font-semibold">
                    The Room <br className="" />
                    You've Dreaming
                </h1>
                <h2 className="px-8 text-base md:px-0 md:text-lg my-6 tracking-wide">
                    Kami menyediakan furniture berkelas yang
                    <br className="hidden lg:block" />
                    membuat ruangan terasa homey
                </h2>
                <div>
                    <a
                        href="#browse-the-room"
                        className="bg-red-500 text-white hover:bg-black hover:text-red-400 rounded-full px-8 py-3 mt-4 inline-block flex-none transition duration-200"
                    >
                        Watch Now
                    </a>
                    <a
                        href="#browse-the-room"
                        className="bg-red-500 text-white hover:bg-black hover:text-red-400 rounded px-2 py-3 mt-4 inline-block flex-none transition duration-200"
                    >
                        +
                    </a>
                </div>
            </div>
            <div className="w-full inset-0 md:relative md:w-1/2">
                <div className="relative hero-image">
                    <div className="overlay inset-0 bg-black opacity-35 z-10"></div>
                    <div className="overlay right-0 bottom-0 md:inset-0">
                        <button
                            className="video hero-cta focus:outline-none z-30 modal-trigger"
                            data-content='<div class="w-screen pb-56 md:w-88 md:pb-56 relative z-50">
              <div class="absolute w-full h-full">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/3h0_v1cdUIA"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>'
                        ></button>
                    </div>
                    {randomImage && ( // Add this condition to render the image only when randomImage is not null
                        <img
                            src={randomImage}
                            alt="hero 1"
                            className="absolute inset-0 md:relative w-full h-full object-cover object-center"
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default Hero;
