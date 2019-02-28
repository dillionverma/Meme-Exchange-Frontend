import { ERROR } from "@/store/notification.module";

export const handleError = (commit, err) => {
  console.log(err);
  if (err.response) {
    console.log(err.response);
    commit(ERROR, {
      message: err.response.data.errors[0].detail
    });
  } else if (err.request) {
    console.log(err.request);
    commit(ERROR, err.request);
  } else {
    console.log(err.message);
    commit(ERROR, err.message);
  }
};
