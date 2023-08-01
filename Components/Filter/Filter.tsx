import React, { useState, useContext } from 'react';
import Image from 'next/image';

import Style from './Filter.module.css';
import images from '../../assets/images';
import { ChatAppContext } from '../../Context/ChatAppContext';
import { Model } from '../index';

export interface IFilterProps {
}

export default function Filter(props: IFilterProps) {
    const { account, addFriends } = useContext(ChatAppContext);
    const [addFriend, setAddFriend] = useState(false);

    return (
        <div className={Style.Filter}>
            <div className={Style.Filter_box}>
                <div className={Style.Filter_box_left}>
                    <div className={Style.Filter_box_left_search}>
                        <Image src={images.search} alt="search" width={20} height={20}></Image>
                        <input type="text" placeholder="search..." />
                    </div>
                </div>
                <div className={Style.Filter_box_right}>
                    <button>
                        <Image className={`img ${Style.Filter_clear}`} src={images.closeBtn} alt="clear"></Image>
                        CLEAR CHAT
                    </button>
                    <button onClick={() => setAddFriend(true)}>
                        <Image className={`img ${Style.Filter_add_user}`} src={images.userPlus} alt="add friend"></Image>
                        ADD FRIEND
                    </button>
                </div>
            </div>
            {addFriend && (
                <div className={Style.Filter_model}>
                    <Model
                        title="WELCOME TO"
                        head="CHAT FRIEND"
                        info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi cupiditate animi fuga nulla nemo odio, officia eum nesciunt tenetur temporibus libero quis delectus, nobis eveniet magni fugiat eligendi omnis cumque?"
                        smallInfo="Select your friend name and address..."
                        image={images.addFriend}
                        openModel={setAddFriend}
                        modelFunction={addFriends}
                    />
                </div>
            )}
        </div>
    );
}
