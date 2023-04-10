import React, { useEffect, useState } from 'react'
import profilePic from '../../../assets/images/guy.png'
import DoctorService from '../../../services/doctorService';
import TokenService from '../../../services/tokenService';

export const Profile = () => {

    const { getDoctorData } = TokenService();
    const [doctorProfile, setDoctorProfile] = useState({
        fullname:"",
        email:"",
        qualification:"",
        phone:"",
        specialist_category:"",
        availability:"",
        fee:""
    });
    const [doctorData, setDoctorData] = useState();


    const getInput = (e) =>{
        const name = e.target.name;
        const value = e.target.value
        setDoctorProfile({...doctorProfile, [name]:value})
    }
    // console.log(doctorData?.image, "image")
    useEffect(() => {
        setDoctorData(getDoctorData())
      
    }, [])
    return (
        <>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <p>
                                Profile
                            </p>
                        </div>
                        <div className="card cardForm">
                            <div className="card-body">
                                <form className="additionForm" >
                                    <div className="row g-4">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                            <div className="fields">
                                                <div className="profileImage">
                                                    <img src={`${doctorData?.image}` && profilePic} alt="" className='profileImage' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="uploadImg">Upload Profile</label>
                                                <input type="file" className='form-control' id='uploadImg' name='image' />
                                            </div>
                                        </div>
                                
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorName">Name</label>
                                                    <input type='text'  value={doctorData?.fullname} onChange={getInput}/>
                                                </div>
                                            </div>
                            
                                  
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorEmail">Email</label>
                                                    <input type='text' value={doctorData?.email} onChange={getInput}/>
                                                </div>
                                            </div>
                                
                                    
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorEducation">Qualification</label>
                                                    <input value={doctorData?.qualification} type='text' onChange={getInput}/>
                                                </div>
                                            </div>
                                     
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorPhone">Phone</label>
                                                    <input type='number' onChange={getInput} className='fixedValue' name='phone' value={doctorData?.phone}></input>
                                                </div>
                                            </div>
                               
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="doctorName">Type of Doctor</label>
                                                    <input type="text" id='doctorName' value={doctorData?.specialist_category} name='fullname' placeholder='Enter Name...' onChange={getInput} />
                                                </div>
                                            </div>
                                  

                                     
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                <div className="fields">
                                                    <label htmlFor="endTime">Shift</label>
                                                    {/* <input type="text" id='endTime' name='endTime' placeholder='Enter Shift' value={doctorProfile[0]?.availability} /> */}
                                                    <select value={doctorData?.availability} >
                                                        {doctorData?.availability === "day" ?
                                                            <>
                                                                <option value="day">Day</option>
                                                                <option value="night">Night</option>
                                                            </>
                                                            :
                                                            <>
                                                                <option value="night">Night</option>
                                                                <option value="day">Day</option>
                                                            </>
                                                        }

                                                    </select>
                                                </div>
                                            </div>
                                
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="fees">Fee of Session</label>
                                                <input type="text" id='fees' value={doctorData?.fee} name='fees' placeholder='Enter Fees...' onChange={getInput} />
                                            </div>
                                        </div>


                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                            <div className="fields">
                                                <button type='Submit' >Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
