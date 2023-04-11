import React, { useEffect, useState } from 'react'
import profilePic from '../../../assets/images/guy.png'
import DoctorService from '../../../services/doctorService';
import sunImg from '../../../assets/images/sun1.png'
import moonImg from '../../../assets/images/moon.png'
import TokenService from '../../../services/tokenService';

export const Profile = () => {

    const { getDoctorData } = TokenService();
    const { updateDoctor } = DoctorService();
    const [doctorData, setDoctorData] = useState(getDoctorData());
    const [doctorProfile, setDoctorProfile] = useState({
        fullname: doctorData?.fullname,
        email: doctorData?.email,
        // password: doctorData?.password,
        phone: doctorData?.phone,
        // image:doctorData?.image,
        qualification: doctorData?.qualification,
        experience: doctorData?.experience,
        specialist_category: doctorData?.specialist_category,
        availability: doctorData?.availability,
        fee: doctorData?.fee
    });



    const getInput = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setDoctorProfile({ ...doctorProfile, [name]: value })
    }

    const formSumbit = (e) => {
        e.preventDefault();
        const doctorSubmitData = { ...doctorProfile }
        console.log(doctorSubmitData)
        updateDoctor(doctorSubmitData).then((res) => {
            console.log(res)
            const updatedDoctor = { ...doctorData, fullname: doctorProfile?.fullname, email: doctorProfile?.email, phone: doctorProfile?.phone, qualification: doctorProfile?.qualification, specialist_category: doctorProfile?.specialist_category, fee: doctorProfile?.fee, availability: doctorProfile?.availability }
            console.log(updatedDoctor, "updated Doctor Submit")
            sessionStorage.setItem('doctorProfile', JSON.stringify(updatedDoctor));
            setDoctorData(updatedDoctor);
            // window.location.reload();
        }).catch((res) => {
            console.log(res.message)
        })
    }
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
                                <form className="additionForm" onSubmit={formSumbit}>
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
                                                <input type='text' name='fullname' value={doctorProfile?.fullname} onChange={getInput} />
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="doctorEmail">Email</label>
                                                <input type='text' name='email' value={doctorProfile?.email} onChange={getInput} />
                                            </div>
                                        </div>


                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="doctorEducation">Qualification</label>
                                                <input value={doctorProfile?.qualification} type='text' name='qualification' onChange={getInput} />
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="doctorPhone">Phone</label>
                                                <input type='number' onChange={getInput} className='fixedValue' name='phone' value={doctorProfile?.phone}></input>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="doctorName">Type of Doctor</label>
                                                <input type="text" id='doctorName' value={doctorProfile?.specialist_category} name='specialist_category' placeholder='Enter Name...' onChange={getInput} />
                                            </div>
                                        </div>





                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="fees">Fee of Session</label>
                                                <input type="text" id='fees' value={doctorProfile?.fee} name='fee' placeholder='Enter Fees...' onChange={getInput} />
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="doctorDayAvailability">Availability</label>
                                                <div className='availOuter'>
                                                    <div className="availInner">
                                                        <div className="labelDiv">
                                                            <img src={sunImg} alt="" />
                                                            <label htmlFor="doctorDayAvailability">Day</label>
                                                        </div>
                                                        <input type="radio" id="doctorDayAvailability" value="Day" checked={doctorProfile?.availability == "Day"} name='availability' onChange={getInput} />
                                                    </div>
                                                    <div className="availInner">
                                                        <div className="labelDiv">
                                                            <img className='moon' src={moonImg} alt="" />
                                                            <label htmlFor="doctorNightAvailability">Night</label>
                                                        </div>
                                                        <input type="radio" name='availability' value="Night" checked={doctorProfile?.availability == "Night"} id='doctorNightAvailability' onChange={getInput} />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="endTime">Shift</label>
                                           
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
                                        </div> */}

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
