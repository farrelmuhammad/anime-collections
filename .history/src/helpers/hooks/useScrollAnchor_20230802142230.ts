import { useLayoutEffect } from 'react';

export default function useScrollAnchor(): void {
    useLayoutEffect(() => {
        const smoothScrollAnchor = document.querySelectorAll<HTMLAnchorElement>("a[href^='#']");

        for (let anchor = 0; anchor < smoothScrollAnchor.length; anchor++) {
            const element = smoothScrollAnchor[anchor];

            element.addEventListener("click", function (e) {
                e.preventDefault();
                const targetId = this.getAttribute("href")?.replace("#", "");
                const targetElement = document.getElementById(targetId || "");

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                    });
                }
            });
        }

        return () => {
            // for (let anchor = 0; anchor < smoothScrollAnchor.length; anchor++) {
            //     const element = smoothScrollAnchor[anchor];
            //     element.removeEventListener("click", smoothScrollHandler);
            // }
        };
    }, []);
}
