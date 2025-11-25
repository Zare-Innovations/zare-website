// core styles are required for all packages
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

// import { NavBar } from './_components/nav-bar';

// import Footer from './_components/footer';
import { NavBarV2 } from './_components/nav-bar-v2';
import FooterV2 from './_components/footerv2';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col  ">
      <NavBarV2 />
      <div>
        {children}
      </div>    
      <FooterV2 />
    </div>
  );
}
