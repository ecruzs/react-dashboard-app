import { Router } from '@/routes/Router';
import { AppProvider, NotificationProvider } from '@/shared/context';

function App() {
  return (
    <AppProvider>
      <NotificationProvider>
        <Router />
      </NotificationProvider>
    </AppProvider>
  );
}

export default App;