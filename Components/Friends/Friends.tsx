import React, { useState, useContext } from 'react';
import Image from 'next/image';

import Style from './Friends.module.css';
import images from '../../assets/images';
import { Chat } from './Chat/Chat';
import { Card } from './Card/Card';
import { ChatAppContext } from '../../Context/ChatAppContext';

export interface IFriendsProps {
}

export default function Friends(props: IFriendsProps) {
    const {
        userName,
        currentUserName,
        currentUserAddress,
        account,
        friendsList,
        loading,
        friendMsg,
        sendMessage,
        readMessage,
        readUser
    } = useContext(ChatAppContext);

    return (
        <div className={Style.Friends}>
            <div className={Style.Friends_box}>
                <div className={Style.Friends_box_left}>
                    {friendsList.length
                        ? friendsList.map((el, i) => (
                            <Card
                                key={i + 1}
                                el={el}
                                i={i}
                                readMessage={readMessage}
                                readUser={readUser}
                            />
                        ))
                        : "You have no friends"
                    }
                </div>
                <div className={Style.Friends_box_right}>
                    <Chat
                        friendMsg={friendMsg}
                        account={account}
                        userName={userName}
                        loading={loading}
                        currentUserName={currentUserName}
                        currentUserAddress={currentUserAddress}
                        chatFunction={sendMessage}
                        readMessage={readMessage}
                        readUser={readUser}
                    />
                </div>
            </div>
        </div>
    );
}
