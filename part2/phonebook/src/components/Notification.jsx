/* eslint-disable react/prop-types */

const Notification = ({ message }) => {
  if (!message) {
    return null; // Don't display the notification if no message is set
  }

  const notificationStyle = {
    color: message.isError ? "red" : "green", // Red for errors, green for success
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderColor: message.isError ? "red" : "green",
  };

  return <div style={notificationStyle}>{message.text}</div>;
};

export default Notification;
