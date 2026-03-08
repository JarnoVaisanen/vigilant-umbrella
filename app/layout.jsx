import './globals.css'

export const metadata = {
  title: 'To-Do List',
  description: 'A simple to-do list app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
