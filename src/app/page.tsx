'use client'
import Image from 'next/image';
import { ChatAppContext } from '../../Context/ChatAppContext';
import { useContext } from 'react';
import { Filter, Friends } from '../../Components/index';

export default function ChatApp() {
  const { readMessage, createAccount, addFriends, sendMessage, readUser } = useContext(ChatAppContext);

  return (
    <div>
      <Filter />
      <Friends />
    </div>
  );
}
