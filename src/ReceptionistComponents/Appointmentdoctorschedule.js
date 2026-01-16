// DoctorSchedule.jsx
import React, { useState, useEffect } from 'react';
import '../Styles/AppointmentDoctorsSchedule.css';
import api from "./services/api";

const DoctorSchedule = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [dates, setDates] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [branch, setBranch] = useState('');
  
  // Filters
  const [week, setWeek] = useState(1);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [weeks, setWeeks] = useState([]);

  // Mobile popup
  const [showMobilePopup, setShowMobilePopup] = useState(false);
  const [selectedSlotDetails, setSelectedSlotDetails] = useState(null);

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);

  // Fetch weeks when month/year changes
  useEffect(() => {
    fetchWeeks();
  }, [month, year]);

  // Fetch schedule when filters change
  useEffect(() => {
    if (weeks.length > 0) {
      fetchSchedule();
    }
  }, [week, month, year, weeks]);

  const fetchWeeks = async () => {
    try {
      const res = await api.get(
        `/schedule/schedule/weeks?month=${month}&year=${year}`
      );

      if (res.data.success) {
        setWeeks(res.data.data.weeks);
        setWeek(1);
      }
    } catch (error) {
      console.error("Error fetching weeks:", error);
    }
  };

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/schedule/schedule?week=${week}&month=${month}&year=${year}`
      );

      console.log('📊 Schedule response:', res.data); // Debug log

      if (res.data.success) {
        const data = res.data.data;

        setBranch(data.branch);
        setDoctors(data.doctors);
        console.log("doctors list",doctors);
        setDates(data.dates);
        setTimeSlots(data.timeSlots);

        console.log('👨‍⚕️ Doctors:', data.doctors);
        console.log('📅 Dates:', data.dates);
        console.log('⏰ Time Slots:', data.timeSlots);

        // Select first doctor by default
        if (data.doctors?.length > 0 && !selectedDoctor) {
          setSelectedDoctor(data.doctors[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
      alert("Failed to load schedule");
    } finally {
      setLoading(false);
    }
  };

  const fetchSlotDetails = async (slotId) => {
    try {
      const res = await api.get(
        `/schedule/schedule/slot-details/${slotId}`
      );

      if (res.data.success) {
        setSelectedSlotDetails(res.data.data);
        setShowMobilePopup(true);
      }
    } catch (error) {
      console.error("Error fetching slot details:", error);
    }
  };

  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00'); // ✅ Fixed timezone issue
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[date.getDay()];
    const dateNum = date.getDate();
    return { day, dateNum };
  };

  // Format time
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${String(hour12).padStart(2, '0')}:${minutes} ${ampm}`;
  };

  // ✅ FIXED: Get all unique time slots
  const getAllTimes = () => {
    const times = new Set();
    timeSlots.forEach(slot => {
      if (slot.slotTimeFrom) {
        times.add(slot.slotTimeFrom);
      }
    });
    const sortedTimes = Array.from(times).sort();
    console.log('⏰ All times:', sortedTimes); // Debug log
    return sortedTimes;
  };

  // ✅ FIXED: Get slot for specific doctor, date, and time
const getSlot = (doctorId, date, time) => {
  return timeSlots.find(
    (slot) =>
      slot.staffId === doctorId &&
      slot.slotDate === date &&
      slot.slotTimeFrom === time
  );
};


  // Render slot card
