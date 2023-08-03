import { useLayoutEffect } from 'react';
import { addClass } from '../format/classNameModifier';

export default function useModalDOM(): void {
    useLayoutEffect(() => {
        const openModal = (element: EventTarget & HTMLElement) => {
            const modalWrapper = document.createElement("div");
            const modalOverlay = document.createElement("div");
            modalOverlay.addEventListener("click", function () {
                modalWrapper.remove();
            });

            const modalWrapperClassNames = "fixed inset-0 bg-black opacity-35";
            addClass(
                modalWrapper,
                "fixed inset-0 z-40 flex items-center justify-center w-100 min-h-screen"
            );
            addClass(modalOverlay, modalWrapperClassNames);
            const modalContent = document.createElement("div");

            modalContent.innerHTML = element.dataset.content || ""; // Access "data-content" using dataset
            addClass(modalContent, "bg-white p-0 md:p-6 z-10");
            modalWrapper.append(modalOverlay);
            modalWrapper.append(modalContent);
            document.body.append(modalWrapper);
        };

        const modalTriggers = document.getElementsByClassName("modal-trigger");
        for (let index = 0; index < modalTriggers.length; index++) {
            const e = modalTriggers[index] as HTMLElement;
            e.addEventListener("click", (event) => openModal(event.target as HTMLElement));
        }

        return () => {
            for (let index = 0; index < modalTriggers.length; index++) {
                const e = modalTriggers[index] as HTMLElement;
                e.removeEventListener("click", (event) => openModal(event.target as HTMLElement));
            }
        };
    }, []);
}
