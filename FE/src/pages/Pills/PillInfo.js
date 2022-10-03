import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bookMarkPill, takingPill, PillDetailFetch } from '../../store/actions/pills'
import { SimilarPillsFetch } from '../../store/actions/recommend'
import imgUrl from "../../assets/waitingimg.jpg"

import styled from 'styled-components'
import RecomPills from './RecomPills'

const ImgDiv = styled.div`
position: relative;
margin: 8px 0px;
border: 1px solid #CAD1D5;
border-radius: 8px;
padding: 4px 0px;

`
const ItemDiv = styled.div`
margin-top: 20px;
margin-bottom: 8px;
font-weight: 500;
color: black;
`
const UnBookMarkDiv = styled.div`
position: absolute;
top: 12px;
right: 8px;
cursor: pointer;
padding: 6px 6px;
background-color: transparent;
color: #39f2ac;
background: linear-gradient(#537CFE, #6A53FE);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
`
const BookMarkDiv = styled.div`
position: absolute;
top: 12px;
right: 8px;
cursor: pointer;
padding: 6px 6px;
background-color: transparent;
color: #39f2ac;
background: linear-gradient(#537CFE, #6A53FE);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
`
const LabelDiv = styled.div`
display: flex;
justify-content: space-between;
margin: 24px 0px 0px;
`
const NameDiv = styled.div`
font-size: 22px;
font-weight: bold;
`
const InfoDiv = styled.div`
margin: 8px 0px 4px;
background-color: #D9D9D9;
display: flex;
flex-direction: column;
justify-content: space-between;
`
const DetailDiv = styled.div`
margin: 8px 0px 24px;
background-color: white;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 10px
`
const TextDiv = styled.div`
font-size: 13px;
padding: 0px 8px;
padding-top: 12px;
line-height: 32px
`
const CompanyDiv = styled.div`
font-size: 12px;
background: linear-gradient(180deg, #537CFE 0%, #6A53FE 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;
margin-bottom: 8px;
`
const WarningDiv = styled.div`
display:flex;
background: linear-gradient(180deg, #537CFE 0%, #6A53FE 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;
margin-bottom: 8px;
margin-top: 16px;
margin-bottom: 12px;
padding-top: 4px
`
const NutrientDiv = styled.div`
margin-right: 4px;
margin-bottom: 4px;
font-size: 13px;
box-shadow: rgb(202 209 213) 0px 0px 0px 1px inset;
padding: 8px 10px;
border-radius: 40px;
`
const PillInfo = ({
  id,
  pillName,
  pillCompanyName,
  pillContent,
  pillDomestic,
  pillExpirationDate,
  nutrients,
  pillTakeProcess,
  pillTakeWarning,
  pillThumbnail,
  functionalities,
  taking,
  isBookmark,
}) => {
  const dispatch = useDispatch()
  const similarPills = useSelector(state => state.recommend.similarPills)

  useEffect(() => {
    dispatch(SimilarPillsFetch(id))
  }, [])

  let searchQuery = ''
  if (pillName) {
    searchQuery = pillName.replaceAll(' ', '%20')
  }

  const [isShowMore, setIsShowMore] = useState(false)
  const textLimit = useRef(60)
  const commenter = useMemo(() => {
    if (pillContent) {
      const shortInfo = pillContent.slice(0, textLimit.current) + '...'
      if (pillContent.length > textLimit.current) {
        if (isShowMore) { return pillContent; }
        return shortInfo;
      }
      return pillContent;
    }
  }, [isShowMore]);

  const bookMarkHandler = (YN) => {
    const data = {
      pillId: id,
      check: YN
    }
    dispatch(bookMarkPill(data))
      .then(() => {
        dispatch(PillDetailFetch(id))
      })
  }

  const takingHandler = (YN) => {
    const data = {
      pillId: id,
      check: YN
    }
    dispatch(takingPill(data))
      .then(() => {
        dispatch(PillDetailFetch(id))
      })
  }

  return (
    <div style={{ width: '100%', padding: '0px 16px' }}>
      <ImgDiv>
        <img id={id} src={pillThumbnail ? pillThumbnail : imgUrl} alt='영양제 이미지' style={{ width: "100%", height: "30vh" }} />
        {isBookmark === 'Y' ?
          <BookMarkDiv onClick={() => bookMarkHandler("N")}>
            <i class="fa-solid fa-bookmark fa-lg"></i>
          </BookMarkDiv>
          :
          <UnBookMarkDiv onClick={() => bookMarkHandler("Y")}>
            <i className="fa-regular fa-bookmark fa-lg" />
          </UnBookMarkDiv>
        }
      </ImgDiv>
      <div style={{ borderBottom: '1px solid #CAD1D5' }}>
        <LabelDiv>
          <div>
            <CompanyDiv>
              {pillCompanyName}
            </CompanyDiv>
            <NameDiv>{pillName}</NameDiv>
          </div>
          {taking === 'Y' ?
            <div style={{ width: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '16px 0px' }}>
              <input type="checkbox" id="복용중" checked onChange={() => takingHandler("N")} />
              <label htmlFor="복용중">복용중</label>
            </div>
            :
            <div style={{ width: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '16px 0px' }}>
              <input type="checkbox" id="복용중" onChange={() => takingHandler("Y")} />
              <label htmlFor="복용중">복용중</label>
            </div>
          }
        </LabelDiv>
        <TextDiv style={{ textDecoration: 'underline', padding: '0px' }}>
          <a
            href={`https://search.shopping.naver.com/search/all?query=${searchQuery}&cat_id=&frm=NVSHATC`}
            target="_blank"
            rel="noreferrer"
          >이 제품 구매하러 가기(링크)</a>
        </TextDiv>
      </div>
      <ItemDiv>
        <h4>기능성 내용</h4>
      </ItemDiv>
      <div>
        {functionalities && functionalities.map((functionality, idx) => {
          return (
            <div style={{ fontSize: '13px', color: '#383E41', padding: '4px 0px' }} key={idx}>{functionality}</div>
          )
        })}
      </div>
      <ItemDiv>
        기능성 원료
      </ItemDiv>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {nutrients && nutrients.map((nutrient, idx) => {
          return (
            <NutrientDiv style={{ fontSize: '13px', color: '#383E41' }} key={idx}>{nutrient}</NutrientDiv>
          )
        })}
      </div>
      <ItemDiv>
        섭취방법
      </ItemDiv>
      <div style={{ fontSize: '13px', color: '#383E41' }}>
        {pillTakeProcess}
      </div>
      <ItemDiv>
        국내산 여부
      </ItemDiv>
      <div style={{ fontSize: '13px', color: '#383E41' }}>
        {pillDomestic}
      </div>
      <ItemDiv>
        유통기한
      </ItemDiv>
      <div style={{ fontSize: '13px', color: '#383E41' }}>
        {pillExpirationDate}
      </div>
      <DetailDiv>
        <ItemDiv style={{ borderBottom: '1px solid #CAD1D5', display: 'flex', justifyContent: 'space-between', padding: '8px 0px' }}>
          <div>
            상세 정보
          </div>
          {(pillContent && pillContent.length > textLimit.current) &&
            (isShowMore ?
              <i className="fa-duotone fa-chevron-up" onClick={() => setIsShowMore(!isShowMore)}></i> :
              <i className="fa-duotone fa-chevron-down" onClick={() => setIsShowMore(!isShowMore)}></i>)}
        </ItemDiv>
        <TextDiv style={{ fontSize: '13px', color: '#383E41', paddingTop: '0px', whiteSpace: 'pre-wrap' }}>
          {commenter}
        </TextDiv>
      </DetailDiv>
      <WarningDiv>
        <div>
          제품 섭취시 주의사항
        </div>
        <div style={{ marginLeft: '4px' }}><i className="fa-regular fa-triangle-exclamation fa-lg"></i></div>
      </WarningDiv >
      <InfoDiv>
        <TextDiv style={{ whiteSpace: 'pre-wrap' }}>
          {pillTakeWarning ? pillTakeWarning : '등록된 주의사항이 없습니다.'}
        </TextDiv>
      </InfoDiv>
      <RecomPills pills={similarPills} text='이런 영양제는 어떤가요?' />
    </div >
  )
}

export default PillInfo