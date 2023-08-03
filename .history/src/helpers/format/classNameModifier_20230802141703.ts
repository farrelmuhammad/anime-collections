export function addClass(e: Element, classes: string): void {
    if (e.classList) {
        e.classList.add(...classes.split(" "));
    }
}

export function removeClass(e: Element, classes: string): void {
    if (e.classList) {
        e.classList.remove(...classes.split(" "));
    }
}
