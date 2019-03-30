import { formatDistance } from "date-fns";
import { ERROR } from "@/store/notification.module";

export const handleError = (commit, err) => {
  console.log(err);
  if (err.response) {
    console.log(err.response);
    if (err.response.data && err.response.data.errors) {
      commit(ERROR, {
        message: err.response.data.errors[0].detail
      });
    } else {
      commit(ERROR, {
        message: err.response.data
      });
    }
  } else if (err.request) {
    console.log(err.request);
    commit(ERROR, {
      message: "Network Error"
    });
  } else {
    console.log(err.message);
    commit(ERROR, {
      message: err.message
    });
  }
};

export const formatDateMilli = date => {
  if (!date) return;
  return formatDistance(new Date(date * 1000), new Date(), {
    addSuffix: true,
    includeSeconds: true
  });
};

export const formatDate = date => {
  if (!date) return;
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
    includeSeconds: true
  });
};
