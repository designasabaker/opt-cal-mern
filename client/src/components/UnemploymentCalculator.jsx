import React, { useEffect, useReducer } from 'react';
import TimePeriod from './TimePeriod';
import { initialState, actionTypes, reducer } from '../reducer/UnemploymentReducer.js';
import {useUser} from "../context/UserContext.jsx";
import {motion} from "framer-motion";
import LANGUAGE from "../constants/language.js";
import {useLanguage} from "../context/LanguageContext.jsx";

const LOCAL_STORAGE_KEY = 'OPT-state';

// const loadStateFromLocalStorage = () => {
//     try {
//         const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
//         if (serializedState === null) {
//             return initialState;
//         }
//         return JSON.parse(serializedState);
//     } catch (err) {
//         return initialState;
//     }
// };
//
// const saveStateToLocalStorage = (state) => {
//     try {
//         const serializedState = JSON.stringify(state);
//         localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
//     } catch {
//         // ignore write errors
//     }
// };

const title= {
    [LANGUAGE.TRADITIONAL_CHINESE]: 'OPT失業期計算器',
    [LANGUAGE.SIMPLIFIED_CHINESE]:'OPT失业期计算器',
    [LANGUAGE.ENGLISH]: 'OPT Unemployment Calculator',
}
const textTotalUmemploymentTime = {
    [LANGUAGE.TRADITIONAL_CHINESE]: '總失業期',
    [LANGUAGE.SIMPLIFIED_CHINESE]: '总失业期',
    [LANGUAGE.ENGLISH]: 'Total Unemployment Time',
}
const textStartHint = {
    [LANGUAGE.SIMPLIFIED_CHINESE]: '请输入开始日期、每个时间段，谢谢',
    [LANGUAGE.TRADITIONAL_CHINESE]: '請輸入開始日期、每個時間段，謝謝',
    [LANGUAGE.ENGLISH]: 'Please enter start date and each time period, thank you',
}
const textOPTStart = {
    [LANGUAGE.SIMPLIFIED_CHINESE]: 'OPT开始日期',
    [LANGUAGE.TRADITIONAL_CHINESE]: 'OPT開始日期',
    [LANGUAGE.ENGLISH]: 'OPT Start Date',
}
const textDays = {
    [LANGUAGE.SIMPLIFIED_CHINESE]: '天',
    [LANGUAGE.TRADITIONAL_CHINESE]: '天',
    [LANGUAGE.ENGLISH]: 'days',
}
const textAddMoreTimePeriod = {
    [LANGUAGE.SIMPLIFIED_CHINESE]: '添加新的时间段',
    [LANGUAGE.TRADITIONAL_CHINESE]: '添加新的時間段',
    [LANGUAGE.ENGLISH]: 'Add More Time Period',
}
const textRest={
    [LANGUAGE.SIMPLIFIED_CHINESE]: '清空',
    [LANGUAGE.TRADITIONAL_CHINESE]: '清空',
    [LANGUAGE.ENGLISH]: 'Reset',
}
const textGetState={
    [LANGUAGE.SIMPLIFIED_CHINESE]: '获取保存的状态',
    [LANGUAGE.TRADITIONAL_CHINESE]: '獲取保存的狀態',
    [LANGUAGE.ENGLISH]: 'Get Saved State',
}
const textSaveState={
    [LANGUAGE.SIMPLIFIED_CHINESE]: '保存状态',
    [LANGUAGE.TRADITIONAL_CHINESE]: '保存狀態',
    [LANGUAGE.ENGLISH]: 'Save State',
}

const UnemploymentCalculator = () => {
    const { user, getState, isGettingState, isSavingState, saveState, state, dispatch, closeLoginRegister } = useUser();
    const { language: lang } = useLanguage();

    const saveBtnClickHandler = () => {
        console.log('clicked')
        saveState(state);
    }

    const getBtnClickHandler = async () => {
        const loadedState = await getState();
        console.log('get state', loadedState);
        if(loadedState){
            try{
                dispatch({ type: actionTypes.SET_STATE, value: loadedState });
            }
            catch (err){
                console.log(err);
            }
        }
    }

    const updateTotalTime = () => {
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
        dispatch({ type: actionTypes.SET_TOTAL_TIME, value: total })
    }

    useEffect(() => {
        updateTotalTime();
    },[state.timePeriods, state.optStart])

    return (
        <div className="app" onClick={closeLoginRegister}>
            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'spring', stiffness: 50 }}>
                {title[lang]}
            </motion.h1>
            <motion.div
                initial={{ y: '100vh', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 50 }}
                className="cacu-display-container">
                <div className="display-container">
                    <p>{isNaN(state.totalTime) ? textStartHint[lang] : `${state?.totalTime} ${textDays[lang]}`}</p>
                    <p className={"err"}>{state.error}</p>
                    <h2>
                        {/*总失业期*/}
                        {textTotalUmemploymentTime[lang]}
                    </h2>
                </div>
                <div className="vertical-line"></div>
                <div>
                    <div className="start-time-container">
                        <label>{textOPTStart[lang]}:</label>
                        <input type="date" value={state.optStart} onChange={e => dispatch({ type: 'setOptStart', value: e.target.value })} />
                    </div>
                    <hr />
                    {state.timePeriods.map((timePeriod, index) => (
                        <TimePeriod timePeriod={timePeriod} key={index} index={index} dispatch={dispatch} />
                    ))}
                    <div>
                        <button onClick={() => dispatch({ type: actionTypes.ADD_TIME_PERIOD })}>{textAddMoreTimePeriod[lang]}</button>
                    </div>
                </div>
            </motion.div>
            <motion.div
                initial={{ y: '100vh', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 50, delay: 0.5 }}
                className="refresh-btn-container">
                {user ?
                    <button
                        style={{width: '132px',}}
                        onClick={getBtnClickHandler}>
                            {!isGettingState ? textGetState[lang] : '↺'}
                    </button> :
                    <button
                        style={{width: '132px',}}
                        className={"disable"}>
                        {textGetState[lang]}
                    </button>
                }
                <button onClick={() => dispatch({ type: actionTypes.RESET })}>{textRest[lang]}</button>
                {user ?
                    <button
                        style={{width: '132px',}}
                        onClick={saveBtnClickHandler}>
                            {!isSavingState ? textSaveState[lang] : '↺'}
                    </button>:
                    <button
                        style={{width: '132px',}}
                        className={"disable"}>
                            {textSaveState[lang]}
                    </button>}
            </motion.div>
            <div>
                {!user && <span className={'notation'}>Log in to get and save state.</span>}
            </div>
        </div>
    );
};

export default UnemploymentCalculator;
