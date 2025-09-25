import { Button } from "./ui/button"
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue,} from "../components/ui/select"
import {Dialog,DialogClose,DialogContent,DialogDescription,DialogFooter,DialogHeader, DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useState } from "react"
import { Edit2, Loader2, Trash2 } from "lucide-react"
import { toast } from "sonner"
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { setExpense, setSingleExpense } from "../redux/expenseSlice";
import { useEffect } from "react"

const UpdateExpense = ({expense:propExpense }) => {
   const { expense } = useSelector((store) => store.expense);
   const[formData,setFormData]=useState({
    description:propExpense?.description || "",
    amount:propExpense?.amount || "",
    category:propExpense?.category || "",
  })
   const[loading,setLoading]=useState(false)
   const[isOpen,setIsOpen]=useState(false);
  const dispatch = useDispatch();
  useEffect(()=>{
     if(propExpense){
    setFormData({
      description:propExpense?.description || "",
      amount:propExpense?.amount || "",
      category:propExpense?.category || "",
    })
  }
  },[propExpense])
 
  
 

  const changeEventHandler=(e)=>{
    const {name,value}=e.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]:value
    }))
  }

 

  const changeCategoryHandler=(value)=>{
    setFormData((prev)=>({
      ...prev,
      category:value
    }))
  }

 const submitHandler = async (e) => {
  e.preventDefault();
 

  try {
    setLoading(true);

    const res = await axios.put(
      `http://localhost:8000/api/v1/expense/update/${propExpense._id}`,
      formData,
      {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      }
    );

    if (res.data.success) {
      const updatedExpense = (expense ||  []).map((exp) =>
        exp._id === res.data.expense._id ? res.data.expense : exp
      );
      dispatch(setExpense(updatedExpense));
      toast.success(res.data.message);
      setIsOpen(false);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>

        <DialogTrigger asChild>
          <Button 
          onClick={()=>{
            setIsOpen(true);
          }} size="icon" className="rounded-full border-green-600 text-green-600 hover:transparent" 
          variant="outline"><Edit2/></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update expense</DialogTitle>
            <DialogDescription>
            Update expense to here click.Click when you're done
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

            <Select onValueChange={changeCategoryHandler} value={formData.category}>
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
             {
            loading?
            <Button>
              <Loader2 className="mr-2 h-4 animate-spin"/>
              please wait
            </Button>:
            <Button type="submit">Update</Button>
          }
          </DialogFooter>
         
          </form>
          
          
        </DialogContent>
     
    </Dialog>
  )
}

export default UpdateExpense



