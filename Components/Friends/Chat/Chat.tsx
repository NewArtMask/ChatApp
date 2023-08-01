import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import Style from './Chat.module.css';
import images from '../../../assets/images';
import { convertTime } from '../../../Utils/apiFeatures';
import { Loader } from '../../index';

interface IMessage {
    sender: string;
    timestamp: number;
    msg: string;
}

export interface IChatProps {
    friendMsg: IMessage[];
    account: string;
    userName: string;
    loading: boolean;
    currentUserName: string;
    currentUserAddress: string;
    chatFunction: ({ msg, address }: { msg: string, address: string }) => void;
    readMessage: (friendAddress: string) => void;
    readUser: (userAddress: string) => void;
}

interface Query {
    name: string;
    address: string;
}

export function Chat({
    friendMsg,
    account,
    userName,
    currentUserName,
    currentUserAddress,
    loading,
    chatFunction,
    readMessage,
    readUser
}: IChatProps) {
    const [message, setMessage] = useState('');
    const [chatData, setChatData] = useState<Query>({ name: '', address: '' });

    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!pathname || !searchParams) return;
        const name = searchParams.get('name');
        const address = searchParams.get('address');
        if (!name || !address) return;

        setChatData({ name, address });
        // readMessage(address);
        // readUser(address);
    }, [pathname, searchParams]);

    return (
        <div className={Style.Chat}>
            {currentUserName && currentUserAddress
                ? <div className={Style.Chat_user_info}>
                    <Image
                        src={images.user}
                        alt="chat account"
                        width={70}
                        height={70}
                    ></Image>
                    <div className={Style.Chat_user_info_box}>
                        <h4>{currentUserName}</h4>
                        <p className={Style.show}>{currentUserAddress}</p>
                    </div>
                </div>
                : ""}

            <div className={Style.Chat_box_box}>
                <div className={Style.Chat_box}>
                    <div className={Style.Chat_box_left}>
                        {friendMsg.map((el, i) => (
                            <div key={i + 1}>
                                {el.sender == chatData.address
                                    ? (<div className={Style.Chat_box_left_title}>
                                        <Image
                                            src={images.user}
                                            alt="user"
                                            width={50}
                                            height={50}
                                        ></Image>
                                        <span>
                                            {chatData.name} {""}
                                            <small>Time: {convertTime(el.timestamp)}</small>
                                        </span>
                                    </div>)
                                    : (<div className={Style.Chat_box_left_title}>
                                        <Image
                                            src={images.user}
                                            alt="user"
                                            width={50}
                                            height={50}
                                        ></Image>
                                        <span>
                                            {userName} {""}
                                            <small>Time: {convertTime(el.timestamp)}</small>
                                        </span>
                                    </div>)
                                }
                                <p>
                                    {el.msg}
                                    {""}
                                    {""}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                {currentUserName && currentUserAddress
                    ? (<div className={Style.Chat_box_send}>
                        <div className={Style.Chat_box_send_img}>
                            <Image
                                src={images.smile}
                                alt="send"
                                width={50}
                                height={50}
                            />
                            <input
                                type="text"
                                placeholder="type your message"
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <Image
                                src={images.uploadFile}
                                alt="file"
                                width={50}
                                height={50}
                            />

                            {loading == true
                                ? <Loader />
                                : <Image
                                    src={images.sendMessage}
                                    alt="file"
                                    width={50}
                                    height={50}
                                    onClick={() => chatFunction({ msg: message, address: chatData.address })}
                                />}
                        </div>
                    </div>)
                    : ""}
            </div>
        </div>
    );
}

