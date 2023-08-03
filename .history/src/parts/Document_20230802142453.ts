import React, { ReactNode } from 'react';
import useModalDOM from "../helpers/hooks/useModalDOM";
import useScrollAnchor from "../helpers/hooks/useScrollAnchor";
import useScrollToTop from "../helpers/hooks/useScrollToTop";

interface DocumentProps {
    children: ReactNode;
}

const Document: React.FC<DocumentProps> = ({ children }) => {
    useModalDOM();
    useScrollAnchor();
    useScrollToTop();
    return { children };
};

export default Document;
