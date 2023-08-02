import React from "react";
import { actionTypes } from "../reducer/UnemploymentReducer.js";

export const TimePeriod = ({ timePeriod, index, dispatch }) => {
        const { start, end } = timePeriod;
        const startTime = new Date(start);
        const endTime = new Date(end);
        const days = Math.abs(endTime - startTime) / (1000 * 60 * 60 * 24);

        return (
            <div key={index} className="time-period">
                <span className="show-on-wide-screen">失业期</span>
                <span>{index + 1}：</span>
                <label className="show-on-wide-screen">从:</label>
                <input
                    type="date"
                    value={timePeriod.start}
                    onChange={e => dispatch({
                            type: actionTypes.UPDATE_TIME_PERIOD,
                            index,
                            start: e.target.value,
                            end: timePeriod.end
                    })}
                />

                <label className="show-on-wide-screen">到:</label>
                <label className="show-on-narrow-scrren">&gt;</label>
                <input
                    type="date"
                    value={timePeriod.end}
                    onChange={e => dispatch({
                            type: actionTypes.UPDATE_TIME_PERIOD,
                            index,
                            start: timePeriod.start,
                            end: e.target.value
                    })}
                />
                <span>{isNaN(days) ? 'N/A' : days}天</span>
                <button onClick={() => dispatch({type: actionTypes.DELETE_TIME_PERIOD, index})}>删除</button>
            </div>
        )
};

export default TimePeriod;