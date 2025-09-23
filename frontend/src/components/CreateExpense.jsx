import { Button } from "./ui/button"
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue,} from "../components/ui/select"
import {Dialog,DialogClose,DialogContent,DialogDescription,DialogFooter,DialogHeader, DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import axios from 'axios';
const CreateExpense = () => {
  const[formData,setFormData]=useState({
    description:"",
    amount:"",
    category:"",
  })
  const[loading,setLoading]=useState(false)
  const[isOpen,setIsOpen]=useState(false);
  const changeEventHandler=(e)=>{
    const {name,value}=e.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]:value
    }))
  }

  const changeCategoryHandler=(value)=>{
    setFormData((prevData)=>({
      ...prevData,
      category:value
    }))
  }

  const submitHandler=async (e)=>{
    e.preventDefault();
    console.log(formData);
    try{
      setLoading(true)
      const res=await axios.post("http://localhost:8000/api/v1/expense/add",{formData},{
        headers:{
          'Content-type':'application/json'
        },
        withCredentials:true
      })
      if(res.data.success){
        toast.success(res.date.message)
        setIsOpen(false)
      }
    }catch(error){
      console.log(error);
      
    }finally{
      setLoading(false);
    }
    
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>

        <DialogTrigger asChild>
          <Button onClick={()=>setIsOpen()}variant="outline">Add new Expense</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add expense</DialogTitle>
            <DialogDescription>
            Create expense to here click.Click when you're done
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Description</Label>
              <Input id="description" 
              placeholder="descrption"
              name="description" 
              value={formData.description}
              onChange={changeEventHandler} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" name="amount" placeholder="₹xxx" 
               value={formData.amount}
              onChange={changeEventHandler}/>
            </div>

            <Select onValueChange={changeCategoryHandler}>
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
          {
            loading?
            <Button>
              <Loader2 className="mr-2 h-4 animate-spin"/>
              please wait
            </Button>:
            <Button type="submit">Add</Button>
          }
          </form>
          
          
        </DialogContent>
     
    </Dialog>
  )
}

export default CreateExpense



