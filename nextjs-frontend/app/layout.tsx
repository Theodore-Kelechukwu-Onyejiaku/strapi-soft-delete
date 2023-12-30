import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Sidebar from './components/Sidebar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Strapi Soft Delete',
  description: 'Implement Strapi Soft Delete',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <ToastContainer />
        <div>
          <div>
            <div className="flex h-screen overflow-scroll">
              {/* Side Bar */}
              <div className='hidden sm:block'>
                <Sidebar />
              </div>
              <div>

              </div>
              {/* Main content */}
              <div className="flex-1 p-4 w-full ml-0 sm:ml-[287px] overflow-hidden  bg-white">
                <div className='mt-4'>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
