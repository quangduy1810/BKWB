import React from 'react';

const Loading = () => [
    <div key={0} style={{ position: 'fixed', top: '20%', left: '50%', width: '200px', height: '200px', marginLeft: '-100px', textAlign: 'center', zIndex: 1000 }}>
        <img src='/img/bk.png' style={{ width: '80%', height: '80%', margin: '10%' }} />
    </div>,
    <div key={1} className='spinner' />
];

export default Loading;