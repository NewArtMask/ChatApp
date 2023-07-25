'use client'
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';

import Style from './allusers.module.css';
import { ChatAppContext } from '../../../Context/ChatAppContext';
import { UserCard } from '../../../Components';

export interface IAllUsersProps {
}

export default function AllUsers(props: IAllUsersProps) {
    const { userList, addFriends } = useContext(ChatAppContext);
    console.log('props ', props);
    console.log('userList ', userList);

    return (
        <div>
            <div className={Style.AllUsers_info}>
                <h1>Find your friends</h1>
            </div>
            <div className={Style.AllUsers}>
                {userList.map((el, i) => (
                    <UserCard
                        key={i + 1}
                        el={el}
                        i={i}
                        addFriends={addFriends}
                    />
                ))}
            </div>
        </div>
    );
}

