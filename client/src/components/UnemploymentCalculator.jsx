import React, { useEffect, useReducer } from 'react';
import TimePeriod from './TimePeriod';
import { initialState, actionTypes, reducer } from '../reducer/UnemploymentReducer.js';

const LOCAL_STORAGE_KEY = 'OPT-state';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (serializedState === null) {
            return initialState;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return initialState;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
    } catch {
        // ignore write errors
    }
};

const UnemploymentCalculator = () => {
    const [state, dispatch] = useReducer(reducer, loadState());

    useEffect(() => {
        saveState(state);
    }, [state]);

    useEffect(() => {
        let total = 0;
        let err = '';
        for (let i = 0; i < state.timePeriods.length; i++) {
            const { start, end } = state.timePeriods[i];
            const startTime = new Date(start);
            const endTime = new Date(end);

            if (startTime < new Date(state.optStart)) {
                dispatch({ type: actionTypes.SET_ERROR, value: '错误：有时间段开始时间早于OPT开始时间' });
                return;
            }

            const oneYearLater = new Date(startTime.getTime());
            oneYearLater.setFullYear(startTime.getFullYear() + 1);
            if (endTime > oneYearLater) {
                err = '错误：有时间段超出开始时间一年';
                break;
            }

            total += Math.abs(endTime - startTime) / (1000 * 60 * 60 * 24);
        }
        dispatch({ type: actionTypes.SET_ERROR, value: err });
        dispatch({ type: actionTypes.SET_TOTAL_TIME, value: total });
    }, [state.optStart, state.timePeriods]);

    return (
        <div className="app">
            <h1>OPT失业期计算器</h1>
            <div className="cacu-display-container">
                <div className="display-container">
                    <p>{isNaN(state.totalTime) ? '请输入开始日期、每个时间段，谢谢' : `${state.totalTime} 天`}</p>
                    <p>{state.error}</p>
                    <h2>总失业期</h2>
                </div>
                <div className="vertical-line"></div>
                <div>
                    <div className="start-time-container">
                        <label>OPT开始时间:</label>
                        <input type="date" value={state.optStart} onChange={e => dispatch({ type: 'setOptStart', value: e.target.value })} />
                    </div>
                    <hr />
                    {state.timePeriods.map((timePeriod, index) => (
                        <TimePeriod timePeriod={timePeriod} key={index} index={index} dispatch={dispatch} />
                    ))}
                    <div>
                        <button onClick={() => dispatch({ type: actionTypes.ADD_TIME_PERIOD })}>添加新的时间段</button>
                    </div>
                </div>
            </div>
            <div className="refresh-btn-container">
                <button onClick={() => dispatch({ type: actionTypes.RESET })}>刷新</button>
            </div>
        </div>
    );
};

export default UnemploymentCalculator;
