import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import DoctorService from '../../../services/doctorService';
import TokenService from '../../../services/tokenService';

export const Dashboard = () => {
  const { getDoctorSingle, updateDoctor, getSpecialist, getSingleSpecialist } = DoctorService();
  const { getStorageData, getDoctorData } = TokenService();
  const [doctorData, setDoctorData] = useState({});
  const [singleSpecialist, setSingleSpecialist] = useState({})
  const [docSessionData, setDocSessionData] = useState()

  useEffect(() => {
    const userType = getStorageData();
    const doctorSpeciality = getDoctorData();

    getSingleSpecialist(doctorSpeciality?.specialist_category).then((res) => {
      setSingleSpecialist(sessionStorage?.setItem("doctorSpecialist", JSON.stringify(res?.data?.data[0])))
    }).catch((res) => {
      console.log(res)
    })
    getDoctorSingle(userType?.id).then((res) => {
      setDoctorData(sessionStorage.setItem("doctorProfile", JSON.stringify(res?.data?.data[0])));
    }).catch((error) => {
      console.log(error)
    })
  }, [singleSpecialist, docSessionData, doctorData])

  const Line1 = {
    chart: {
      id: 'spark1',
      group: 'sparks',
      type: 'line',
      height: 80,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      }
    },
    series: [{
      data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21]
    }],
    stroke: {
      curve: 'smooth'
    },
    markers: {
      size: 0
    },
    grid: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20
      }
    },
    colors: ['#e92b2b'],
    tooltip: {
      x: {
        show: false
      },
    }
  }
  const LineChart = {
    chart: {
      type: 'line',
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
        },
      },
    },
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    colors: ['#ff0000'],
    series: [
      {
        name: 'Insurance A',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 150, 200, 190]
      },

    ],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  };
  return (
    <>
      <section className='mainSection'>
        <div className="container">
          <div className="mainSectionWrapper">
            <div className="heading">
              <p>
                Dashboard
              </p>
            </div>
            <div className="card cardForm">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                    <div className="card">
                      <div className="card-body">
                        <div className="chart">
                          <div className="chartHeading">
                            <p>Total Patients</p>
                            <small>Current</small>
                          </div>
                          <div className="box box1">
                            <div className="details">
                              <p className='category'>140</p>
                              <p>Patients</p>
                            </div>
                            <ReactApexChart options={Line1} series={Line1.series} type="line" />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                    <div className="card">
                      <div className="card-body">
                        <div className="chart">
                          <div className="chartHeading">
                            <p> Patients Remaining</p>
                            <small>Current</small>
                          </div>
                          <div className="box box1">
                            <div className="details">
                              <p className='category'>40</p>
                              <p>Remaining</p>
                            </div>
                            <ReactApexChart options={Line1} series={Line1.series} type="line" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                    <div className="card">
                      <div className="card-body">
                        <div className="chart">
                          <div className="chartHeading">
                            <p> Patients Cured</p>
                            <small>Current</small>
                          </div>
                          <div className="box box1">
                            <div className="details">
                              <p className='category'>200</p>
                              <p>Cured</p>
                            </div>
                            <ReactApexChart options={Line1} series={Line1.series} type="line" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-12 col-xl-12 ">
                    <div className="card">
                      <div className="card-body">
                        <div className="chart">
                          <div className="chartHeading">
                            <p>Earning</p>
                            <small>Yearly</small>
                          </div>
                        </div>
                      </div>
                      <ReactApexChart options={LineChart} series={LineChart.series} type="line" height={350} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
