  import React from 'react'
  import Navbar from './Navbar'
  import CreateExpense from './CreateExpense'
  import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
  import { setCategory } from '../redux/expenseSlice'
  import { useDispatch } from 'react-redux'
import ExpenseTable  from './ExpenseTable'

  const Home = () => {
    const dispatch=useDispatch();
    const changeCategoryHandler=(value)=>{
      dispatch(setCategory(value))
    }
    const changeDoneHandler=(value)=>{
      dispatch(setCategory(value))
    }
    return (
      <div><Navbar />
        <div className='max-w-6xl mx-auto mt-6'>

          <div className='flex items-center justify-between mb-5'><h1>Expense</h1>
            <CreateExpense />
          </div>
          <div className='flex items-center gap-2'>
            <h1 className='font-medium text-lg'>
              Filter By:
            </h1>
            <Select onValueChange={changeCategoryHandler} >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel value="rent">Rent</SelectLabel>
                  <SelectItem value="salary">salary</SelectItem>
                  <SelectItem value="food">food</SelectItem>
                  <SelectItem value="shopping">shopping</SelectItem>
                  <SelectItem value="others">others</SelectItem>

                </SelectGroup>
              </SelectContent>
            </Select>

            <Select onValueChange={changeDoneHandler}  >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Mark as done" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="done">Done</SelectItem>
                  <SelectItem value="undone">Undone</SelectItem>
                  <SelectItem value="both">Both</SelectItem>


                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <ExpenseTable/>
        </div>

      </div>
    )
  }

  export default Home