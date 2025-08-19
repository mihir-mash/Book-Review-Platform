import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <>
      <Header />
      <main className="page-container">
        <Outlet /> {/* This is where the page content will be rendered */}
      </main>
      <Footer />
    </>
  );
}

export default Layout;