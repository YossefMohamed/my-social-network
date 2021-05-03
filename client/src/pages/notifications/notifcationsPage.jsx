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
        <div style={{ margin: "auto", textAlign: "center" }} className="py-5">
          <LoaderComponent />
        </div>
      ) : (
        <div>
          {notifications.map((not) => (
            <Notifications item={not} key={not.id} />
          ))}
          {!notifications.length && (
            <h2
              className="py-5"
              style={{ textAlign: "center", paddingLeft: "6rem" }}
            >
              You Have No Notifications :(
            </h2>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationsPage;
