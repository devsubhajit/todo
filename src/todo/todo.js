import React from 'react';
import {v4 as uuidv4} from 'uuid';


class Todo extends React.Component {
    constructor(props){
        super(props);
        this.state ={ 
            list:[],
            editIndex:-1,
            task:'',
            filter:''
        }
    }

    render(){
        return(
            <React.Fragment>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    if(this.state.task !== '' && this.state.task){
                        let local_list = [...this.state.list];
                        let newTask = {
                            title:this.state.task,
                            id:uuidv4(),
                            status:"active"
                        }
                        local_list.push(newTask);
                        this.setState({
                            list:local_list,
                            task:''
                        },()=>{
                            console.log('state', this.state);
                        })
                    }
                    
                }}>
                    <input type="text" value={this.state.task} onChange={(e)=>{this.setState({task:e.target.value})}}/>
                    <button type='submit'>Add</button>
                   
                </form>
                <select onChange={(e)=>{
                   
                    this.setState({
                        filter:e.target.value
                    })
                 
                }}>
                        <option value="">All</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>
                 {this.state.list && this.state.list.length > 0 && 
                <ul>
                    {this.state.list.filter((a)=>{if(this.state.filter !== '' ) { return  a.status === this.state.filter}else {return a}   }).map((item, i)=>{
                        
                        return <li key={i}>
                           
                            <input type="text" value={item.title} disabled={this.state.editIndex !== i}
                                onChange={(e)=>{
                                    e.stopPropagation();
                                    let local_list = [...this.state.list];
                                    local_list[i].title = e.target.value;
                                    this.setState({
                                        list:local_list
                                    })
                                }}
                            />
                            <button type="button" style={{backgroundColor:item.status === 'completed' ? 'green' : 'red', color:'#fff'}} onClick={()=>{
                                let local_list = [...this.state.list];
                                let index = local_list.map(l=> {return l.id}).indexOf(item.id);
                                local_list[index].status = local_list[index].status === 'completed' ? 'active' : 'completed';
                                this.setState({
                                    list:local_list
                                })
                            }}>{item.status}</button>
                            <button type='button' onClick={(e)=>{this.setState({editIndex:this.state.editIndex === i ? -1 : i})}}>
                                {this.state.editIndex === i ? <>Done</> : <>Edit</>}
                            </button>
                            <button type='button' onClick={(e)=>{
                               let local_list = [...this.state.list];
                               local_list.splice(i, 1);
                               this.setState({list:local_list},()=>{
                                   console.log('state', this.state);
                               }) 
                            }}>Delete</button>

                        </li> 
                    })}
                    
                
                </ul>
                 }
            </React.Fragment>
        )
    }
}

export default Todo;