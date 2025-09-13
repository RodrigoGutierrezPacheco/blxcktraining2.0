import GlobalNotification from './GlobalNotification';
import { useNotification } from '../context/NotificationContext';

const NotificationWrapper = () => {
  const { notification, hideNotification } = useNotification();

  return (
    <GlobalNotification
      isVisible={notification.isVisible}
      type={notification.type}
      title={notification.title}
      message={notification.message}
      duration={notification.duration}
      position={notification.position}
      showProgressBar={notification.showProgressBar}
      showCloseButton={notification.showCloseButton}
      autoClose={notification.autoClose}
      onClose={hideNotification}
    />
  );
};

export default NotificationWrapper;
