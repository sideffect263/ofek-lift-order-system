import React from 'react';
import './Banner.css';



const Banner = () => {
    const bannerStyle = {
        position: 'static',   // Fix position to the viewport
        bottom: '0',         // Align to the bottom of the viewport
        width: '100%',       // Ensure it spans the full width
        backgroundColor: '#f4a261', // Background color
        color: 'white',      // Text color
        textAlign: 'center', // Center-align the text
        padding: '10px 0',   // Padding top and bottom
        fontSize: '10px',    // Font size
        display: 'flex',     // Use flexbox
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

    };

    return (
        <div style={bannerStyle}>
           <div className='img2'></div>

            <h1 style={{flex:1}}>Ofek Lift Order System</h1>
            <div className='img1'></div>
        </div>
    );
}

export default Banner;
