export const metadata = {
  title: 'MP SERV PORT',
  description: 'Excelência em Facilities e Portaria',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body style={{ margin: 0, padding: 0, fontFamily: 'sans-serif', backgroundColor: '#050505' }}>
        {children}
      </body>
    </html>
  )
}
