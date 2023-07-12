import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import Link from "next/link";

import Style from './NavBar.module.css';
import images from '../../assets/images';
import { ChatAppContext } from '../../Context/ChatAppContext';
import { Model, Error } from "../index";

export interface INavBarProps {
}

export default function NavBar(props: INavBarProps) {
    const menuItems = [
        {
            menu: "All users",
            link: "allusers"
        },
        {
            menu: "CHAT",
            link: "/"
        },
        {
            menu: "CONTACTS",
            link: "/"
        },
        {
            menu: "SETTINGS",
            link: "/"
        },
        {
            menu: "FAQ",
            link: "/"
        },
        {
            menu: "TERMS OF USE",
            link: "/"
        },
    ];

    const [active, setActive] = useState(2);
    const [open, setOpen] = useState(false);
    const [openModel, setOpenModel] = useState(false);

    const { userName, account, connectWallet } = useContext(ChatAppContext);

    return (
        <div className={Style.NavBar}>
            <div className={Style.NavBar_box}>
                <div className={Style.NavBar_box_left}>
                    <a href="/">
                        <Image className={`img ${Style.logo}`} src={images.logo} alt="logo"></Image>
                    </a>
                </div>
                <div className={Style.NavBar_box_right}>
                    <div className={Style.NavBar_box_right_menu}>
                        {menuItems.map((el, idx) => (
                            <div key={idx + 1}
                                className={`${Style.NavBar_box_right_menu_items} ${active == idx + 1 ? Style.active_btn : ""}`}
                                onClick={() => setActive(idx + 1)}
                            >
                                <Link href={el.link} className={Style.NavBar_box_right_menu_items_link}>
                                    {el.menu}
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className={Style.NavBar_box_right_connect}>
                        {account == ""
                            ? <button onClick={() => connectWallet()}>
                                {""}
                                <span>Connect Wallet</span>
                            </button>

                            : <button onClick={() => setOpenModel(true)}>
                                <Image className={`img ${Style.user}`} src={images.user} alt="account image"></Image>
                                <small>{userName || "Create account"}</small>
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
