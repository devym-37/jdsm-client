const initialState = {
  users: [
    {
      key: "1",
      name: "lee",
      school: "school",
      grade: "3학년",
      contact: "000-0000-0000",
      lesson: "",
    },
    {
      key: "2",
      name: "kim",
      school: "3학교",
      grade: "3학년",
      contact: "111-1111-1111",
      lesson: "",
    },
    {
      key: "3",
      name: "park",
      school: "45학교",
      grade: "1학년",
      contact: "222-2222-2222",
      lesson: "",
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
