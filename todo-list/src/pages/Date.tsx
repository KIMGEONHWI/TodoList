import { useState } from "react";
import styled from "styled-components";
import Calendar, { CalendarProps } from "react-calendar";
import { useNavigate, useParams } from "react-router-dom";
import "react-calendar/dist/Calendar.css";

const DateComponent = () => {
  const [today, setToday] = useState<Date>(new Date());
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  const onChangeToday: CalendarProps["onChange"] = (date) => {
    setToday(date as Date);
    // 월과 일을 포맷팅
    const month = String((date as Date).getMonth() + 1).padStart(2, "0");
    const day = String((date as Date).getDate()).padStart(2, "0");
    const formattedDate = `${month}-${day}`;
    navigate(`/Home/${userId}/${formattedDate}`);
  };

  return (
    <CalendarBox>
      <StyleCalendar locale="ko" onChange={onChangeToday} value={today} />
    </CalendarBox>
  );
};

export default DateComponent;

export const CalendarBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;

  .react-calendar__navigation {
    display: flex;
    height: 5rem;
    margin-bottom: 1em;
    font-size: 1rem;
  }

  .react-calendar__navigation button {
    min-width: 3rem;
    font-size: 3rem;
    background-color: none;
  }

  .react-calendar__navigation button:disabled {
    background-color: #e8e8e8;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e8e8e8;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    height: 6rem;
    line-height: 3rem;
    font-size: 5rem;
  }

  .react-calendar__tile {
    padding: 2rem 1.5rem;
    font-size: 3rem;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2rem 1.5rem;
  }

  .react-calendar__tile--hasActive {
    color: #ffffff;
    background-color: #797979;
    border-radius: 1rem;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background-color: #797979;
  }

  .react-calendar__tile--active {
    color: #ffffff;
    background-color: #6a6a6a;
    border-radius: 1rem;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background-color: #6a6a6a;
  }
`;

export const StyleCalendar = styled(Calendar)`
  width: 100%;
  height: 100%;
  border: none;
  padding: 20rem;
  background-image: url("/src/assets/img/background.jpg");
  background-size: cover;
  background-position: center;
`;
