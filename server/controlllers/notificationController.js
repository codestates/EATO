const Notification = require("../models/notification");

module.exports = {
  getNotifications: async (req, res) => {
    const { userId } = res.cookie;
    const notificationsOfUser = await Notification.findOne(
      { _id: userId },
      { _id: 0 }
    ).lean();
    if (!notificationsOfUser) {
      return res
        .status(400)
        .json({ message: "you don't have notification document" });
    }
    return res.status(200).json(notificationsOfUser.notification);
  },
  deleteNotification: async (req, res) => {
    const { notificationId } = req.params;
    const { userId } = res.cookie;
    const notificationOfUser = await Notification.findOneAndUpdate(
      { _id: userId },
      { $pull: { notification: { id: notificationId } } },
      { new: true }
    );
    if (!notificationOfUser) {
      return res
        .status(400)
        .json({ message: "you don't have notification document" });
    }
    return res.status(200).json({ message: "ok" });
  },
};
