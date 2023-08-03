import React, { useEffect } from "react";
import useAsync from "../../helpers/hooks/useAsync";
import fetch from "../../helpers/fetch";

interface Category {
    id: number;
    title: string;
    imageUrl: string;
    products: number;
    ratio: {
        default: string;
        md: string;
    };
}

interface CategoriesProps { }

function Loading({ ratio }: { ratio: any }) {
    // ... Rest of the code remains the same
}

const Categories: React.FC<CategoriesProps> = () => {
    const { data, status, error, run, isLoading } = useAsync<{ data: Category[] }>();

    useEffect(() => {
        run(
            fetch({
                url: "/api/categories/?page=1&limit=4",
            })
        );
    }, [run]);

    const ratioClassNames = {
        // ... Rest of the code remains the same
    };

    return (
        <section className="flex bg-gray-100 py-16 px-4" id="browse-the-room">
            {/* ... Rest of the code remains the same */}
            <div className="grid grid-rows-2 grid-cols-9 gap-4">
                {isLoading ? (
                    <Loading ratio={ratioClassNames} />
                ) : (
                    data?.data.map((item, index) => {
                        return (
                            <div
                                key={item.id}
                                className={`relative card ${ratioClassNames?.wrapper.default?.[item.ratio.default]
                                    } ${ratioClassNames?.wrapper.md?.[item.ratio.md]}`}
                                style={{ height: index === 0 ? 180 : "auto" }}
                            >
                                <div className="card-shadow rounded-xl">
                                    <img
                                        src={`../../assets/images/content/${item.imageUrl}`}
                                        alt={item.title}
                                        className="w-full h-full object-cover object-center overlay overflow-hidden rounded-xl"
                                    />
                                </div>
                                <div
                                    className={`overlay  ${ratioClassNames?.meta?.[item.ratio.md]
                                        }`}
                                >
                                    <h5 className="text-lg font-semibold">{item.title}</h5>
                                    <span className="">
                                        {item.products} item{item.products > 1 ? "s" : ""}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default Categories;
