import React, { useEffect, useRef } from "react";
// import useAsync from "../../helpers/hooks/useAsync";
import fetch from "../../helpers/fetch";
import { Link } from "react-router-dom";
// import Carousel from "../../components/Carousel";

interface Product {
    id: number;
    title: string;
    imageUrl: string;
    price: number;
    idc: number;
}

function Loading() {
    return Array(6)
        .fill(null)
        .map((_, index) => {
            return (
                <div className="px-4 relative card group" key={index}>
                    <div
                        className="rounded-xl bg-gray-300 overflow-hidden card-shadow relative"
                        style={{ width: "287px", height: "386px" }}
                    ></div>
                    <div className="w-24 h-3 bg-gray-300 mt-3 rounded-full"></div>
                    <div className="w-36 h-3 bg-gray-300 mt-2 rounded-full"></div>
                </div>
            );
        });
}

const AnimeList: React.FC = () => {
    // const { data, error, run, isLoading } = useAsync<{ data: Product[] }>();

    const refContainer = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     run(
    //         fetch({
    //             url: "/api/products/?page=1&limit=10",
    //         })
    //     );
    // }, [run]);

    return (
        <section className="flex flex-col py-16">
            <div className="container mx-auto mb-4">
                <div className="flex justify-center text-center mb-4">
                    <h3 className="text-2xl capitalize font-semibold">
                        Anime List <br className="" />
                        this summer for you
                    </h3>
                </div>
            </div>
            <div className="overflow-x-hidden px-4" id="carousel">
                <div className="container mx-auto" ref={refContainer}></div>
                {/* <!-- <div className="overflow-hidden z-10"> --> */}

                {isLoading ? (
                    <div
                        className="flex -mx-4 flex-row relative"
                        style={{
                            paddingLeft:
                                refContainer.current?.getBoundingClientRect()?.left - 16 || 0,
                        }}
                    >
                        <Loading />
                    </div>
                ) : error ? (
                    JSON.stringify(error)
                ) : data.data.length === 0 ? (
                    "No Product Found"
                ) : (
                    <Carousel refContainer={refContainer}>
                        {data.data.map((item) => {
                            return (
                                <div className="px-4 relative card group" key={item.id}>
                                    <div
                                        className="rounded-xl overflow-hidden card-shadow relative"
                                        style={{ width: "287px", height: "386px" }}
                                    >
                                        <div className="absolute opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center w-full h-full bg-black bg-opacity-35">
                                            <div className="bg-white text-black rounded-full w-16 h-16 flex items-center justify-center">
                                                <svg
                                                    className="fill-current"
                                                    width="43"
                                                    height="24"
                                                    viewBox="0 0 43 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    {/* ... svg path */}
                                                </svg>
                                            </div>
                                        </div>
                                        <img
                                            src={item.imageUrl}
                                            alt=""
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                    <h5 className="text-lg font-semibold mt-4">{item.title}</h5>
                                    <span className="">IDR {item.price}</span>
                                    <Link
                                        to={`/categories/${item.idc}/products/${item.id}`}
                                        className="stretched-link"
                                    ></Link>
                                </div>
                            );
                        })}
                    </Carousel>
                )}
            </div>
        </section>
    );
};

export default AnimeList;
