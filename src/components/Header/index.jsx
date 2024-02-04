import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { getMeAsync, refreshTokenAsync } from '../../redux/AuthSlice/AuthSlice'
import { getAllNotificationsAsync, readAllNotificationsAsync } from '../../redux/NotificationSlice/NotificationSlice'
import { Modal } from 'antd'
import moment from 'moment';

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notificationRef = useRef(null);
  
  const [notificationModal, setNotificationModal] = useState(false);
  const access = localStorage.getItem("access");

  let me = useSelector((state) => state.auth.me)
  let notifications = useSelector((state) => state.notification.notifications)
  let notfCount = useSelector((state) => state.notification.count)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationModal(false);
      }
    };

    // Add event listener to the document
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts


  useEffect(() => {
    if(access) {
      dispatch(getMeAsync())
      .then(() => {
        dispatch(getAllNotificationsAsync({user: me && me.user.id, offset: 0}))
      })
    }
  }, [dispatch])

  const openNotf = () => {
    setNotificationModal(!notificationModal)
    dispatch(readAllNotificationsAsync({user: me && me.user.id}))
    dispatch(getAllNotificationsAsync({user: me && me.user.id, offset: 0}))
  }

  function logout() {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    navigate("/");
    window.location.reload();
  }

  const navigation = [
    { name: 'Ana Səhifə', href: '/', current: location.pathname == '/' ? true : false },
    { name: 'Haqqımızda', href: '/about', current: location.pathname == '/about' ? true : false },
    { name: 'Sifariş əlavə et', href: '/entrepreneur', current: location.pathname == '/entrepreneur' ? true : false },
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
                  {me && me.user ? <>{me.user.first_name} {me.user.last_name}</>: ""}
                </p>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {
                        me && me.profile_picture ? 
                          <>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={me.profile_picture}
                              alt=""/>
                          </> : 
                            <img
                              className="h-8 w-8 rounded-full"
                              src="/images/default_avatar.png"
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
                      {
                        me && me.user.is_staff ? (
                        <Menu.Item>
                          {() => (
                            <NavLink
                              to="/admin"
                              className={classNames(location.pathname == '/admin' ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Admin
                            </NavLink>
                          )}
                        </Menu.Item>
                        ) : ""
                      }
                      <Menu.Item>
                        {() => (
                          <NavLink
                            to={`/profile/${me && me.id}`}
                            state={{id: me && me.id}}
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
                            Çıxış
                          </NavLink>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <div className='relative' ref={notificationRef}>

                  <button onClick={() => openNotf()} type="button" className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none ml-3 relative">
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">View notifications</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                    {
                      notfCount > 0 && <span className='absolute bottom-5 left-5 rounded-full w-5 bg-white text-slate-900'>{notfCount}</span>
                    }
                  </button>
                  <div 
                    className={notificationModal ? `block shadow-xl` : `hidden`} 
                    style={{
                      position: "absolute",
                      top: 50,
                      right: 0,
                      backgroundColor: "#fff",
                      paddingTop: 20,
                      paddingRight: 5,
                      paddingLeft: 15,
                      paddingBottom: 10,
                      color: "black",
                      width: 300,
                      zIndex: 100
                    }}
                  >
                    {
                        notifications && notifications.length ? (
                          <ul className='w-full h-96 overflow-auto'>
                            {
                              notifications.map((notification) => (
                                <li key={notification.id} className='flex flex-col'>
                                  {notification.message}
                                  <br />
                                  <small className='self-end'>
                                    {moment(notification.created_at).format('DD.MM.YYYY, HH:mm')}
                                  </small>
                                  <hr />
                                </li>
                              ))
                            }
                          </ul>
                        ) : (
                          <ul className='w-full h-auto overflow-auto'>
                            <li>Bildiriş yoxdur</li>
                          </ul>
                        )
                      }
                  </div>

                  </div>
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