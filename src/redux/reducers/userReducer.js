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
    case "UPDATE_USER": {
      return {
        ...state,
        users: [...updateUser(state.users, action.user)],
      };
    }

    case "DELETE_USER": {
      return {
        ...state,
        users: [...deleteUser(state.users, action.user)],
      };
    }

    default: {
      return state;
    }
  }
};

const deleteUser = (userList, selectUser) => {
  let data = userList;
  const deleteUser = selectUser;
  let result = [];
  if (deleteUser.length > 1) {
    for (let i = 0; i < deleteUser.length; i++) {
      if (i !== 0) {
        result = result.filter((user) => user["key"] !== deleteUser[i]["key"]);
      } else {
        result = data.filter((user) => user["key"] !== deleteUser[i]["key"]);
      }
    }

    return result;
  } else {
    result = data.filter((user) => user["key"] !== deleteUser[0]["key"]);

    return result;
  }
};

const updateUser = (userList, updateUser) => {
  let data = userList;
  let update = updateUser;
  let updateIndex = 0;
  let result = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i]["key"] === update["key"]) {
      updateIndex = i;
      break;
    }
  }
  result = data.splice(updateIndex, 1, update);

  return data;
};

export default userReducer;
