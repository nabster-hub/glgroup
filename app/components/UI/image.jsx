import React from 'react';
import styles from "./UI.module.scss";
import Image from "next/image";
import clsx from "clsx";

const ImageBlock = ({blok}) => {

    return (
        <div className={clsx(styles.image,
            blok.rounded === 'top-left' && styles.topLeft,
            blok.rounded === 'top-right' && styles.topRight,
            blok.rounded === 'bottom-right' && styles.bottomRight,
            blok.rounded === 'bottom-left' && styles.bottomLeft,

        )}>
            <Image src={blok.img.filename}
                   fill
                   quality={80}
                   sizes="(max-width: 768px) 50vw,
                                 (max-width: 1200px) 25vw,
                                 25vw"
                   style={{
                       objectFit: "cover",
                   }}
                   alt={blok.img.alt}
            />
        </div>
    );
};


export default ImageBlock;