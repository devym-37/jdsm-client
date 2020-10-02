const initialState = {
  members: [
    {
      key: 1,
      name: "lee",
      registrationDate: "2020-09-15",
      parentName: "이재익",
      contact: "000-0000-0000",
      lesson: "",
    },
    {
      key: 2,
      name: "kim",
      registrationDate: "2020-09-15",
      parentName: "이재익",
      contact: "111-1111-1111",
      lesson: "",
    },
    {
      key: 3,
      name: "park",
      registrationDate: "2020-09-15",
      parentName: "이재익",
      contact: "222-2222-2222",
      lesson: "",
    },
  ],
};

const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MEMBER": {
      return {
        ...state,
        members: [...state.members, action.member],
      };
    }
    case "UPDATE_MEMBER": {
      return {
        ...state,
        members: [...updateMember(state.members, action.member)],
      };
    }

    case "DELETE_MEMBER": {
      return {
        ...state,
        members: [...deleteMember(state.members, action.member)],
      };
    }

    default: {
      return state;
    }
  }
};

const deleteMember = (memberList, selectMember) => {
  let data = memberList;
  const deleteMember = selectMember;
  let result = [];
  if (deleteMember.length > 1) {
    for (let i = 0; i < deleteMember.length; i++) {
      if (i !== 0) {
        result = result.filter(
          (user) => user["key"] !== deleteMember[i]["key"]
        );
      } else {
        result = data.filter((user) => user["key"] !== deleteMember[i]["key"]);
      }
    }

    return result;
  } else {
    result = data.filter((user) => user["key"] !== deleteMember[0]["key"]);

    return result;
  }
};

const updateMember = (memberList, updateMember) => {
  let data = memberList;
  let update = updateMember;
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

export default memberReducer;
