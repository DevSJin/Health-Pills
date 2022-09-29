import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import BackButton from "../components/buttons/BackButton";
import styled from "styled-components";
import DailyCard from "../components/cards/DailyCard";
import SchedulePlusButton from "../components/buttons/SchedulePlusButton";
import { useState, useEffect } from "react";
import Modal from "../components/modals/Modal";
import ModalCloseButton from "../components/buttons/ModalCloseButton";
import ScheduleCreate from "../components/modals/contents/ScheduleCreate";
import ScheduleUpdateDelete from "../components/modals/contents/ScheduleUpdateDelete";
import { getYoilInfo, getYoilDetail, doneSchedule } from "../api/schedule";
import DailyDetailCard from "../components/cards/DailyDetailCard";
import ScheduleDone from "../components/buttons/ScheduleDone";

const BackWrapper = styled.div`
  background-color: #EAEFF1;
  background-size: cover;
  margin: auto;
`

const WeeklyWrapper = styled.div`
  display: flex;
  height: 100px;
  justify-content: space-around;
  /* background-color: transparent; */
`

const ButtonWrapper = styled.div`
  height: 120px;
  text-align: center;
`

const WeekDayWrapper = styled.div`
  text-align: center;
`


const Schedule = () => {
  // 모달 설정
  const [isOpen, setIsOpen] = useState(false);
  const [schedulePage, setSchedulePage] = useState("");
  const modalPage = {
    scheduleCreate: <ScheduleCreate/>,
    scheduleUpdateDelete: <ScheduleUpdateDelete/>
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // 00년 0월 0주차 설정
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    day: new Date().getDay(),
  });
  const yearTwo = date.year
  const yearLastTwo = yearTwo.toString().slice(-2);
  const weekly = ['일', '월', '화', '수', '목', '금', '토'];
  const weekDay = weekly[date.day]

  const monthFirstDay = new Date(date.year, (date.month) + 1, 1).getDay()
  const nthWeek = ((date.day + monthFirstDay - 1) % 7)

 // 오늘의 요일 설정
const [yoil, setYoil] = useState(date.day);

// 다른 요일로 바꾸기
const onHandleYoil = async (calendarDate) => {
  setYoil(calendarDate)
};

// 각 요일에 운, 영 개수 집어넣기
const [list, setList] = useState([]);

// 일정이 존재하지 않을 때 카드 개수 모자라는거 처리
const getInfo = async () => {
  const response = await getYoilInfo();
  console.log(response.data)
  let index = 0;
  let array = [];
  for(let i = 0; i < 7 && index < response.data.length; i++){
    if(response.data[index].calendarDate == i){
      array.push({calendarDate: response.data[index].calendarDate,
                  pillCount: response.data[index].pillCount,
                  exerciseCount: response.data[index].exerciseCount,
                });
      index++;
    } else{
      array.push({calendarDate: index, pillCount: 0, exerciseCount: 0});
    }
  }
  // 일정 아예 없을 때 처리
  if(response.data.length <= 0){
    for(let i = 0; i < 7; i++){
      array.push({calendarDate: i, pillCount: 0, exerciseCount: 0});
   }
 }
  setList([...array])
};

// 요일별 상세 일정 불러오기 (디폴트는 오늘 요일)
const getDetail = async () => {
  const response = await getYoilDetail(yoil);
  setDetail([...response.data])
}

// 요일별 상세 일정 변수 초기화
const [detail, setDetail] = useState([]);
console.log(detail)


const [flag, setFlag] = useState(false);
useEffect(() => {
  getInfo();
}, []);
useEffect(() => {
 getDetail();
}, [yoil, flag]);


// 일정 완료 체크 or 해제
const onToggleScheduleDone = async (calendarId) => {
  const response = await doneSchedule(calendarId);
  if (response.status === 200) {
    setFlag((prevState) => {
      return {...prevState, flag: !flag}
    });
  }
};


  return (
    <>
      <Modal
        isOpen={isOpen}
        modalContent={modalPage[schedulePage]}
        closeButton={<ModalCloseButton onClick={closeModal} />}
      />
      <Header leftNone={true} leftChildren={<BackButton />}/>
        <BackWrapper>
          <div style={{textAlign: "center", padding: "12px 0 24px 0"}}>
            {yearLastTwo}년 {date.month}월 {nthWeek}주차
          </div>
          <WeekDayWrapper>
            {/* 요일 자리 */}
          </WeekDayWrapper>
          <WeeklyWrapper>
            <div style={{display: "flex"}}>
              {list.map((item, idx) => (
                <DailyCard
                  {...item}
                  key={idx}
                  onHandleYoil={onHandleYoil}
                />
              ))}
            </div>
          </WeeklyWrapper>
          <ButtonWrapper
            onClick={() => {
              openModal();
              setSchedulePage("scheduleCreate");
            }}
          >
            <SchedulePlusButton/>
          </ButtonWrapper>
          <div>
            {detail.map((item, idx) => (
              <DailyDetailCard {...item} key={idx} onToggleScheduleDone={onToggleScheduleDone}/>
            ))}
          </div>
        </BackWrapper>
      <Footer/>
    </>
  )
}

export default Schedule;