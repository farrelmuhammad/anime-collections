import React, { useRef, useState, useCallback, useLayoutEffect, MouseEvent, TouchEvent } from "react";
import { addClass, removeClass } from "../../helpers/format/classNameModifier";

interface CarouselProps {
    children: React.ReactNode;
    refContainer: React.RefObject<HTMLDivElement>;
}

const Carousel: React.FC<CarouselProps> = ({ children, refContainer }) => {
    const refDragHandler = useRef<HTMLDivElement>(null);
    const containerClientRect = refContainer.current!.getBoundingClientRect();
    const [index, setIndex] = useState<number>(0);

    const threshold = 100;
    const itemToShow = window.innerWidth < 767 ? 1 : 4;
    const DIRECTION_LEFT = "DIRECTION_LEFT";
    const DIRECTION_RIGHT = "DIRECTION_RIGHT";

    const posInitial = useRef<number>();
    const posX1 = useRef<number>();
    const posX2 = useRef<number>();
    const posFinal = useRef<number>();
    const isAllowShift = useRef<boolean>(true);
    const cards = useRef<HTMLDivElement[] | null>(null);
    const cardCount = cards.current?.length || 0;
    const cardSize = cards.current?.[0]?.offsetWidth || 0;

    const fnCheckIndex = useCallback(
        (e: TransitionEvent) => {
            if (e.propertyName === "left") {
                setTimeout(() => {
                    removeClass(refDragHandler.current!, "transition-all duration-300");
                }, 200);

                const isMobile = window.innerWidth < 767 ? 0 : -1;
                if (index <= 0) {
                    refDragHandler.current!.style.left = "0";
                    setIndex(0);
                } else if (index >= cardCount - itemToShow) {
                    refDragHandler.current!.style.left = `${-((cardCount - itemToShow + isMobile) * cardSize)}px`;
                    setIndex(cardCount - itemToShow);
                } else if (index === cardCount || index === cardCount - 1) {
                    refDragHandler.current!.style.left = `${(cardCount - 1) * cardSize}px`;
                    setIndex(cardCount - 1);
                }

                isAllowShift.current = true;
            }
        },
        [cardCount, cardSize, index, itemToShow]
    );

    const fnShiftItem = useCallback(
        (direction: "DIRECTION_LEFT" | "DIRECTION_RIGHT") => {
            addClass(refDragHandler.current!, "transition-all duration-200");

            if (isAllowShift.current) {
                if (direction === "DIRECTION_LEFT") {
                    setIndex((prev) => prev + 1);
                    refDragHandler.current!.style.left = `${posInitial.current! - cardSize}px`;
                } else if (direction === "DIRECTION_RIGHT") {
                    setIndex((prev) => prev - 1);
                    refDragHandler.current!.style.left = `${posInitial.current! + cardSize}px`;
                }
            }

            isAllowShift.current = false;
        },
        [cardSize]
    );

    const onDragMove = useCallback(
        (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
            e = e || window.event;
            e.preventDefault();

            if (e.type === "touchmove") {
                posX2.current = posX1.current! - (e as TouchEvent<HTMLDivElement>).touches[0].clientX;
                posX1.current = (e as TouchEvent<HTMLDivElement>).touches[0].clientX;
            } else {
                posX2.current = posX1.current! - e.clientX;
                posX1.current = e.clientX;
            }

            refDragHandler.current!.style.left = `${refDragHandler.current!.offsetLeft - posX2.current}px`;
        },
        [posX1, posX2]
    );

    const onDragEnd = useCallback(
        (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
            e = e || window.event;
            e.preventDefault();
            console.log(e);

            posFinal.current = refDragHandler.current!.offsetLeft;

            if (posFinal.current! - posInitial.current! < -threshold) {
                fnShiftItem(DIRECTION_LEFT);
            } else if (posFinal.current! - posInitial.current! > threshold) {
                fnShiftItem(DIRECTION_RIGHT);
            } else {
                refDragHandler.current!.style.left = `${posInitial.current}px`;
            }

            document.onmouseup = null;
            document.onmousemove = null;
        },
        [fnShiftItem]
    );

    const onDragStart = useCallback(
        (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
            e = e || window.event;
            e.preventDefault();

            posInitial.current = refDragHandler.current!.offsetLeft;

            if (e.type === "touchstart") {
                posX1.current = (e as TouchEvent<HTMLDivElement>).touches[0].clientX;
            } else {
                posX1.current = e.clientX;
                document.onmouseup = onDragEnd;
                document.onmousemove = onDragMove;
            }
        },
        [onDragEnd, onDragMove]
    );

    const onClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
        e = e || window.event;
        !isAllowShift.current && e.preventDefault();
    }, []);

    useLayoutEffect(() => {
        const refForwardDragHandler = refDragHandler.current!;

        refForwardDragHandler.onmousedown = onDragStart;
        refForwardDragHandler.addEventListener("touchstart", onDragStart);
        refForwardDragHandler.addEventListener("touchend", onDragEnd);
        refForwardDragHandler.addEventListener("touchmove", onDragMove);
        refForwardDragHandler.addEventListener("click", onClick);
        refForwardDragHandler.addEventListener("transitionend", fnCheckIndex);
        return () => {
            refForwardDragHandler.removeEventListener("touchstart", onDragStart);
            refForwardDragHandler.removeEventListener("touchend", onDragEnd);
            refForwardDragHandler.removeEventListener("touchmove", onDragMove);
            refForwardDragHandler.removeEventListener("click", onClick);
            refForwardDragHandler.removeEventListener("transitionend", fnCheckIndex);
        };
    }, [onDragStart, onDragEnd, onDragMove, onClick, fnCheckIndex]);

    useLayoutEffect(() => {
        if (refDragHandler.current) {
            cards.current = Array.from(refDragHandler.current.getElementsByClassName("card")) as HTMLDivElement[];
        }
    }, []);

    return (
        <div
            ref={refDragHandler}
            className="flex -mx-4 flex-row relative"
            style={{ paddingLeft: containerClientRect.left - 16 }}
        >
            {children}
        </div>
    );
};

export default Carousel;
