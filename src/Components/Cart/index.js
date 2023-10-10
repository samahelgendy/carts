import { Avatar, Button , Typography , Space } from 'antd';
import {useSelector , useDispatch} from 'react-redux';
import { clear, removeFromCart } from '../../rtk/Slices/Cart-Slice';
import Swal from 'sweetalert2';

function Cart (){
    const products = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const TotalPrice = products.reduce((acc , product)=>{
        acc += product.price * product.quantity;
        return acc;
        
    } , 0)
    
    return <>
    <div className="container">
     <Space style={{marginTop:"20px"}}>
     <Typography.Text style={{margin:"20px"}}>Total Price : ${TotalPrice}</Typography.Text>
        <ButtonClearAll />
     </Space>
    <table className="table table-striped mt-5">
     <thead>
    <tr>
      <th scope="col">Image</th>
      <th scope="col">Title</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {products.map((product) =>{
        return(
            <tr key={product.id}>
            <th scope="row">
              <Avatar src={product.thumbnail} />
            </th>
            <td>{product.title}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>
             <DeleteButton item={product} />
              </td>
          </tr>
        )
    })}
  </tbody>
     </table>
    </div>
    </>
}

const DeleteButton =({item})=>{
    const dispatch = useDispatch();
    const AlertDelete=()=>{
        
        Swal.fire({
            title: `You Are Sure To Delete ${item.title} ?`,
            showCancelButton:true,
        }).then((data)=>{
            if(data.isConfirmed){
            dispatch(removeFromCart(item));
            }
        })
    }
return (            
    <Button onClick={()=>{AlertDelete()}} style={{backgroundColor:"rgb(134, 5, 5)" , color:"white"}}>Delete</Button>
)
}

const ButtonClearAll =()=>{
    const dispatch = useDispatch();
    const DeleteAll=()=>{
        
        Swal.fire({
            title: `You Are Sure To Delete All Products?`,
            showCancelButton:true,
        }).then((data)=>{
            if(data.isConfirmed){
            dispatch(clear());
            }
        })
    }
return (            
    <Button onClick={()=>{DeleteAll()}} type='primary'>Clear All</Button>
)
}
export default Cart;