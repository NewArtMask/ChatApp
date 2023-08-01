import React, { useState, useContext } from 'react';
import Image from 'next/image';

import Style from './Model.module.css';
import images from '../../assets/images';
import { ChatAppContext } from '../../Context/ChatAppContext';
import { Loader } from '../../Components/index';

export interface IModelProps {
    title: string,
    head: string,
    info: string,
    smallInfo: string,
    address?: string,
    image: HTMLImageElement,
    openModel: React.Dispatch<React.SetStateAction<boolean>>,
    modelFunction: ({ name, accountAddress }: {
        name: string;
        accountAddress: string;
    }) => void
}

export default function Model({ title, head, info, smallInfo, image, address, openModel, modelFunction }: IModelProps) {
    const [name, setName] = useState('');
    const [accountAddress, setAccountAddress] = useState('');

    const { loading } = useContext(ChatAppContext);

    return (
        <div className={Style.Model}>
            <div className={`${Style.Model_box} ${loading && Style.blur}`}>
                <div className={Style.Model_box_left}>
                    <Image
                        src={image}
                        alt="create account logo"
                        width={700}
                        height={700}
                        style={{ backgroundColor: "yellow", borderRadius: "5% 5% 5% 0" }}
                    ></Image>
                </div>

                <div className={Style.Model_box_right}>
                    <h1>
                        {title} <span>{head}</span>
                    </h1>
                    <p>{info}</p>
                    <small>{smallInfo}</small>

                    <div className={Style.Model_box_right_name}>
                        <div className={Style.Model_box_right_name_info}>
                            <Image
                                className={`img ${Style.user_img}`}
                                src={images.user}
                                alt="user name"
                            ></Image>
                            <input
                                type="text"
                                placeholder="account name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className={Style.Model_box_right_name_info}>
                            <Image
                                className={`img ${Style.account_address}`}
                                src={images.account}
                                alt="account address"
                            ></Image>
                            <input
                                type="text"
                                placeholder={address || "account address"}
                                onChange={(e) => setAccountAddress(e.target.value)}
                            />
                        </div>

                        <div className={Style.Model_box_right_name_btn}>
                            <button onClick={() => modelFunction({ name, accountAddress })}>
                                <Image
                                    className={`img ${Style.send}`}
                                    src={images.send}
                                    alt="send"
                                ></Image>
                                {""}
                                Submit
                            </button>

                            <button onClick={() => openModel(false)}>
                                <Image
                                    className={`img ${Style.close_btn}`}
                                    src={images.closeBtn}
                                    alt="cancel"
                                ></Image>
                                {""}
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {loading &&
                <div className={Style.Backdrop}>
                    <div className={Style.Loader}>
                        <Loader />
                    </div>
                </div>
            }
        </div>
    );
}
