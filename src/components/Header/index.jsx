import React, { useEffect } from 'react'
import style from "./style.module.css"
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { getMeAsync } from '../../redux/AuthSlice/AuthSlice'


function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let me = useSelector((state) => state.auth.me)

  useEffect(() => {
    dispatch(getMeAsync());
  }, [dispatch])

  useEffect(() => {
    if (me != null) {
        navigate("/login");
    }
}, []);


  function logout() {
    localStorage.removeItem('access')
    navigate("/");
    window.location.reload();
  }

  const navigation = [
    { name: 'Ana Səhifə', href: '/', current: location.pathname == '/' ? true : false },
    { name: 'Haqqımızda', href: '/about', current: location.pathname == '/about' ? true : false },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  return (
    <Disclosure as="nav" className="header">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-indigo-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'active-nav' : 'normal-nav',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <p className=' text-white'>
                  {me != null ? <>{me.user.first_name} {me.user.last_name}</>: ""}
                </p>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {
                        me ? 
                          <>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={me.profile_picture}
                              alt=""/>
                          </> : 
                            <img
                              className="h-8 w-8 rounded-full"
                              src="src/assets/images/default_avatar.png"
                              alt=""
                            />
                      }
                      
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {() => (
                          <NavLink
                            to="/profile"
                            className={classNames(location.pathname == '/profile' ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Profil
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {() => (
                          <NavLink
                            onClick={()=> logout()}
                            className={classNames(location.pathname == '/logout' ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </NavLink>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current ? 'bg-white text-indigo-600 text-center' : 'text-center text-gray-300 hover:bg-white hover:text-indigo-600',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Header