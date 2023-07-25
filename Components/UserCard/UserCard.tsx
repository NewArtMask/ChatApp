import React from 'react';
import Image, { StaticImageData } from 'next/image';

import Style from './UserCard.module.css';
import images from '../../assets/images';

export interface IUserCardProps {
    el: any;
    i: number;
    addFriends: ({ name, accountAddress }: {
        name: string;
        accountAddress: string;
    }) => void;
}

type Images = {
    [key: string]: StaticImageData;
}

export default function UserCard({ el, i, addFriends }: IUserCardProps) {
    return (
        <div className={Style.UserCard}>
            <div className={Style.UserCard_box}>
                <div className={Style.UserCard_box_img}>
                    <Image
                        className={Style.img}
                        src={(images as Images)[`image${i + 1}`]}
                        alt="user"
                    ></Image>
                </div>

                <div className={Style.UserCard_box_info}>
                    <h3>{el.name.length > 12 ? el.name.slice(0, 13) + "..." : el.name}</h3>
                    <button
                        onClick={() => addFriends({ name: el.name, accountAddress: el.accountAddress })}
                    >
                        Add Friend
                    </button>
                </div>
            </div>
            <small className={Style.number}>{i + 1}</small>
        </div>
    );
}
