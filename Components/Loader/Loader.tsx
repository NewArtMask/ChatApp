import React from 'react';
import Image from 'next/image';

import Style from './Loader.module.css';
import images from '../../assets/images';


export default function Loader() {
    return (
        <div className={Style.Loader}>
            <div className={Style.Loader_box}>
                <Image className={`img ${Style.Loader_img}`} src={images.loader} alt="loader"></Image>
            </div>
        </div>
    );
}
