'use client'
import Image from 'next/image';
import { NavBar } from '../../Components/index';
import { ChatAppContext } from '../../Context/ChatAppContext';
import { useContext } from 'react';

export default function ChatApp() {
  const { readMessage, createAccount, addFriends, sendMessage, readUser } = useContext(ChatAppContext);

  return (
    <main className="flex flex-col items-center justify-between">
      <NavBar />
      <div></div>
    </main>
  );
}
