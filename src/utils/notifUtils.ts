import { notifications } from "@mantine/notifications"

const showNotificationError = (message: string) => {
    notifications.show({
        title: 'Error',
        message,
        color: 'error'
    });
}

const showNotificationSuccess = (message: string) => {
    notifications.show({
        title: 'Success',
        message,
        color: 'success'
    });
}

export { showNotificationError, showNotificationSuccess }