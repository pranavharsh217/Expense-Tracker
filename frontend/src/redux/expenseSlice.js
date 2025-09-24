import { createSlice } from "@reduxjs/toolkit";
const expenseSlice=createSlice({
    name:"expense",
    initialState:{
        category:"",
        markAsDone:"",
        expense:[]
    },
    reducers:{
        setCategory:(state,action)=>{
            state.category=action.payload;
        },
          setMarkAsDone:(state,action)=>{
            state.markAsDone=action.payload;
        },
        setExpense:(state,action)=>{
            state.expense=action.payload
        }
    }
})
export const{
    setCategory,setMarkAsDone,setExpense
}=expenseSlice.actions;

export default expenseSlice.reducer