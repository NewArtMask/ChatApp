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

    const { userName, account, error, connectWallet, createAccount } = useContext(ChatAppContext);

    return (
        <div className={`flex flex-col items-center justify-between ${Style.NavBar}`}>
            <div className={Style.NavBar_box}>
                <div className={Style.NavBar_box_left}>
                    <a href="/">
                        <Image className={`img ${Style.logo}`} src={images.appLogo} alt="logo"></Image>
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

                    {open && (
                        <div className={Style.mobile_menu}>
                            {menuItems.map((el, idx) => (
                                <div key={idx + 1}
                                    className={`${Style.mobile_menu_items} ${active == idx + 1 ? Style.active_btn : ""}`}
                                    onClick={() => setActive(idx + 1)}
                                >
                                    <Link href={el.link} className={Style.mobile_menu_items_link}>
                                        {el.menu}
                                    </Link>
                                </div>
                            ))}

                            <p className={Style.mobile_menu_btn}>
                                <Image
                                    className={`img ${Style.closeBtn}`}
                                    src={images.closeBtn}
                                    alt="close"
                                    onClick={() => setOpen(false)}
                                ></Image>
                            </p>
                        </div>
                    )}

                    <div className={Style.NavBar_box_right_connect}>
                        {account == ""
                            ? <button onClick={() => connectWallet()}>
                                <Image
                                    className={`img ${Style.wallet}`}
                                    src={images.wallet}
                                    alt="wallet image"
                                ></Image>
                                <small className={Style.wallet_connect}>Connect Wallet</small>
                            </button>

                            : <button onClick={() => setOpenModel(true)}>
                                <Image
                                    className={`img ${Style.user}`}
                                    src={images.user}
                                    alt="account image"
                                ></Image>
                                <small className={Style.user_name}>{userName || "Create account"}</small>
                            </button>
                        }
                    </div>

                    <div className={Style.NavBar_box_right_open}
                        onClick={() => setOpen(true)}>
                        <Image
                            className={`img ${Style.burgerMenu}`}
                            src={images.burgerMenu}
                            alt="open menu"
                            onClick={() => setOpen(false)}
                        ></Image>
                    </div>
                </div>
            </div>

            {openModel && (
                <div className={Style.model_box}>
                    <Model
                        title="WELCOME TO"
                        head="CHAT"
                        info="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum esse nihil illo at eos, praesentium unde fugiat quisquam, qui repudiandae distinctio nobis earum mollitia ipsum quas voluptas perferendis eligendi numquam."
                        smallInfo="Select your name"
                        image={images.chatImg}
                        address={account}
                        openModel={setOpenModel}
                        modelFunction={createAccount}
                    ></Model>
                </div>
            )}
            {error == "" ? "" : <Error error={error} />}
        </div>
    );
}
