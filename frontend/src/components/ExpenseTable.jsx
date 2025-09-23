import React from 'react'
import {Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { useSelector } from 'react-redux'
import { Checkbox } from './ui/checkbox'


const ExpenseTable = () => {
    const {expense}=useSelector(store=>store.expense)
    const handleCheckboxChange=(expense)
  return (
    <Table>
      <TableCaption>A list of your recent expense.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Invoice</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
           <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expense.map((expense) => (
          <TableRow key={expense._id}>

            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <Checkbox
            checked={expense.done}
            onCheckChange={()=>handleCheckboxChange(expense._id)}
            />
            <TableCell>{expense.description}</TableCell>
             <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.category}</TableCell>
               <TableCell>{expense.createdAt?.split("T")[0]}</TableCell>
            <TableCell>{expense.paymentMethod}</TableCell>
            <TableCell expense="text-right">{expense.totalAmount}</TableCell>
          </TableRow>
        ))}
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



