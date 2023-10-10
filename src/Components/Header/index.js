import {Badge, Button, Checkbox, Drawer, Form, Input, InputNumber, Menu, Table, message} from 'antd'
import {ShoppingCartOutlined, HomeFilled, MenuOutlined ,ShoppingFilled} from '@ant-design/icons'
import { useEffect, useState } from 'react';
import { useNavigate , Routes , Route, Link } from 'react-router-dom';
import { GetCart } from '../API';
import { useSelector } from 'react-redux';
function Header(){
    const [menuOpen , setMenuOpen] = useState(false);
    return(
    <div className='parentHeader'>
        <div className='container appHeader'>
        <div className='menuIcon'>
        <MenuOutlined style={{fontSize:"25px" , color:'#0092b7'}} onClick={()=>{
        setMenuOpen(true)
        }}/>
       </div>
      <span className='menubig'>
        <AppMenu />
        </span>
       <Appcart />
      <Drawer closable={false} placement='left' open={menuOpen}  onClose={()=>{
        setMenuOpen(false)
      }}>
        <AppMenu isInline/>
      <Button className='btnMenu' style={{backgroundColor:'#0092b7' , color:"white" , display:'block' , position:'relative' , left:"50%" , width:'50%'}} onClick={()=>{
        setMenuOpen(false)
      }} >Close</Button>
      </Drawer>

     </div>
    </div>
    )
}

function AppMenu ({isInline = false}){
    const navigate = useNavigate();
    const onMenuClick = (item)=>{
        navigate(`${item.key}`)
    }
    return(
        <Menu  onClick={onMenuClick} defaultActiveFirst style={{border:'none'}} mode={isInline?'inline':'horizontal'} items={[   
            {label:<HomeFilled style={{fontSize:'20px' , color:'#0092b7'}} /> , key:"/"},
            {label:"Men" , key:"men" , children:[
                {label:"Men's Shirts" , key:"mens-shirts"},
                {label:"Men's Shoes" , key:"mens-shoes"},
                {label:"Men's Watches" , key:"mens-watches"},
            ]},
            {label:"Women" , key:"women", children:[
                {label:"Women's Dresses" , key:"womens-dresses"},
                {label:"Women's Shoes" , key:"womens-shoes"},
                {label:"Women's Watches" , key:"womens-watches"},
                {label:"Women's Bags" , key:"womens-bags"},
                {label:"Women's Jewellery" , key:"womens-jewellery"},
            ]},
            {label:"Fragrances" , key:"fragrances"},
            
          ]}></Menu>
    )
}

function Appcart(){

    const[drawerCart , setDrawerCart] = useState(false);
    const[checkOutCart , setCheckOutCart] = useState(false);
    const[drawerItem , setDrawerItem] = useState([]);
    const cart = useSelector(state => state.cart);
    useEffect(()=>{
        GetCart().then(res =>{
            setDrawerItem(res.products);
        })
    } , [])
    const ConfirmOrder = ()=>{
        setDrawerCart(false);
        setCheckOutCart(false);
        message.success('Your Order Has Been Placed Successflly');
    }
    return  <div>
    <Badge style={{cursor:"pointer" , marginRight:"23px"}} count={cart.length} onClick={()=>{}}>
    <Link to='cart' style={{color:'#0092b7' , textDecoration:"none" , marginRight:"30px"}} >Carts</Link>
    </Badge>
    <Badge style={{cursor:"pointer"}} count='5' onClick={()=>{
        setDrawerCart(true);
    }}>
    <ShoppingCartOutlined style={{fontSize:'25px' , color:'#0092b7'}}/>
    </Badge>

  
    <Drawer contentWrapperStyle={{width:500}}  title="Your Cart" open={drawerCart} onClose={()=>{
        setDrawerCart(false);
    }}>
       <Table pagination={false} columns={[{
        title:"Title" , 
        dataIndex:"title"
       },
       {
        title:"Price" , 
        dataIndex:"price",
        render:(value)=>{
            return <span>${value}</span>
        }
       },
       {
        title:"Quantity" , 
        dataIndex:"quantity",
        render:(value , record)=>{
            return <InputNumber min={0} defaultValue={value} onChange={(value)=>{
                setDrawerItem(pre => pre.map((cart)=>{
                    if(record.id === cart.id){
                        cart.total = cart.price * value ;
                    }
                    return cart;
                }))
            }}></InputNumber>
        }
       },
       {
        title:"Total" , 
        dataIndex:"total",
        render:(value)=>{
            return <span>${value}</span>
        }
       },
       ]} dataSource={drawerItem}
       summary={(data)=>{
        const total = data.reduce((pre , current)=>{
            return pre + current.total;
        } , 0)
        return <span style={{ color:"#0092b7"}}>Total :{total}</span>
       }}
       >
        
       </Table>

       <Button type='primary' onClick={()=>{setCheckOutCart(true)}}>CheckOut Your Cart</Button>
    </Drawer>
    <Drawer title="Confirm Order"
     open={checkOutCart} onClose={()=>{setCheckOutCart(false)}}>
        <Form onFinish={ConfirmOrder} >
            <Form.Item name='fullname' label="Full Name" rules={[{
                required:true,
                message:'Please enter your full name'
            }]}>
                <Input placeholder='Please Enter Your Name'/>
            </Form.Item>
            <Form.Item name='email' label="Email" rules={[{
                type:'email',
                required:true,
                message:'Please enter your email'
            }]}>
                <Input placeholder='Please Enter Your Name'/>
            </Form.Item>
            <Form.Item name='address' label="Address" rules={[{
                required:true,
                message:'Please enter your adress'
            }]}>
                <Input placeholder='Please Enter Your Adress'/>
            </Form.Item>
            <Form.Item>
                <Checkbox defaultChecked disabled>Cash On Delivery</Checkbox>
            </Form.Item>
            <Form.Item >
                <Button type='primary' htmlType='submit'>Confirm Order</Button>
            </Form.Item>
        </Form>
    </Drawer>

    </div>
}
export default Header;