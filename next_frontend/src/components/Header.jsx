import Link from "next/link"


const Header = () => {
  return (
    <header className="bg-gray-100">
    <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <h1 className='text-slate-800 text-2xl font-bold'>POC</h1>
          </Link>
        
        </div>
        {/* <!-- Right Side Menu --> */}
        <div className="ml-auto">
          <div className="ml-4 flex items-center md:ml-6">
            {/* <!-- Logged Out Only --> */}
           
            <Link
              href="/blog"
              className="mr-3 text-gray-800 hover:text-gray-600"
            >
              Blog
            </Link>
            <Link
              href="/new-blog"
              className="mr-3 text-gray-800 hover:text-gray-600"
            >
              New Blog
            </Link>
            <Link
              href="/test-form"
              className="mr-3 text-gray-800 hover:text-gray-600"
            >
              <i className="fa fa-user"></i> Register
            </Link>            
            <Link
              href="login.html"
              className="mx-3 text-gray-800 hover:text-gray-600"
            >
              <i className="fa fa-sign-out"></i> Sign Out
            </Link>
          </div>
        </div>
      </div>
    </nav>

    {/* <!-- Mobile menu --> */}
    <div className="md:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        <Link
          href="/blog/new"
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
        >
          New Blog
        </Link>
        {/* <!-- Logged In Only --> */}
        <Link
          href=""
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
        >
          Bookings
        </Link>
        <Link
          href="/add-room.html"
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
        >
          Add Room
        </Link>
      </div>
    </div>
  </header>
  )
}

export default Header