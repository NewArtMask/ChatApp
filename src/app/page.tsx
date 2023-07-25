'use client'
import Image from 'next/image';
import { ChatAppContext } from '../../Context/ChatAppContext';
import { useContext } from 'react';

export default function ChatApp() {
  const { readMessage, createAccount, addFriends, sendMessage, readUser } = useContext(ChatAppContext);

  return (
    <div></div>
  );
}