// Render slot card
const renderSlotCard = (slot) => {
  if (!slot) {
    return <div className="slot-card no-slot">No Slot</div>;
  }

  // ✅ AVAILABLE SLOT (NO APPOINTMENT)
  if (!slot.hasAppointment) {
    return <div className="slot-card available">Available</div>;
  }

  // ✅ BOOKED SLOT
  const statusColors = {
    pending: "status-pending",
    assigned: "status-assigned",
    approved: "status-approved",
    completed: "status-completed",
    cancelled: "status-cancelled",
    delayed: "status-delayed",
  };

  const statusClass = statusColors[slot.appointmentStatus] || "";

  return (
    <div
      className={`slot-card booked ${statusClass}`}
      onClick={() => fetchSlotDetails(slot.slotId)}
    >
      <div className="slot-client-name">
        {slot.clientName || "No Name"}
      </div>

      <div className="slot-time">
        {formatTime(slot.slotTimeFrom)} to {formatTime(slot.slotTimeTo)}
      </div>

      <div className="slot-action">
        {slot.purpose || "Consultation"}
      </div>

      <div className={`slot-status ${statusClass}`}>
        {slot.appointmentStatus}
      </div>
    </div>
  );
};


  // Render mobile popup
  const renderMobilePopup = () => {
    if (!showMobilePopup || !selectedSlotDetails) return null;

    return (
      <div className="mobile-popup-overlay" onClick={() => setShowMobilePopup(false)}>
        <div className="mobile-popup" onClick={(e) => e.stopPropagation()}>
          <div className="popup-header">
            <h3>Appointment Details</h3>
            <button 
              className="close-btn"
              onClick={() => setShowMobilePopup(false)}
            >
              ×
            </button>
          </div>
          
          <div className="popup-content">
            <div className="detail-section">
              <h4>Doctor Information</h4>
              <p><strong>Name:</strong> {selectedSlotDetails.doctorName}</p>
              <p><strong>Specialization:</strong> {selectedSlotDetails.doctorQualification}</p>
            </div>

            <div className="detail-section">
              <h4>Appointment Time</h4>
              <p><strong>Date:</strong> {new Date(selectedSlotDetails.slotDate).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {formatTime(selectedSlotDetails.slotTimeFrom)} - {formatTime(selectedSlotDetails.slotTimeTo)}</p>
            </div>

            {selectedSlotDetails.clientName && (
              <div className="detail-section">
                <h4>Patient Information</h4>
                <p><strong>Name:</strong> {selectedSlotDetails.clientName}</p>
                <p><strong>Mobile:</strong> {selectedSlotDetails.clientMobile}</p>
                <p><strong>Email:</strong> {selectedSlotDetails.clientEmail}</p>
                {selectedSlotDetails.clientGender && (
                  <p><strong>Gender:</strong> {selectedSlotDetails.clientGender}</p>
                )}
                {selectedSlotDetails.clientBloodGroup && (
                  <p><strong>Blood Group:</strong> {selectedSlotDetails.clientBloodGroup}</p>
                )}
                {selectedSlotDetails.purpose && (
                  <p><strong>Purpose:</strong> {selectedSlotDetails.purpose}</p>
                )}
                <p><strong>Status:</strong> <span className={`status-badge ${selectedSlotDetails.appointmentStatus}`}>{selectedSlotDetails.appointmentStatus}</span></p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const times = getAllTimes();

  if (loading) {
    return <div className="loading">Loading schedule...</div>;
  }

  return (
    <div className="schedule-container">
      {/* Left Sidebar - Doctors List */}
      <div className="doctors-sidebar">
        <h2 className="sidebar-title">Choose Doctor</h2>
        <div className="doctors-list">
          {doctors.length === 0 ? (
            <div className="no-doctors">No doctors found in this branch</div>
          ) : (
            doctors.map((doctor) => (
              <div
                key={doctor.id}
                className={`doctor-card ${selectedDoctor === doctor.id ? 'selected' : ''}`}
                onClick={() => setSelectedDoctor(doctor.id)}
              >
  <div className="doctor-avatar">
  {doctor.profile_photo ? (
    <img
      src={`${process.env.REACT_APP_SITE_URL}/Images/${doctor.profile_photo}`}
      alt={doctor.name}
      className="doctor-avatar-img"
    />
  ) : (
    <div className="avatar-placeholder">
      {doctor.name?.substring(0, 2).toUpperCase()}
    </div>
  )}
</div>

                <div className="doctor-info">
                  <h3 className="doctor-name">{doctor.name}</h3>
                  <p className="doctor-specialization">{doctor.qualification || 'Specialist'}</p>
                  {/* <div className="availability-indicator">
                    <span className="indicator-dot"></span>
                    <span className="indicator-text">Available Today</span>
                  </div>
                  <p className="availability-time">09:00 AM - 10:00 AM</p> */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Schedule Area */}
      <div className="schedule-main">
        {/* Filters */}
        <div className="schedule-filters">
          <div className="filter-group">
            <label>Week</label>
            <select value={week} onChange={(e) => setWeek(parseInt(e.target.value))}>
              {weeks.map((w) => (
                <option key={w.value} value={w.value}>
                  {w.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Month</label>
            <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Year</label>
            <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Schedule Table */}
        {dates.length === 0 || times.length === 0 ? (
          <div className="no-data">No schedule data available for this week</div>
        ) : (
          <div className="schedule-table-wrapper">
            <table className="schedule-table">
                
              <thead style={{backgroundColor:"#01636B",color:"white"}}>
                <tr>
                  <th className="time-column" style={{backgroundColor:"#01636B",color:"white"}}>Time</th>
                  {dates.map((date) => {
                    const { day, dateNum } = formatDate(date);
                    return (
                      <th key={date}>
                        <div className="date-header">
                          <span className="day-name">{day} {dateNum}</span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {times.map((time) => (
                  <tr key={time}>
                    <td className="time-cell">{formatTime(time)}</td>
                    {dates.map((date) => {
                      const slot = getSlot(selectedDoctor, date, time);
                      return (
                        <td key={`${date}-${time}`} className="slot-cell">
                          {renderSlotCard(slot)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mobile Popup */}
      {renderMobilePopup()}
    </div>
  );
};

export default DoctorSchedule;