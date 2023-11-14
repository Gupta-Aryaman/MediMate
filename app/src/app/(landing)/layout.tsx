import React from 'react';
import Image from 'next/image';

const LandingLayout = ({
     children 
}: {
    children: React.ReactNode;
}) => {
    return (
        <main className="h-screen overflow auto" style={{
            backgroundImage: 'url(/wall.jpg)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            width: '100%',
            height: '100%',
          }}>
                <div className="mx-auto max-w-screen-xl h-full w-full">
                    {children}
                </div>
        </main> 
    )
}

export default LandingLayout;