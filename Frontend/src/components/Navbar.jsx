import React from 'react'
import { Link } from 'react-router-dom'
import ImagenLogo from './ImagenLogo'
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <nav className='bg-yellow-600 bg-opacity-75'>
            <ul className='flex sm:flex-row w-full justify-between my-4'>
                <li className='w-32 mx-10'>
                    <Link to='/'><ImagenLogo /></Link>
                </li>
                <li className='px-16 py-6'>
                    <button onClick={() => loginWithRedirect()} className='btnGeneral'>
                        Iniciar Sesion
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
