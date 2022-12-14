import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from '../../api/index.js'

const initialState = {
  // 생리활성 기능 리스트
  functionalities: [],
  // 영양소
  nutrients: [],

  // 유저가 고른 제품구분/영양소/생리활성 기능
  domestic: '',
  functionalityList: [],
  nutrientList: [],

  //자동완성 리스트
  autoComplete: [],

  //유사 단어
  similarWord: ""
}

// 생리활성 기능 리스트 불러오기
export const FunctionalitiesFetch = createAsyncThunk(
  'Search/FunctionalitiesFetch',
  async () => {
    return client.get(`pills/functionalities`)
      .then(res => {
        if (res.status === 200) {
          return res.data
        } else {
          alert('생리활성 기능 상세정보를 불러올 수 없습니다.')
        }
      })
      .catch(error => {
        alert('생리활성 기능 상세정보를 불러올 수 없습니다.')
        return false
      })
  }
)


// 영양소 기능 리스트 불러오기
export const NutrientsFetch = createAsyncThunk(
  'Search/NutrientsFetch',
  async () => {
    return client.get(`pills/nutrients`)
      .then(res => {
        if (res.status === 200) {
          return res.data
        } else {
          alert('영양소 기능 상세정보를 불러올 수 없습니다.')
        }
      })
      .catch(error => {
        alert('영양소 기능 상세정보를 불러올 수 없습니다.')
        return false
      })
  }
)


//영양제 검색
export const SearchPill = async (page, data) => {
  const result = await client
    .get(`/pills/search?search=${data[0].searchWord}&domestic=${data[0].domestic}&functionalities=${data[0].functionalityList}&materials=${data[0].nutrientList}&page=${page}`,)
    .then(response => response);
  return result;
};

export const SearchImg = async (data) => {
  const result = await client
    .post(`/pills/vision`, data)
    .then(res => { return res.data })
    .catch(error => { return error.response });
  return result;
};

//영양제 유사단어 확인
export const SimilarWordCheck = createAsyncThunk(
  'Search/SimilarWordCheck',
  async (word) => {
    return client.get(`/pills/search/similar/${word}`)
      .then(res => {
        if (res.status === 200) {
          return res.data
        } else {
        }
      })
      .catch(error => {
        return false
      })
  }
)

// 자동완성
export const AutoComplete = createAsyncThunk(
  'Search/AutoComplete',
  async (word) => {
    return client.get(`/pills/search/preview/${word}`)
      .then(res => {
        if (res.status === 200) {
          return res.data
        } else {
        }
      })
      .catch(error => {
        return false
      })
  }
)

const searchSlice = createSlice({
  name: 'consultantList',
  initialState,
  reducers: {
    domesticSelector: (state, action) => {
      state.domestic = action.payload
    },
    nutrientSelector: (state, action) => {
      if (state.nutrientList.includes(action.payload)) {
        state.nutrientList = state.nutrientList.filter((element) => element !== action.payload)
      } else {
        state.nutrientList.push(action.payload)
      }
    },
    functionalitySelector: (state, action) => {
      if (state.functionalityList.includes(action.payload)) {
        state.functionalityList = state.functionalityList.filter((element) => element !== action.payload)
      } else {
        state.functionalityList.push(action.payload)
      }
    },
    resetSelector: (state, action) => {
      state.domestic = '';
      state.nutrientList = [];
      state.functionalityList = [];
      state.searchResult = [];
    },
    resetSimilarWord: (state, action) => {
      state.similarWord = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(FunctionalitiesFetch.pending, (state, action) => {
      state.status = '';
    })
    builder.addCase(FunctionalitiesFetch.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.functionalities = payload;
    })
    builder.addCase(FunctionalitiesFetch.rejected, (state, action) => {
      state.status = 'failed';
    })
    builder.addCase(NutrientsFetch.pending, (state, action) => {
      state.status = '';
    })
    builder.addCase(NutrientsFetch.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.nutrients = payload;
    })
    builder.addCase(NutrientsFetch.rejected, (state, action) => {
      state.status = 'failed';
    })
    builder.addCase(AutoComplete.pending, (state, action) => {
      state.status = '';
    })
    builder.addCase(AutoComplete.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.autoComplete = payload;
    })
    builder.addCase(AutoComplete.rejected, (state, action) => {
      state.status = 'failed';
    })
    builder.addCase(SimilarWordCheck.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.similarWord = payload;
    })
  }
})

export default searchSlice
export const { domesticSelector, nutrientSelector, functionalitySelector, resetSelector, resetSimilarWord } = searchSlice.actions;