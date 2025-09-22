import React from 'react'
import { Button } from "@/components/ui/button"
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue,} from "../components/ui/select"
import {Dialog,DialogClose,DialogContent,DialogDescription,DialogFooter,DialogHeader, DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
const CreateExpense = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Add new Expense</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add expense</DialogTitle>
            <DialogDescription>
            Create expense to here click.Click when you're done
            </DialogDescription>
          </DialogHeader>
          <form action="">
            <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Description</Label>
              <Input id="description" 
              placeholder="descrption"
              name="description"  />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" name="amount" placeholder="₹xxx"  />
            </div>

              <Select>
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

          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
          </form>
          
          
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default CreateExpense



