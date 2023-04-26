import React, { useEffect, useLayoutEffect, useState } from 'react'
import profilePic from '../../../assets/images/guy.png'
import DoctorService from '../../../services/doctorService';
import sunImg from '../../../assets/images/sun1.png'
import moonImg from '../../../assets/images/moon.png'
import TokenService from '../../../services/tokenService';

export const Profile = () => {
    const [addTime, setAddTime] = useState([]);
    const { getDoctorData } = TokenService();
    const { updateDoctor, getSpecialist, getSingleSpecialist, getDoctorType } = DoctorService();
    const [docSpecialist, setDoctorSpecialist] = useState([])
    let imageUrl = "http://fmd.arraydigitals.com"
    const jsonSpecilistString = sessionStorage?.getItem("doctorSpecialist");
    const jsonTypeString = sessionStorage?.getItem("doctorType");
    const initialData = jsonSpecilistString ? JSON.parse(jsonSpecilistString) : JSON.parse(jsonTypeString);
    const [singleSpecialist, setSingleSpecialist] = useState(initialData);
    const [image, setDoctorImage] = useState(null)
    const [imageLocal, setDoctorImageLocal] = useState()
    // console.log(imageLocal,"imageurl")
    //get the user data from Session Storage and store it in the useState;
    const [doctorData, setDoctorData] = useState(getDoctorData());
    //object of data which is set according to local storage;
    const [doctorProfile, setDoctorProfile] = useState({
        fullname: doctorData?.fullname,
        email: doctorData?.email,
        phone: doctorData?.phone,
        image: doctorData?.image,
        qualification: doctorData?.qualification,
        experience: doctorData?.experience,
        specialist_category: doctorData?.specialist_category,
        doctor_type: doctorData?.doctor_type,
        pdma_id: doctorData?.PMDA_ID,
        cnic: doctorData?.CNIC,
        shift: doctorData?.availability,
        consultation: doctorData?.consultation,
        fee: doctorData?.fee,
        start_time: doctorData?.start_time,
        end_time: doctorData?.end_time,
    });

    //get input fields
    const getInput = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setDoctorProfile({ ...doctorProfile, [name]: value })
    }
    //get Image file of Doctor
    const getImageInput = e => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setDoctorImage(reader.result);
            saveImageLocal(reader.result)
        };
    }

    const saveImageLocal = imageData => {
        sessionStorage.setItem("userImageLocal", imageData);
    }

    const formSumbit = (e) => {
        console.log(doctorProfile, "doctorProfile")
        e.preventDefault();
        //image sent in database
        const doctorSubmitData = { ...doctorProfile, image }
        console.log(doctorSubmitData)
        updateDoctor(doctorSubmitData).then((res) => {
            console.log(res)
            const updatedDoctor = { ...doctorData, 
                fullname: doctorProfile?.fullname, 
                email: doctorProfile?.email, 
                qualification: doctorProfile?.qualification, 
                experience: doctorProfile?.experience, 
                phone: doctorProfile?.phone, 
                fee: doctorProfile?.fee, 
                start_time: doctorProfile?.start_time, 
                end_time: doctorProfile?.end_time, 
                availability: doctorProfile?.shift, 
                doctor_type: doctorProfile?.doctor_type,
                consultation:doctorProfile?.consultation, 
                specialist_category:doctorProfile?.specialist_category }
            sessionStorage.setItem('doctorProfile', JSON.stringify(updatedDoctor));
            setDoctorData(updatedDoctor);
            // window.location.reload();
        }).catch((res) => {
            console.log(res.message)
        })
    }

    useEffect(() => {
        if (doctorData?.specialist_category === null) {
            getDoctorType().then((res) => {
                setDoctorSpecialist(res?.data?.data)
            }).catch((res) => {
                console.log(res)
            });
        } else {
            getSpecialist().then((res) => {
                setDoctorSpecialist(res?.data?.data)
            }).catch((res) => {
                console.log(res)
            });
        }

        setDoctorImageLocal(sessionStorage.getItem("userImageLocal"));

    }, [imageLocal, docSpecialist])

    // useLayoutEffect(()=>{
    //     setDoctorImageLocal(sessionStorage.getItem("userImageLocal"));

    // })
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
                                                    {/* <img src={`${imageUrl}/${doctorData?.image}`} alt="" className='profileImage' onChange={getImageInput}/> */}
                                                    <img src={imageLocal ? imageLocal : `${imageUrl}/${doctorData?.image}`} alt="" className='profileImage' onChange={getImageInput} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="uploadImg">Upload Profile</label>
                                                <input type="file" className='form-control' id='uploadImg' name='image' onChange={getImageInput} />
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
                                                <label htmlFor="doctorExperience">Experience</label>
                                                <input value={doctorProfile?.experience} type='number' name='experience' onChange={getInput} />
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
                                                <label htmlFor="doctorName"> {doctorData?.specialist_category === null ? "Doctor Type" : "Speciality"} </label>
                                                {/* <input type="text" id='doctorName' value={doctorProfile?.specialist_category} name='specialist_category' placeholder='Enter Name...' onChange={getInput} /> */}

                                                {
                                                    doctorData?.specialist_category === null ?

                                                        <select name="doctor_type" id="" onChange={getInput}>
                                                            <option value={singleSpecialist?.id}> -Update Your Type - {singleSpecialist?.title}</option>
                                                            {docSpecialist?.map((item, keyId) => {
                                                                return (
                                                                    <option value={item?.id} key={keyId}>{item?.title}</option>
                                                                )
                                                            })
                                                            }
                                                        </select>
                                                        :
                                                        <select name="specialist_category" id="" onChange={getInput}>
                                                            <option value={singleSpecialist?.id}>- Update Your speciality - {singleSpecialist?.title}</option>
                                                            {docSpecialist?.map((item, keyId) => {
                                                                return (
                                                                    <option value={item?.id} key={keyId}>{item?.title}</option>
                                                                )
                                                            })
                                                            }
                                                        </select>
                                                }
                                            </div>
                                        </div>





                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="fees">Fee of Session</label>
                                                <input type="text" id='fees' value={doctorProfile?.fee} name='fee' placeholder='Enter Fees...' onChange={getInput} />
                                            </div>
                                        </div>



                                        {/* {
                                                addDesc.map((item, keyId) => ( */}

                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="time">Start Time</label>
                                                <input type="time" id='time' name='start_time' value={doctorProfile?.start_time} onChange={getInput} />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className="fields">
                                                <label htmlFor="endTime">End Time</label>
                                                <input type="time" id='endTime' name='end_time' value={doctorProfile?.end_time} onChange={getInput} />
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
                                                        <input type="radio" id="doctorDayAvailability" value="Day" name='shift' onChange={getInput} />
                                                    </div>
                                                    <div className="availInner">
                                                        <div className="labelDiv">
                                                            <img className='moon' src={moonImg} alt="" />
                                                            <label htmlFor="doctorNightAvailability">Night</label>
                                                        </div>
                                                        <input type="radio" name='shift' value="Night" id='doctorNightAvailability' onChange={getInput} />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        {/* ))
                                            }
                                            <div className="addMoreButton">
                                                {addDesc.length >= 2 &&
                                                    <button onClick={handleServiceDelete}>remove</button>
                                                }
                                                {addDesc.length <= 4 &&
                                                    <button onClick={handleAddMoreClick}>Add More</button>
                                                }
                                            </div> */}

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
