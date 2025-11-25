import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Error } from './pages/Error/Error';
import { AuthAdmin } from './pages/AuthAdmin/AuthAdmin';
import { AdminLayout } from './layout/AdminLayout/AdminLayout';
import { Admin } from './pages/Admin/Admin';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ClientLayout } from './layout/ClienLayout/ClientLayout';
import { MainClient } from './pages/MainClient/MainClient';
import { HallClient } from './pages/HallClient/HallClient';
import { PaymentClient } from './pages/PaymentClient/PaymentClient';
import { TicketClient } from './pages/TicketClient/TicketClient';
import { NavigationProvider } from './context/NavigationProvider';
import { App } from './App';

// Настройка маршрутизации для приложения
// Используем createBrowserRouter для определения путей
const router = createBrowserRouter([
	{
		path: '/',
		element: <ClientLayout />,
		children: [
			{
				path: '/',
				element: <MainClient />
			},
			{
				path: 'hallconfig',
				element: <HallClient />
			},
			{
				path: 'payment',
				element: <PaymentClient />
			},
			{
				path: 'ticket',
				element: <TicketClient />
			}
		]
	},
	{
		path: '/admin',
		element: <AdminLayout />,
		children: [
			{
				path: 'login',
				element: <AuthAdmin />
			},
			{
				path: 'cabinet',
				element: <Admin />
			}
		]
	},
	{
		path: '*',
		element: <Error />
	}
],
	{
		basename: '/Diplom',
	}
);

// Инициализация приложения
// Оборачиваем в StrictMode и Provider для Redux
createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<App>
				<NavigationProvider>
					<RouterProvider router={router} />
				</NavigationProvider>
			</App>
		</Provider>
	</StrictMode>,
);
