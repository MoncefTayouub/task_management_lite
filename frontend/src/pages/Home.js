import React , {useState , useEffect} from 'react'
import edit_btn from '../icons/edit_btn.svg'
import adding from '../icons/adding.svg'
import x_marque from '../icons/x_marque.svg'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import trash from '../icons/trash.svg'

function Home() {
  const [data , setDate] = useState()
  const navigate = useNavigate();
  const [update , setUpdate] = useState(false)
  const [edit_proj , setEdit_proj] = useState()
  
  
  useEffect(()=>{
    getData();
  },[update])    
  let getData = async () => {

    let respons = await fetch (`http://127.0.0.1:8000/project`)
    let data = await respons.json()
    setDate(data)

  }
  const [show , setShow ] = useState(false)
  const [project_name , setproject_name ] = useState('')


  const handleSumbit = async ()=> {
    const DataForm= new FormData();
    DataForm.append('name',project_name)
    var method = 'post'
    
    if (edit_proj) {
      DataForm.append('id',edit_proj['id'])

      method = 'put'
    }
    

    await axios ({
      method : method , 
      url : 'http://127.0.0.1:8000/project' ,
      data :  DataForm
  })
  .then((response)=>{
        console.log(response.data) ;
        setEdit_proj()
        setUpdate(!update)
  }) .catch(function (error) {
      console.log(error)
    });
    setproject_name('')
    setShow(false)
  }

  useEffect(()=>{
    if (edit_proj) {
      setproject_name(edit_proj['name'])     
      setShow(true)
    }
  },[edit_proj])

  const cancel = ()=> {
    setShow(false)
    setproject_name('')
    setEdit_proj()
  }

  const del_proj = async()=> {
    const DataForm= new FormData();
    if (edit_proj) {
        DataForm.append('id',edit_proj['id'])
        var method = 'delete'
        
        await axios ({
          method : method , 
          url : 'http://127.0.0.1:8000/project' ,
          data :  DataForm
      })
      .then((response)=>{
            console.log(response.data) ;
            setUpdate(!update)
            cancel()
      }) .catch(function (error) {
          console.log(error)
        });

    }else {
      alert ('something wrong while delete project')
    }
  }

  return (
    <div className='Home'>
      {
        show ? 
            <div className='form_container center'>
                <div className='form center'  >
                  <img className='x_marque' src={x_marque} onClick={()=>cancel()} />
                    <div className='box'>
                      <div className='spacebetween'>
                      <p>Project name </p>
                      {
                        edit_proj ? 
                        <img src={trash} onClick={()=>del_proj()} />

                        : <div></div>
                      }

                      </div>
                      <input onChange={(e)=>setproject_name(e.target.value)} value={project_name}  />
                    </div>
                    {/* <div className='box'>
                      <p>Dead Line  </p>
                      <input type='date' />
                    </div> */}
                    <button onClick={()=>handleSumbit()} >Save</button>
                </div>
            </div>
            : ''
      }
       <div className='add_task center' onClick={()=>setShow(true)}>
            <img src={adding}  /> Add project  
        </div>
        {
          data?.map((ob,i)=>
              <div className='project spacearound' key={i}>
                <h3 onClick={()=>navigate('/Project/'+ob.id)} > {ob['name']} </h3>
                <p> { ob['total'] ? parseInt(ob['done'] / ob['total'] * 100) : 0 } % <span>{ob['done'] +'/'+ ob['total']}</span></p>
                {/* <p>7 days</p> */}
                <img onClick={()=>setEdit_proj(ob)} src={edit_btn} />
              </div>
          )
        }


      
        
    </div>
  )
}

export default Home