const initialState = {
  days: ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
};

const lessonReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default lessonReducer;
