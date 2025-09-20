import React from 'react';

const Loader: React.FC = ({ }) => {
    return (
        <div className='absolute w-full h-full flex justify-center items-center grayscale-60 opacity-80'>
            <div className='relative flex justify-center items-center rounded-full h-[6rem] w-[6rem] overflow-hidden'>
                <div className='absolute flex justify-center items-center rounded-full h-[100rem] w-[100rem] bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700 animate-spin'>
                    <div className='rounded-full h-[3rem] w-[3rem] bg-gray-800'></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;