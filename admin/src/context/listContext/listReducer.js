const listReducer = (state, action) => {
  switch (action.type) {
    case "GETLISTS_START":
      return {
        list: [],
        isFetching: true,
        error: false,
      };
    case "GETLISTS_SUCCESS":
      return {
        list: action.payload,
        isFetching: false,
        error: false,
      };
    case "GETLISTS_FAILURE":
      return {
        list: [],
        isFetching: false,
        error: true,
      };
    case "DELLISTS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELLISTS_SUCCESS":
      return {
        list: state.list.filter((list) => list.id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELLISTS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "CREATELISTS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATELISTS_SUCCESS":
      return {
        list: [...state.list, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATELISTS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPDATELISTS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATELISTS_SUCCESS":
      return {
        list: state.list.map((li) => {
          if (li._id === action.payload.id) {
            return action.payload;
          }
          return li;
        }),
        isFetching: true,
        error: false,
      };
    case "UPDATELISTS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
};

export default listReducer;
