import { Card, List ,Image, Typography, Row, Rate, Button, message, Badge, Spin, Select } from "antd";
import { useEffect , useState } from "react";
import { AddToCart, getAllProducts, getProductsByCatogery } from "../API";
import {useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addToCart } from "../../rtk/Slices/Cart-Slice";

function Category (){
    const [product , setProduct] = useState([]);
    const [loading , setLoading] = useState(false);
    const [sortOrder , setSortOrder] = useState('az')
    const prams = useParams();

   useEffect(()=>{
    setLoading(true);
    (prams?.categoryId? getProductsByCatogery(prams.categoryId):getAllProducts()).then(res =>{
    setProduct(res.products);
    setLoading(false);
    })

   } ,[prams]);
   if(loading){
    return <Spin spinning className="loadCenter" />
   }

   const oredredItems = ()=>{
    const orderItem =[...product];
    
    orderItem.sort((a,b)=>{
        const alowercasetTitle = a.title.toLowerCase();
        const blowercasetTitle = b.title.toLowerCase();
     if(sortOrder === 'az'){
        return alowercasetTitle > blowercasetTitle ? 1 : alowercasetTitle === blowercasetTitle ? 0 : -1;
     }

    else if(sortOrder === 'za'){
        return alowercasetTitle < blowercasetTitle ? 1 : alowercasetTitle === blowercasetTitle ? 0 : -1;
     }

     else if(sortOrder === 'lowHeigh'){
        return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
     }
     else if(sortOrder === 'heighLow'){
        return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
     }
     
    })
    return orderItem
   }
    return (
   <div className="container">
    <div className="sorted">
    <Typography.Text>Wiew Items Sorted By : </Typography.Text>
    <Select onChange={(value)=>{
        setSortOrder(value);
    }}
    defaultValue={"az"}
     options={[
        {
          label: "Alphabtically a-z" ,
          value:"az"
       },
       {
        label: "Alphabtically z-a" ,
        value:"za"
     },
     {
        label: "Price Low To High" ,
        value:"lowHeigh"
     },
     {
        label: "Price High To Low" ,
        value:"heighLow"
     },
    ]}></Select>
   
    </div>
   <List grid={{xl:3 , md:2 , sm:1 }} renderItem={(product , index)=>{

      return(
      <Badge.Ribbon className="ribbon"  text={`${product.discountPercentage} Off`} color="pink">
        <Card className="Cards" key={index} title={product.title} 
        cover={<Image className="ImageItem" src={product.thumbnail}/>}
         actions={[<Rate allowHalf disabled value={product.rating}/> , <AddToCartButton item={product} />]}>
       <Card.Meta title={<Typography.Paragraph>Price: ${product.price}{' '}
       <Typography.Text type="danger" delete>${Math.floor(product.price + (product.discountPercentage * product.price)/100).toFixed(2)}</Typography.Text>
       </Typography.Paragraph>} description={<Typography.Paragraph ellipsis={{rows:1 , symbol:'more' , expandable:true}}>{product.description}</Typography.Paragraph>}></Card.Meta>
    </Card>
      </Badge.Ribbon>
     
      )
   }} dataSource={oredredItems()} >

   </List>

   </div>
    )
}

function AddToCartButton ({item}){
   const dispatch = useDispatch();
    const [loading , setLading] = useState(false);
    const AddCartMessage = ()=>{
        setLading(true)
        AddToCart(item.id).then(res =>{
         message.success(`${item.title} has been Added to cart`)
         setLading(false);
         // const findProducts = item.find((product)=>{})
         dispatch(addToCart(item));
        })
    }
    return(
        <Button loading={loading} type="link" onClick={()=>{AddCartMessage()}}>Add To Cart</Button>
    )
}
export default Category;