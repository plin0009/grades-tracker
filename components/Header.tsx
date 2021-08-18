import Link from 'next/link'

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => (
  <div className="flex gap-4 items-center my-4">
    <Link href="/" passHref>
      <a className="flex-1">
        <h1 className="text-2xl">Grades Tracker</h1>
      </a>
    </Link>
    <button className="px-4 py-2 bg-gray-500 rounded-md shadow-md text-white">
      Import
    </button>
    <button
      className="px-4 py-2 bg-gray-500 rounded-md shadow-md text-white disabled:opacity-50 disabled:cursor-not-allowed"
      disabled
    >
      Export
    </button>
  </div>
)

export default Header
