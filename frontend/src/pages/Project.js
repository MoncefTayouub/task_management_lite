import React , {useEffect , useState} from 'react'
import edit_btn from '../icons/edit_btn.svg'
import adding from '../icons/adding.svg'
import left_arrow from '../icons/left_arrow.svg'
import {useParams } from "react-router-dom"
import x_marque from '../icons/x_marque.svg'
import trash from '../icons/trash.svg'
import axios from 'axios'

function Project() {
    const params = useParams() ;
    const [data , setDate] = useState()
    const project_id = params.id
    const [update , setUpdate]= useState(false)
    const [task_edit_index , set_task_edit_index] = useState(-1)



    // -------- reload data ----------------
    useEffect(()=>{
        getData();
      },[update])    
      let getData = async () => {

        let respons = await fetch (`http://127.0.0.1:8000/task/${project_id}`)
        let data = await respons.json()
        setDate(data)
        if (task_edit_index != -1 ) {
          setSteps_list(data['tasks'][task_edit_index]['step'])
        }
    }

    const [name , setName ] = useState('')
    const [DDL , setDDL] = useState('')
    const [x_marque_bol , set_x_marque] = useState(0)
    const [step , setStep] = useState('')
    const [steps_list , setSteps_list] = useState([])

    // ---------- add task ---------------
    const [task_id , set_task_id] = useState(-1)
    const [task_ob , set_task_ob] = useState()
    // if task_ob
    // console.log(task_ob)
    const handleSumbit_task = async ()=> {
        const DataForm= new FormData();
        DataForm.append('name',name)        
        DataForm.append('DDL',DDL)        
        var method = 'post'
        if (task_ob) {
            method = 'put'
            DataForm.append('id',task_id)        
        }
        await axios ({
          method : method , 
          url : 'http://127.0.0.1:8000/task/'+project_id ,
          data :  DataForm
      })
      .then((response)=>{
        set_task_id(response.data) ;
      }) .catch(function (error) {
          console.log(error)
        });
        setUpdate(!update)
        console.log(method)
      }

      const cancel = ()=> {
        set_task_ob(false)
        set_x_marque(0)
        setStep('')
        setName('')
        set_task_id(-1)
        setDDL('')
    }
      

      const save_task_exit =()=> {
        handleSumbit_task()
        cancel()
      }

      const save_add_steps = ()=> {
        handleSumbit_task()
        set_x_marque(2)

      }
      



      const handle_edit_task = (ob,index)=> {
        set_task_ob(true)
        set_x_marque(1)
        setName(ob?.['name'])
        set_task_id(ob?.['id'])
        setDDL(ob?.['DDL'])
        setSteps_list(ob['step'])
        set_task_edit_index(index)

      } 

      const delete_task = async() => {
        const DataForm= new FormData();
        DataForm.append('id',task_id) 
        
        
        var method ='delete'     
        await axios ({
          method : method , 
          url : 'http://127.0.0.1:8000/task/0' ,
          data :  DataForm
      })
      .then((response)=>{
          console.log(response.data) ;
          setUpdate(!update)
          cancel()
  
        }) .catch(function (error) {
          console.log(error)
        });
      }
      
    //   -------------- add steps --------------

      const handleSumbit_steps  = async ()=> {
        const DataForm= new FormData();
        DataForm.append('name',step)        
        DataForm.append('id',task_id)   
        var method ='post'     
        
        
        await axios ({
          method : method , 
          url : 'http://127.0.0.1:8000/steps' ,
          data :  DataForm
      })
      .then((response)=>{
          console.log(response.data) ;
      }) .catch(function (error) {
          console.log(error)
        });
        setUpdate(!update)
      }
      
      const save_step_exist =()=> {
        handleSumbit_steps()
        setStep('')
        set_x_marque(0)
      }
      const save_step_add =()=> {
        handleSumbit_steps()
        setStep('')
        
    }



    // ------- edit steps --------

    const [step_edit_id , setStep_edit_id] = useState()
    const [se_name , set_se_name] = useState('')
    const [sync_index_step , set_sync_index_step] = useState(-1) 
 
    useEffect(()=>{
      if (step_edit_id) {
        set_se_name(step_edit_id['name'])

      }
    },[step_edit_id])

    const sync_steps = (value)=> {
      set_se_name(value)
      steps_list[sync_index_step]['name'] = value 
      setSteps_list([...steps_list])

    }


    const save_step_edit=async(e)=> {
      if (e.key == 'Enter' && step_edit_id) {
        const DataForm= new FormData();
        DataForm.append('id',step_edit_id['id'])        
        DataForm.append('name',se_name)        
        var method ='put'     
        
        
        await axios ({
          method : method , 
          url : 'http://127.0.0.1:8000/steps' ,
          data :  DataForm
      })
      .then((response)=>{
          console.log(response.data) ;
          setStep_edit_id()
          set_se_name('')
          setUpdate(!update)

        }) .catch(function (error) {
          console.log(error)
        });
      }


    }
    // ------------ check step --------
    const chekc_step =async(id,state)=> {
      const DataForm= new FormData();
      DataForm.append('id',id)               
      DataForm.append('done',!state)
      console.log('------sending-----')
      
      var method ='options'     
      await axios ({
        method : method , 
        url : 'http://127.0.0.1:8000/steps' ,
        data :  DataForm
    })
    .then((response)=>{
        console.log(response.data) ;
        setUpdate(!update)

      }) .catch(function (error) {
        console.log(error)
      });
    }



    // --------- delete step -----------

    const delete_steps = async(id , index )=> {
        const DataForm= new FormData();
      DataForm.append('id',id)               

      
      var method ='delete'     
      await axios ({
        method : method , 
        url : 'http://127.0.0.1:8000/steps' ,
        data :  DataForm
    })
    .then((response)=>{
        console.log(response.data) ;
        setUpdate(!update)
        steps_list.splice(index , 1)
        setSteps_list([...steps_list])

      }) .catch(function (error) {
        console.log(error)
      });


    }

      var form 
      
      switch(x_marque_bol){
        case 1 :
            form =  <div className='form_container center'>
                        <div className='form center'  >
                        <img className='x_marque' src={x_marque} onClick={()=>cancel()}  />
                            <div className='box'>
                              <div className='spacebetween'>
                                  <p>Task name  </p>
                                  {
                                    task_ob ? 
                                      <img src={trash} onClick={()=>delete_task()} />
                                    : <div></div>
                                  }
                              </div>
                            <input value={name} onChange={(e)=>setName(e.target.value)}  />
                            </div>
                            <div className='box'>
                            <p>Dead Line  </p>
                            <input value={DDL} onChange={(e)=>setDDL(e.target.value)} type='date' />
                            </div>
                            <div className='btns'>
                                <button onClick={()=>save_task_exit()} >Save & exit </button>
                                <button onClick={()=> save_add_steps()}>+ steps</button>
                            </div>
                        </div>
                    </div>
            break ;
        case 2 : 
            form =  <div className='form_container center'>
                    <div className='form center'  >
                    <img className='x_marque' src={x_marque} onClick={()=>cancel()}  />
                        <div className='box'>
                          <div className='spacebetween'>
                            <div onClick={()=>set_x_marque(1)} className='add_task center'>
                                <img src={left_arrow} className='back_arrow'  /> Back  // {name}
                            </div>
                            <div className='add_task center' onClick={()=>set_x_marque(3)}>
                              steps list 
                            </div>

                          </div>

                        

                        
                        <input placeholder='next step' value={step} onChange={(e)=>setStep(e.target.value)}  />
                        </div>
                      
                       
                        <div className='btns'>
                                <button onClick={()=>save_step_exist()} >Save & exit </button>
                                <button onClick={()=>save_step_add()} >+ steps</button>
                            </div>
                     
                    </div>
                </div>

            break ;
        case 3 : 
        form = <div className='form_container center'>
                    <div className='form center'  >
                    <img className='x_marque' src={x_marque} onClick={()=>cancel()}  />
                      <div onClick={()=>set_x_marque(2)} className='add_task center'>
                    <div className='spacebetween'>
                      <div></div>
                    </div>
                                <img src={left_arrow} className='back_arrow'  /> Back  // {name}
                            </div>
                        <div className='steps_list'>
                          {
                            steps_list.map((ob,i)=>
                                <div className='bx spacebetween' key={i}>
                                  {
                                    (ob['id'] == step_edit_id?.['id'] )? 

                                    <input className='input_edit_step' onKeyDown={save_step_edit} value={se_name} onChange={(e)=>sync_steps(e.target.value)}  />

                                    :
                                    <>
                                      <p> {ob['id'] == step_edit_id} {ob['name']}</p>
                                      <div className='bt center'>
                                        <img src={edit_btn} onClick={()=>{setStep_edit_id(ob);set_sync_index_step(i)}} />
                                        <img src={trash} onClick={()=>delete_steps(ob['id'])} />
                                    </div>
                                    </>
                                  }
                                  
                                </div>
                            )
                          }
                         
                        </div>                    
                        {/* <div className='btns'>
                            <button onClick={()=>save_step_exist()} >Save & exit </button>
                            <button onClick={()=>save_step_add(2)} >+ steps</button>
                        </div> */}
                    </div>
                </div>
      }


      console.log(data)
      const today = new Date();
      const calDate = (ddl)=> {
        var state = 0
        const deadline = new Date(ddl);
        var days = Math.ceil((deadline.getTime() - today.getTime() ) / (1000 * 3600 * 24)) 
        if (days > 0 ) {
          state = 1 
        }
        return [days,deadline.getDate() +'/'+ deadline.getMonth(),state]
      }

      return (
    <div className='Project' >
            {
                x_marque_bol ?
               form
            : ''
            }   

         <a href='/' className='add_task center'>
            <img src={left_arrow} className='back_arrow'  /> Back
        </a>
        <div className='header spacebetween'>
            <div className='proj_name center'>
                <h3> {data?.['name']} </h3>
                <p className='perc center'> 25% <span>1/3</span>  </p>
            </div>
            <div className='DDL center'> 
                    {/* <p><span>DDL</span> in 09/01/2080</p>
                    <img  src={edit_btn} /> */}
            </div>

        </div>

        <div className='add_task center' onClick={()=>set_x_marque(1)}>
            <img src={adding}  /> Add task  
        </div>
            {
                data?.['tasks'].map((ob,i)=>
                
                    <div className='task center' key={i}>
                        <div className='container center'>
                            <div className='taskname center'> {ob['name']}  <img src={edit_btn} onClick={()=>handle_edit_task(ob,i)} />  </div>
                            <div className='perc center'>
                               <p> {parseInt(ob['total_done'] / ob['total_steps'] * 100)}  % </p>
                               <p className='smallD'> {ob['total_done']} /{ob['total_steps']}</p>  
                               </div>
                            <div className='perc center'>
                              <p>{calDate(ob['DDL'])[0]} days</p>
                              <p className='smallD'>{calDate(ob['DDL'])[1]}</p>
                            </div>
                        </div>
                        <div className='steps center'>
                                {   
                                    ob['step'].map((om,j)=>
                                    
                                    <p className={om['done']?'check center':'center'} onClick={()=>chekc_step(om['id'],om['done'])}  key={j}>{om['name']}</p>
                                    )
                                }
                        </div>
                    </div>
                )
            }


    </div>
  )
}

export default Project