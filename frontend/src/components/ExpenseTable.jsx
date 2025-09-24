import React, { useEffect, useState } from 'react'
import { Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { useSelector, useDispatch } from 'react-redux'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { Edit2, Trash } from 'lucide-react'
import axios from 'axios'
import { setExpense } from '../redux/expenseSlice'
import UpdateExpense from './UpdateExpense'

const ExpenseTable = () => {
  const dispatch = useDispatch()
  const { expense } = useSelector((store) => store.expense)
  const [LocalExpense, setLocalExpense] = useState(expense || [])

  const handleCheckboxChange = async (id) => {
    const updated = expense.map((e) => (e._id === id ? { ...e, done: !e.done } : e))
    dispatch(setExpense(updated))

    try {
      axios.defaults.withCredentials = true
      const changed = updated.find((e) => e._id === id)
      await axios.put(`http://localhost:8000/api/v1/expense/${id}/done`, { done: changed.done })
    } catch (err) {
      console.error('Failed to update expense done state', err)
      dispatch(setExpense(expense)) // rollback
    }
  }

  useEffect(() => {
    setLocalExpense(expense || [])
  }, [expense])

  return (
    <Table>
      <TableCaption>A list of your recent expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Done</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {LocalExpense?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">Add your first expense</TableCell>
          </TableRow>
        ) : (
          LocalExpense.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">{item.description}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.createdAt?.split("T")[0]}</TableCell>
              <TableCell>
                <Checkbox
                  checked={item.done}
                  onCheckedChange={() => handleCheckboxChange(item._id)}
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button size="icon" className="rounded-full border border-red-600 hover:border-transparent" variant="outline">
                    <Trash className="h-4 w-4"/>
                  </Button>
                  <Button size="icon" className="rounded-full border border-red-600 hover:border-transparent" variant="outline">
                    <Edit2 className="h-4 w-4"/>
                  </Button>
                 
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default ExpenseTable
