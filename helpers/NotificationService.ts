import { Store } from "react-notifications-component";

export default class NotificationService {

    static successNotification(title: string, message: string, callback?: Function, duration: number = 1000) {
        Store.addNotification({
            title: title,
            message: message,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: duration,
              onScreen: true
            },
          });
          setTimeout(() => {
           if(callback)  callback()
          }, duration);
    }

    static dangerNotification(title: string, message: string, duration: number = 1000) {
      Store.addNotification({
        title: title,
        message: message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: duration,
          onScreen: true
        }
      });
    }

}