import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8080",
});

export const coach = {
  registerCoachInfo: (params) => api.post(`/coach`, params),
  updateCoachInfo: (params, id) => api.put(`/coach/${id}`, params),
  getCoachesInfo: () =>
    api
      .get(`/coach`)
      .then((res) => res)
      .catch((error) => console.log("err", error)),
  getCoachInfo: (id) =>
    api
      .get(`/coach/${id}`)
      .then((res) => res)
      .catch((error) => console.log("err", error)),
};

export const member = {
  registerMemberInfo: (params) => api.post(`/members`, params),
  getMembersInfo: () =>
    api
      .get(`/members`)
      .then((res) => res)
      .catch((error) => console.log("err", error)),
  getMemberInfo: (id) =>
    api
      .get(`/member/${id}`)
      .then((res) => res)
      .catch((error) => console.log("err", error)),
};

export const lesson = {
  registerLessonInfo: (params) => api.post(`/lesson`, params),
  registerLessonCoach: (params, id) =>
    api.post(`/lesson/${id}/coaches`, params),
  registerLessonMember: (params, id) =>
    api.post(`/lesson/${id}/members`, params),
  updateLessonInfo: (params, id) => api.put(`/lesson/${id}`, params),
  getLessons: () =>
    api
      .get(`/lesson`)
      .then((res) => res)
      .catch((error) => console.log("err", error)),
  getLessonDay: (params) =>
    api
      .get(`/lesson/days/${params}`)
      .then((res) => res)
      .catch((error) => console.log("err", error)),
  getLessonInfo: (key) =>
    api
      .get(`/lesson/${key}`)
      .then((res) => res)
      .catch((error) => console.log("err", error)),
  getLessonCoaches: (id) =>
    api
      .get(`/lesson/${id}/coaches`)
      .then((res) => res)
      .catch((error) => console.log("err", error)),
  getLessonMembers: (id) =>
    api
      .get(`/lesson/${id}/members`)
      .then((res) => res)
      .catch((error) => console.log("err", error)),
};
