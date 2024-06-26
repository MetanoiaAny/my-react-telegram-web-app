

import { Outlet } from 'react-router-dom'
import Menu from './menu/menu'

function AppLayout() {
  return (
    <div>
        <Outlet />
        <Menu />
    </div>
  )
}

export default AppLayout