import React, {useEffect} from 'react';

import './Time.css'

const Time = (props) => {
  const { setState } = props

  useEffect(() => {
      var date = new Date();
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var formattedTime = hours + ':' + minutes.substr(-2);
      setState(state => ({...state, time: formattedTime}))
  }, [])

  const renderTime = () => {
    return (<li className="time-widget-list-item" key={props.time.id}>
        {props.time}
            </li>
            );
  };

  return <div className = "timeWidget" >
        <ul className="time-widget-list">
            {renderTime()}
        </ul>
  </div>
};

export default Time;
