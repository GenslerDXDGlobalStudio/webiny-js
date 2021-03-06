import React from "react";
import { PbElement } from "../../../../types";
import { ElementRoot } from "../../../components/ElementRoot";
import { Image as WebinyImage } from "@webiny/app/components";
import { Link as RouterLink } from "@webiny/react-router";

type LinkPropsType = {
    link?: {
        href?: string;
        newTab?: boolean;
    };
    children: React.ReactElement;
};
const Link: React.FunctionComponent<LinkPropsType> = ({ link, children }) => {
    if (!link || !link.href) {
        return children;
    }
    return (
        <RouterLink to={link.href} target={link.newTab ? "_blank" : "_self"}>
            {children}
        </RouterLink>
    );
};

<<<<<<< HEAD
const position = { left: "flex-start", center: "center", right: "flex-end" };

const Image = props => {
    const { image = {}, link = {}, settings = {} } = get(props, "element.data", {});
=======
type ImagePropsType = {
    element: PbElement;
};
const Image: React.FunctionComponent<ImagePropsType> = ({ element }) => {
    const { image = {}, link = {} } = element.data || {};
>>>>>>> 3e89118e4ea7af3e2f7722cc5643606080ec4792
    if (!image || !image.file) {
        return null;
    }

    const { width, height, title } = image;

    const style = { width, height };

    return (
        <ElementRoot
<<<<<<< HEAD
            element={props.element}
=======
            element={element}
            style={{ display: "flex" }}
>>>>>>> 3e89118e4ea7af3e2f7722cc5643606080ec4792
            className={"webiny-pb-base-page-element-style webiny-pb-page-element-image"}
            // alignItems: position[horizontalAlign] is here because of a Safari CSS bug when flex is enabled on an image
            // container with height is set to auto and the width is configured
            style={{ display: "flex", alignItems: position[horizontalAlign], justifyContent: position[horizontalAlign] }}
        >
            <Link link={link}>
                <WebinyImage
                    title={title}
                    alt={title}
                    style={style}
                    src={image.file.src}
                    srcSet="auto"
                />
            </Link>
        </ElementRoot>
    );
};

export default Image;
