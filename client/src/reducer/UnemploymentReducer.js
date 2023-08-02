
const initialState = {
    timePeriods: [{ start: '', end: '' }],
    optStart: '',
    totalTime: NaN,
    error: '',
};

const actionTypes = {
    ADD_TIME_PERIOD: 'addTimePeriod',
    UPDATE_TIME_PERIOD: 'updateTimePeriod',
    DELETE_TIME_PERIOD: 'deleteTimePeriod',
    RESET: 'reset',
    SET_OPT_START: 'setOptStart',
    SET_TOTAL_TIME: 'setTotalTime',
    SET_ERROR: 'setError',
    SET_STATE: 'setState',
    CLEAR: 'clear',
};

function reducer(state, action) {
    switch (action.type) {
        case actionTypes.ADD_TIME_PERIOD:
            return { ...state, timePeriods: [...state.timePeriods, { start: '', end: '' }] };
        case actionTypes.UPDATE_TIME_PERIOD:
            const newTimePeriods = [...state.timePeriods];
            newTimePeriods[action.index] = { start: action.start, end: action.end };
            return { ...state, timePeriods: newTimePeriods };
        case actionTypes.DELETE_TIME_PERIOD:
            const timePeriodsAfterDelete = [...state.timePeriods];
            timePeriodsAfterDelete.splice(action.index, 1);
            return { ...state, timePeriods: timePeriodsAfterDelete };
        case actionTypes.RESET:
            return initialState;
        case actionTypes.SET_OPT_START:
            return { ...state, optStart: action.value };
        case actionTypes.SET_TOTAL_TIME:
            return { ...state, totalTime: action.value };
        case actionTypes.SET_ERROR:
            return { ...state, error: action.value };
        case actionTypes.SET_STATE:
            if(!action.value.timePeriods || !action.value.optStart || !action.value.totalTime || !action.value.error) {
                return
            }
            return action.value;
        case actionTypes.CLEAR:
            return initialState;
        default:
            throw new Error();
    }
}

export { initialState, actionTypes, reducer };