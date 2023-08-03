import React, { useEffect, useRef } from "react";
import useAsync from "../../helpers/hooks/useAsync";
import fetch from "../../helpers/fetch";
import { Link } from "react-router-dom";
import Carousel from "../../components/Carousel";

interface Product {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  idc: number;
}

interface ListCardProps {
  title: string;
}

function Loading() {
  return Array(6)
    .fill(null)
    .map((_, index) => {
      return (
        <div className="px-4 relative card group" key={index}>
          {/* ... rest of the loading card */}
        </div>
      );
    });
}

const ListCard: React.FC<ListCardProps> = ({ title }) => {
//   const { data, error, run, isLoading } = useAsync<{ data: Product[] }>();

  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    run(
      fetch({
        url: "/api/products/?page=1&limit=10",
      })
    );
  }, [run]);

  return (
    <section className="flex flex-col py-16">
      <div className="container mx-auto mb-4">
        <div className="flex justify-center text-center mb-4">
          <h3 className="text-2xl capitalize font-semibold">{title}</h3>
        </div>
      </div>
      {/* ... rest of the component */}
    </section>
  );
};

export default ListCard;
