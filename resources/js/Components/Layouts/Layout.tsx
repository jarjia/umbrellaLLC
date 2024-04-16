import { Link } from '@inertiajs/react';
import {Menu} from 'antd'
const items = [
    {
      label: (
        <Link href="/" className='text-[19px]'>
          Home
        </Link>
      ),
      key: '1',
    },
    {
        label: (
          <Link href="/admin" className='text-[19px]'>
            Admin Panel
          </Link>
        ),
        key: '2',
      },
  ];

const Layout: React.FC<{children: JSX.Element}> = ({children}) => {
  return (
    <div>
        <Menu mode="horizontal" items={items} />
        {children}
    </div>
  )
}

export default Layout