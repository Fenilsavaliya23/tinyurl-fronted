import React from 'react'

const AnalyticsCards = ({ dashboardStats }) => {

  if(!dashboardStats) return null;

  return (

    <div className="analytics-section">
       
        <h2>Analytics Dashboard</h2>

        <div className="analytics-grid">

            <div className="stats-card">

                <h3>Total URLs</h3>
                <h2>{dashboardStats.totalUrls}</h2>

            </div> 

            <div className="stats-card">

                <h3>Total Clicks</h3>
                <h2>{dashboardStats.totalClicks}</h2>

            </div> 

            <div className="stats-card">

                <h3>Active URLs</h3>
                <h2>{dashboardStats.activeUrls}</h2>

            </div> 

            <div className="stats-card">

                <h3>Expired URLs</h3>
                <h2>{dashboardStats.expiredUrls}</h2>

            </div> 
          
        </div>  

        <div className="most-clicked-card">

            <h3>Most Clicked URL</h3>
            <p>{dashboardStats.mostClickedUrl || 'No Clicks yet'}</p>
            <p>Clicks: {" "} {dashboardStats.mostClickedCount}</p>

        </div> 

    </div>
  )
}

export default AnalyticsCards
