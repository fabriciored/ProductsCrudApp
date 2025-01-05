import Footer from './footer'
import Header from './header'

interface TemplateProps {
    children: React.ReactNode
}

function Template({children}: TemplateProps) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <main className="container mx-auto p-4">
        {
            children
        }
      </main>
      <Footer />
    </div>
  )
}

export default Template