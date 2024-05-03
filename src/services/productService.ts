import Product from "../models/productModel";

export class ProductServices{
    //Create Product Services
    public static async createProductService(Name:String,Price:Number,Desc:string):Promise<object>{
        let product = new Product({productName:Name,Price:Price,Desc:Desc})
        const newPro = await product.save()
        return newPro
    }

    //Update Product Services
    public static async updateProductService(id:String,body:object):Promise<object>{
        let product = await Product.findByIdAndUpdate(id,body,{new:true})
        if(!product){
            return {message:"Product Not Found"}
        }
        return {data:product,message:"Product Updated Successfully"}
    }

    //Show Particular Product
    public static async showProductService(id:String):Promise<object>{
        let product = await Product.findById(id)
        if(!product){
            return {message:"Product Not Found"}
        }
        return {message:"Product Details",data:product}
    }

    //Show all Products
    public  static async showAllProductService():Promise<object>{
        const products = await Product.find({})
       return products
    }


    //Delete Particular Product
    public static async deleteProductService(id:String):Promise<object>{
        const del = await Product.deleteOne({_id:id})
        if(del.deletedCount === 0){
            return {message:"Product Not Found"}
        }
        return {Message:"Product Deleted Successfully",deletedProduct: del}
    }

    //Delete All Products
    public static async deleteAllProductService():Promise<object>{
        const del = await Product.deleteMany({})
        if(del.deletedCount ===0){
            return {message:"No Product Found"}
        }
        return {Message:'All Products Deleted Successfully'}
    }

}