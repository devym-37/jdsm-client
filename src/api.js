import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8080",
});

export const coach = {
  registerCoachInfo: (params) => api.post(`/coach`, params),
  updateCoachInfo: (params, id) => api.put(`/coach/${id}`, params),
  getCoachesInfo: () => api.get(`/coach`),
  getCoachInfo: (id) => api.get(`/coach/${id}`),
};

export const member = {
  registerMemberInfo: (params) => api.post(`/members`, params),
  getMembersInfo: () => api.get(`/members`),
  getMemberInfo: (id) => api.get(`/member/${id}`),
};

export const lesson = {
  registerLessonInfo: (params) => api.post(`/lesson`, params),
  registerLessonCoach: (params, id) =>
    api.post(`/lesson/${id}/coaches`, params),
  registerLessonMember: (params, id) =>
    api.post(`/lesson/${id}/members`, params),
  updateLessonInfo: (params, id) => api.put(`/lesson/${id}`, params),
  getLessons: () => api.get(`/lesson`),
  getLessonDay: (params) => api.get(`/lesson/days/${params}`),
  getLessonInfo: (id) => api.get(`/lesson/${id}`),
  getLessonCoaches: (id) => api.get(`/lesson/${id}/coaches`),
  getLessonMembers: (id) => api.get(`/lesson/${id}/members`),
};
