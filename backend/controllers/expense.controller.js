import {Expense} from "../models/expense.model.js"
export const addExpense=async(req,res)=>{
    try {
        const{description,amount,category}=req.body;
    if (!description || !amount || !category) {
      return res.status(400).json({
        message: "All fields are required",
        success: false
      });
    }
    const expense=await Expense.create({
        description,
        amount,
        category,
        userId
    })
    return res.status(201).json({
      message:"New Expense Added.",
      expense,
      success:true
      
    })
    } catch (error) {
        
    }
}
export const getAllExpense=async(req,res)=>{
  try{
    const userId=req.id;
    let category=req.query.category || "";
    const done=req.query.category||"";
    const query={
      userId//filtter by userid

    }
    if(category.toLowercase()==="all"){

    }else{
      query.category={$regex:category:$options:'i'}
    }
  } catch(error){
    console.log(error);
    
  }
}