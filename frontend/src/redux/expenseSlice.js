import { createSlice } from "@reduxjs/toolkit";
const expenseSlice=createSlice({
    name:"expense",
    initialState:{
        category:"",
        markAsDone:"",
        expense:[],
        singleExpense:{}
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
        },
        setSingleExpense:(state,action)=>{
            state.singleExpense=action.payload
        } 
    }
})
export const{
    setCategory,setMarkAsDone,setExpense,setSingleExpense
}=expenseSlice.actions;

export default expenseSlice.reducer