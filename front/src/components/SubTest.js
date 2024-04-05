import React from 'react';

const SubTest = ({data}) => {
    return (
        <ul>
            {
                data.map((item)=>(
                    <li key={item.id}>
                        아디:{item.id} / 이름: {item.name}
                    </li>
                ))
            }
        </ul>
    );
};

export default SubTest;