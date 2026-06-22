import React from 'react'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (<>
    <html lang="en">
      <body>
        <main className="m-3">
          {children}
        </main>
      </body>
    </html>
  </>)
}
