import React from 'react'
import { useEffect } from 'react'
import StatisticsDashboard from '../components/dashboard/StatisticsDashboard';
import SubPendingRequest from '../components/dashboard/SubPendingRequest';
import EventsCalendar from '../components/dashboard/UpcomingEvents';

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard | Barangay E-Services Management"
  }, []);

  return (
    <div className="mx-4 my-5 md:mx-5 md:my-6 lg:ml-[19rem] lg:mt-8 lg:mr-6">
      <StatisticsDashboard />
      <div className='w-full flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0'>
        <SubPendingRequest />
        <EventsCalendar />
      </div>
    </div>
  );
}

export default Dashboard