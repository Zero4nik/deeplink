import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/authContext';
import Home from '@/components/NavigationBar';
export const metadata: Metadata = {
  title: 'Deeplink',
  description: 'Социальная сеть для разработчиков',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <AuthProvider>
          <Home/>
          {children}
        </AuthProvider>
        </body>
    </html>
  );
}