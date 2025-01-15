import { Link } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
  }

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <nav>
                <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/users">Usuarios</Link>
                </li>
                </ul>
            </nav>
            <main>
                {children}
            </main>
        </div>
    );
};
