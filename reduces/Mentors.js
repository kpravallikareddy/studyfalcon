/** @format */

const Mentors = (state = [], action) => {
    switch (action.type) {
        case "ADDITION":
            if (!state.includes(action.payload)) {
                return [...state, action.payload];
            } else return [...state];
    }
    return state;
};

export default Mentors;
