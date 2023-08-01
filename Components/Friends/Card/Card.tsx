import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Style from './Card.module.css';
import images from '../../../assets/images';

export interface ICardProps {
    el: any;
    i: number;
    readMessage: (friendAddress: string) => void;
    readUser: (userAddress: string) => void;
}

export function Card({ el, i, readUser, readMessage }: ICardProps) {
    return (
        <Link href={{ pathname: "/", query: { name: el.name, address: el.pubkey } }}>
            <div
                className={Style.Card}
                onClick={() => (readMessage(el.pubkey), readUser(el.pubkey))}
            >
                <div className={Style.Card_box}>
                    <div className={Style.Card_box_left}>
                        <Image
                            className={`img ${Style.Card_box_left_img}`}
                            src={images.user}
                            alt="username"
                            width={40}
                            height={40}
                        ></Image>
                    </div>
                    <div className={Style.Card_box_right}>
                        <div className={Style.Card_box_right_middle}>
                            <h4>{el.name}</h4>
                            <small>{el.pubkey.slice(0, 20)}...</small>
                        </div>
                        <div className={Style.Card_box_right_end}>
                            <small>{i + 1}</small>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

