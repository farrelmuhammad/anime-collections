import React, { useState, useEffect } from "react";
import axios from "axios";

const Hero: React.FC = () => {
    const [randomImage, setRandomImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchRandomAnimeImage();
    }, []);

    const fetchRandomAnimeImage = async () => {
        try {
            const response = await axios.get("https://picsum.photos/800/600");
            console.log(response);
            setRandomImage(response.request.responseURL);
        } catch (error) {
            console.error("Error fetching random image:", error);
        } finally {
            setIsLoading(false);
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
                        className="bg-pink-400 text-black hover:bg-black hover:text-pink-400 rounded-full px-8 py-3 mt-4 inline-block flex-none transition duration-200"
                    >
                        Explore Now
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
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>'
                        ></button>
                    </div>
                    {isLoading && (
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                background: "rgba(0, 0, 0, 0.1)", // Adjust the color of the skeleton here
                                zIndex: 10,
                            }}
                        ></div>
                    )}
                    {randomImage && (
                        <img
                            src={randomImage}
                            alt="Random Anime"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: isLoading ? "none" : "block",
                                position: "relative",
                            }}
                            onLoad={() => setIsLoading(false)} // In case the image loads before useEffect finishes
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default Hero;