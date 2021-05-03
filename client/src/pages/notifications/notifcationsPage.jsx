import React from "react";
import Notifications from "../../components/notifications/notifications";
import { useDispatch, useSelector } from "react-redux";
import { notificationAction } from "../../actions/notifications";
import LoaderComponent from "../../components/loader/Loader";
function NotificationsPage() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { notifications } = useSelector((state) => state.notifications);
  const { loading } = useSelector((state) => state.notifications);
  React.useEffect(() => {
    dispatch(notificationAction(userInfo.token));
    dispatch({
      type: "NOT_NEW",
    });
  }, []);
  return (
    <div>
      {loading ? (
        <LoaderComponent />
      ) : (
        <div>
          {notifications.map((not) => (
            <Notifications item={not} key={not.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationsPage;
