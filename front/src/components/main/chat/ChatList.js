import React from 'react';

const ChatList = ({items}) => {

    return (
        <>
            {items&&items.map((item,index)=>
                <div key={index}>
                    <p>{item.date}</p>
                </div>  
            )}
        </>
    );
};

export default ChatList;