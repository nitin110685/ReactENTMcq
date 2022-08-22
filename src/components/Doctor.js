import Header from './Header';
import axios from "axios";
import React,{useState, useEffect} from 'react';

function Doctor()
{
    const [doctor,setDoctor]=useState([])
    const [subject,setSubject]=useState([])
    const [sid,setSid] = useState('')
    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [subid,setSubid]=useState('')
    const [error,setError] = useState(false);
    const [status,setSubStatus] = useState('success');
    
    function storedoctor()
    {
      if(sid === '')
      {
        if(validate())
        {
          //alert(subid);
          const subData = {
            name:name,
            email:email,
            password:password,
            subid:subid,
          };
          axios.post('https://entmcq.vertextechnosys.com/api/doctor',subData)
                .then((res) =>{
                  console.log(res);
                  //alert("Subject added successfully");
                  const data = res.data;
                  if(data[0].status=="success"){
                    alert("Doctor added successfully");
                  }else{
                    alert("Doctor failed");
                  }
                  fetchDoctors();
                })
        }
        else{
          //alert("somefields are empty");
          setError(true);
        }
        
      }
      else{
        const subData = {
          id:sid,
          name:name,
          email:email,
          password:password,
          subid:subid,
          
        };
        axios.put('https://entmcq.vertextechnosys.com/api/doctor/'+sid,subData)
              .then((res) =>{
                console.log(res);
                //alert("Subject added successfully");
                const data = res.data;
                if(data[0].status=="success"){
                  alert("Doctor Updated successfully");
                  setName('');
                  setEmail('');
                  setPassword('');
                  setSubid('')
                }
                  
                else{
                  alert("Doctor failed");
                }
                fetchDoctors();
              })
      }
    }
    function validate()
    {
      if(!name){
        return false;
      }
      else if(!email){
        return false;
      }
      return true;
    }

    function fetchDoctors()
    {
      axios.get('https://entmcq.vertextechnosys.com/api/doctor')
            .then((res)=>{
              const data = res.data;
              setDoctor(data);
            })
    }
    function fetchSubject()
    {
      axios.get('https://entmcq.vertextechnosys.com/api/subject')
            .then((res)=>{
              const data = res.data;
              setSubject(data);
            })
    }

    function editOption(id){
      setSid(id);
      //alert(id)
      axios.get('https://entmcq.vertextechnosys.com/api/doctor/'+id)
     
            .then((res)=>{
              const data = res.data;
              console.log(data);
              setName(data.name);
              setEmail(data.email);
              setPassword(data.password);
              
              setSubid(data.subid)
              //setQuiz(data);
            })
    }

    function deleteOption(id)
    {
      axios.delete('https://entmcq.vertextechnosys.com/api/doctor/'+id)
            .then((res) =>{
              console.log(res);
              //alert("Subject added successfully");
              const data = res.data;
              if(data[0].status=="success"){
                alert("Doctor Deleted successfully");
                
              }
                
              else{
                alert("Doctor Delete failed");
              }
              fetchDoctors();
            })
    }

    useEffect(()=>{
      fetchDoctors()
    },[])
    useEffect(()=>{
      fetchSubject()
    },[])
    
    
return (
    <div class="layout-wrapper layout-content-navbar">
  <div class="layout-container">
    

    <Header/>
          {error && (<div
            class="bs-toast toast toast-placement-ex m-2 show bg-warning top-0 end-0 fade show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            data-delay="2000"
            
          >
            <div class="toast-header">
              <i class="bx bx-bell me-2"></i>
              <div class="me-auto fw-semibold">Alert</div>
              {/* <small>11 mins ago</small> */}
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={()=>{setError(false)}}></button>
            </div>
            <div class="toast-body">somefields are empty</div>
          </div>)}
    <div class="layout-page">
      
      <nav
        class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar"
      >
        <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
            <i class="bx bx-menu bx-sm"></i>
          </a>
        </div>

        <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
         
          <div class="navbar-nav align-items-center">
            <div class="nav-item d-flex align-items-center">
              <i class="bx bx-search fs-4 lh-0"></i>
              <input
                type="text"
                class="form-control border-0 shadow-none"
                placeholder="Search..."
                aria-label="Search..."
              />
            </div>
          </div>
          

          <ul class="navbar-nav flex-row align-items-center ms-auto">
            
            <li class="nav-item lh-1 me-3">
              <a
                class="github-button"
                href="https://github.com/themeselection/sneat-html-admin-template-free"
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label="Star themeselection/sneat-html-admin-template-free on GitHub"
                >Star</a
              >
            </li>

            
            <li class="nav-item navbar-dropdown dropdown-user dropdown">
              <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                <div class="avatar avatar-online">
                  <img src="../assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle" />
                </div>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a class="dropdown-item" href="#">
                    <div class="d-flex">
                      <div class="flex-shrink-0 me-3">
                        <div class="avatar avatar-online">
                          <img src="../assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle" />
                        </div>
                      </div>
                      <div class="flex-grow-1">
                        <span class="fw-semibold d-block">John Doe</span>
                        <small class="text-muted">Admin</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <div class="dropdown-divider"></div>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <i class="bx bx-user me-2"></i>
                    <span class="align-middle">My Profile</span>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <i class="bx bx-cog me-2"></i>
                    <span class="align-middle">Settings</span>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <span class="d-flex align-items-center align-middle">
                      <i class="flex-shrink-0 bx bx-credit-card me-2"></i>
                      <span class="flex-grow-1 align-middle">Billing</span>
                      <span class="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                    </span>
                  </a>
                </li>
                <li>
                  <div class="dropdown-divider"></div>
                </li>
                <li>
                  <a class="dropdown-item" href="auth-login-basic.html">
                    <i class="bx bx-power-off me-2"></i>
                    <span class="align-middle">Log Out</span>
                  </a>
                </li>
              </ul>
            </li>
            
          </ul>
        </div>
      </nav>

      

      
      <div class="content-wrapper">
        

        <div class="container-xxl flex-grow-1 container-p-y">
          <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Doctor</h4>

          <div class="row">
            
            <div class="col-md-5">
              <div class="card mb-4">
                <h5 class="card-header">Add Doctor</h5>
                <div class="card-body demo-vertical-spacing demo-only-element">
                    <div>
                      <input type="hidden" value={sid} />
                        <label for="defaultFormControlInput" class="form-label">Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="defaultFormControlInput"
                          placeholder="Name"
                          aria-describedby="defaultFormControlHelp"
                          value={name}
                          onChange={name => setName(name.target.value)}
                        />
                        
                      </div>
                      <div>
                      
                        <label for="defaultFormControlInput" class="form-label">Email</label>
                        <input
                          type="text"
                          class="form-control"
                          id="defaultFormControlInput"
                          placeholder="Email"
                          aria-describedby="defaultFormControlHelp"
                          value={email}
                          onChange={email => setEmail(email.target.value)}
                        />
                        
                      </div>
                      <div>
                      
                        <label for="defaultFormControlInput" class="form-label">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          id="defaultFormControlInput"
                          placeholder="Password"
                          aria-describedby="defaultFormControlHelp"
                          value={password}
                          onChange={password => setPassword(password.target.value)}
                        />
                        
                      </div>
                      
                      <div>
                      
                        <label for="defaultFormControlInput" class="form-label">Subject Id</label>
                        <select
                          class="form-select" 
                          id="exampleFormControlSelect1" 
                          aria-label="Default select example"
                          onChange={subid => setSubid(subid.target.value)}
                        >
                        <option value="">Select Subject Name</option>
                        {
                          subject.map((obj)=>{
                          return (
                            <option value={obj.id}>{obj.name}</option>
                            )
                          })
                        }
                        
                        </select>
                        
                      </div>
                      
                  <div class="mb-3">
                    <button class="btn btn-primary d-grid w-100" type="button" style={{backgroundColor: '#188ccc'}} onClick={storedoctor}>Store</button>
                    
                  </div>
                </div>
              </div>
            </div>

            
            <div class="col-md-7">
              <div class="card mb-4">
                <h5 class="card-header">Doctor List</h5>
            <div class="card-body">
              <div class="table-responsive text-nowrap">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        doctor.map((obj)=>{
                        return(
                          <tr>
                            <td>
                              {obj.id}
                            </td>
                            <td>{obj.name}</td>
                            <td>{obj.email}</td>
                            
                            <td>
                              <div class="dropdown">
                                <button
                                  type="button"
                                  class="btn p-0 dropdown-toggle hide-arrow"
                                  data-bs-toggle="dropdown"
                                >
                                  <i class="bx bx-dots-vertical-rounded"></i>
                                </button>
                                <div class="dropdown-menu">
                                <button class="dropdown-item" onClick={()=>editOption(obj.id)}
                                    ><i class="bx bx-edit-alt me-1"></i> Edit</button>
                                  <button class="dropdown-item" onClick={()=>deleteOption(obj.id)}
                                    ><i class="bx bx-trash me-1"></i> Delete</button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    }
                    
                    
                  </tbody>
                </table>
              </div>
            </div>
              </div>
            </div>

            
            
          </div>

          

         
          

          
        </div>
        
        <footer class="content-footer footer bg-footer-theme">
          <div class="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
            
          </div>
        </footer>
        

        <div class="content-backdrop fade"></div>
      </div>
     
    </div>
    
  </div>

  
  <div class="layout-overlay layout-menu-toggle"></div>
</div>

)
}
export default Doctor;
