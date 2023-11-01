import React from 'react'
import Header from '../navigation/Header'
import Sidebar from '../navigation/Sidebar'
import TopHeader from '../navigation/TopHeader'

const Navbar = () => {
    return (
        <div className=''>
            <TopHeader />
            <Header />
            <Sidebar />
        </div>
    )
}

export default Navbar