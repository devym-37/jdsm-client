const initialState = {
  coaches: [
    {
      key: "1",
      name: "kim",
      age: "23",
      contact: "111-1111-1111",
    },
    {
      key: "2",
      name: "lee",
      age: "26",
      contact: "222-2222-2222",
    },
  ],
};

const coachReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COACH": {
      return {
        ...state,
        coaches: [...state.coaches, action.coach],
      };
    }

    case "UPDATE_COACH": {
      return {
        ...state,
        coaches: [...updateCoach(state.coaches, action.coach)],
      };
    }

    case "DELETE_COACH": {
      return {
        ...state,
        coaches: [...deleteCoach(state.coaches, action.coach)],
      };
    }

    default: {
      return state;
    }
  }
};

const deleteCoach = (coachList, selectCoach) => {
  let data = coachList;
  const deleteCoach = selectCoach;
  let result = [];
  if (deleteCoach.length > 1) {
    for (let i = 0; i < deleteCoach.length; i++) {
      if (i !== 0) {
        result = result.filter(
          (coach) => coach["key"] !== deleteCoach[i]["key"]
        );
      } else {
        result = data.filter((coach) => coach["key"] !== deleteCoach[i]["key"]);
      }
    }

    return result;
  } else {
    result = data.filter((coach) => coach["key"] !== deleteCoach[0]["key"]);

    return result;
  }
};

const updateCoach = (coachList, updateCoach) => {
  let data = coachList;
  let update = updateCoach;
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

export default coachReducer;
