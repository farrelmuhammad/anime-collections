import React from 'react';
import { useLayoutEffect } from 'react';
import { useLocation, useNavigate, Location } from 'react-router-dom';

export default function useScrollToTop(): void {
    const location: Location = useLocation();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [location.key, navigate]);
}
