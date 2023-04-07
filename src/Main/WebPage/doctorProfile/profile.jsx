import React, { useEffect, useState } from 'react'
import profilePic from '../../../assets/images/guy.png'
import DoctorService from '../../../services/doctorService';
import TokenService from '../../../services/tokenService';

export const Profile = () => {
    const { getDoctorSingle } = DoctorService();
    const { getStorageData } = TokenService();
    const userType = getStorageData();
    const [doctorProfile, setDoctorProfile] = useState();

    useEffect(()=>{
        getDoctorSingle(userType.id).then((res) => {
            setDoctorProfile(res?.data?.data)
        }).catch((error) => {
            console.log(error)
        },[doctorProfile])
      
    })
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
                                                    <img src={profilePic} alt="" className='profileImage' />
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
                                                <p className='fixedValue'>{doctorProfile[0]?.fullname}</p>
                                                
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="doctorEmail">Email</label>
                                                <p className='fixedValue'>{doctorProfile[0]?.email}</p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="doctorEducation">Qualification</label>
                                                <p className='fixedValue'>{doctorProfile[0]?.qualification}</p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="doctorPhone">Phone</label>
                                                <p className='fixedValue'>{doctorProfile[0]?.phone}</p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="doctorName">Type of Doctor</label>
                                                <input type="text" id='doctorName' value={doctorProfile[0]?.specialist_category} name='fullname' placeholder='Enter Name...' />
                                            </div>
                                        </div>
                                    

                                        {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="startTime">Start Time</label>
                                                <input type="time" id='startTime' name='startTime' />
                                            </div>
                                        </div> */}
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="endTime">Shift</label>
                                                <input type="text" id='endTime' name='endTime' placeholder='Enter Shift' value={doctorProfile[0]?.availability} />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="fees">Fee of Session</label>
                                                <input type="text" id='fees' name='fees' placeholder='Enter Fees...' />
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
