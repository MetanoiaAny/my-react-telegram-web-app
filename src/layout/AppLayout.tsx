

import { Outlet } from 'react-router-dom'
import Menu from './menu/menu'

function AppLayout() {
  return (
    <div className='min-h-screen bg-[#000]'>
        <Outlet />
        <Menu />
    </div>
  )
}

export default AppLayout