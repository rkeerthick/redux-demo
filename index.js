const redux = require("redux");
// middleware package
const reduxLogger = require("redux-logger");
const createStore = redux.createStore;
const combineReducer = redux.combineReducers;
// middleware
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

// actions creator
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "first action",
  };
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
    info: "first action",
  };
}

// state
// const initialState = {
//   cakeCount: 10,
// };

const initialCakeState = {
  cakeCount: 10,
};

const initialIceCreamCount = {
  iceCreamCount: 20,
};

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return { ...state, cakeCount: state.cakeCount - 1 };

//     case BUY_ICECREAM:
//       return { ...state, iceCreamCount: state.iceCreamCount - 1 };

//     default:
//       return state;
//   }
// };

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        cakeCount: state.cakeCount - 1,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamCount, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return { ...state, iceCreamCount: state.iceCreamCount - 1 };

    default:
      return state;
  }
};

// combine reducers

const rootReducer = combineReducer({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial state: ", store.getState());
// listener
const unsubscribe = store.subscribe(
  () => {}
  //   console.log("updated state: ", store.getState())
);

// dispatcher
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe();
