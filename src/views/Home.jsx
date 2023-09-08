import React, { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Home() {
    return (
        <div className='flex flex-col gap-5 text-center bg-white p-12 shadow-2xl'>
            <div>
                <h1>PROGRAMA VOZ A VOZ</h1>
            </div>

            <NavLink to="client">  <button className='bg-[#5095f8] text-white'>  CLIENTE  </button></NavLink>

            <NavLink to="operator">  <button className='bg-[#5095f8] text-white'>  OPERADOR  </button></NavLink>
            <div>
                <Outlet />
            </div>
        </div>
    )
}