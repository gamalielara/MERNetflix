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
    default:
      return state;
  }
};

export default listReducer;
