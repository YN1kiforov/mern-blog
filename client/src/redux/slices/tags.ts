import { createSlice } from '@reduxjs/toolkit'
import { TagType } from '../../types'

interface TagsState {
  tags: TagType[]
}

const initialState: TagsState = {
  tags: [
    { value: "puteshestviya", label: "Путешествия", color: "rgb(177, 2, 177)" },
    { value: "eda", label: "Еда", color: "orange" },
    { value: "jizn", label: "Жизнь", color: "green" },
    { value: "programmirovanie", label: "Программирование", color: "blue" },
    { value: "zdorovie", label: "Здоровье", color: "rgb(218, 218, 13)" },
  ]
}

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {}
})

export default tagsSlice.reducer