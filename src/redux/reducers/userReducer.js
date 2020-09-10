const initialState = {
  users: [
    {
      key: "1",
      이름: "lee",
      학교: "학교",
      학년: "3학년",
      연락처: "000-0000-0000",
      레슨: "",
    },
    {
      key: "2",
      이름: "kim",
      학교: "3학교",
      학년: "3학년",
      연락처: "111-1111-1111",
      레슨: "",
    },
    {
      key: "3",
      이름: "park",
      학교: "45학교",
      학년: "1학년",
      연락처: "222-2222-2222",
      레슨: "",
    },
  ],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER": {
      return {
        ...state,
        users: [...state.users, action.user],
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
