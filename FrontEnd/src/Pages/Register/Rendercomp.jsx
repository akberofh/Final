import React from 'react';

const Rendercomp = ({ item }) => {
    return (
        <tr className='w-full'>
            <td className='px-6 py-4'>{item.name ? item.name : "Data not available"}</td>
            <td className='px-6 py-4'>{item.email ? item.email : "Data not available"}</td>
            <td className='px-6 py-4'>{item.userType ? item.userType : "Data not available"}</td>
            <td className='px-6 py-4'>
                <div className='w-5 h-5 rounded-full bg-green-600'></div>
            </td>
        </tr>
    );
};

export default Rendercomp;
