import React from 'react';
import {Link, Outlet} from 'react-router-dom';

const HomeScreen: React.FC = (): JSX.Element => {
    return (
        <>
            HOMESCREEN
            <br/>
            <br/>
            <nav>
                <ul>
                    <li><Link to='/'>Home Screen</Link></li>
                    <li><Link to='/login'>Login Screen</Link></li>
                    <li><Link to='/register'>Register Screen</Link></li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
};

export default HomeScreen;