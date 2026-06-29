import React from 'react'
import { Link21, MouseCircle, TickCircle, CloseCircle, Crown1 } from 'iconsax-react';

const AnalyticsCards = ({ dashboardStats }) => {
        
     if (!dashboardStats) {
        return (
            <div className="analytics-section">
                <h2>Loading Analytics...</h2>
            </div>
        );
    }

    const topUrls = dashboardStats?.topUrls || [] ;


    return (

        <div className="analytics-section">
        
            <h2>Analytics Dashboard</h2>

            <div className="analytics-grid">

                <div className="stats-card">

                    <div className="card-header">

                        <div className="card-icon">
                            <Link21 size="24" color="currentColor" />
                        </div>

                        <div><h3>Total URLs</h3></div>

                    </div>
                    
                    <h2>{dashboardStats.totalUrls}</h2>

                    <p className="stats-description">Short URLs Created</p>

                </div> 

                <div className="stats-card">

                    <div className="card-header">
                        <div className='card-icon'>

                            <MouseCircle size="24" color="currentColor" />

                        </div>

                        <div><h3>Total Clicks</h3></div>

                    </div>

                    <h2>{dashboardStats.totalClicks}</h2>

                    <p className="stats-description">Total Redirects</p>

                </div> 

                <div className="stats-card">

                    <div className="card-header">

                        <div className='card-icon'>

                            <TickCircle size="24" color="currentColor" />

                        </div>

                        <div><h3>Active URLs</h3></div>
                   
                    </div>

                    <h2>{dashboardStats.activeUrls}</h2>

                    <p className="stats-description">Currently Active</p>

                </div> 

                <div className="stats-card">

                    <div className="card-header">

                        <div className='card-icon'>

                            <CloseCircle size="24" color="currentColor" />

                        </div>    

                        <div><h3>Expired URLs</h3></div>

                    </div>

                    <h2>{dashboardStats.expiredUrls}</h2>

                    <p className="stats-description">No Longer Active</p>

                </div> 

            </div>    
            
            <div className="most-clicked-card">

                <div className="top-urls-card">
                    
                    <div className="top-urls-header">
                        
                        <Crown1 size="24" color="currentColor" />
                        <h3>Top Performing URLs</h3>

                    </div>

                    { topUrls.length === 0 ? (
                        <p>No URLs have been clicked yet.</p>
                    ) : (
                        topUrls
                            .slice(0, 5)
                            .map((url, index) => (
                                <div key={index} className="top-url-item">
                                    
                                    <div className="top-url-left">
                                        <span className="top-rank">{index + 1}</span>
                                        <span className="top-url-text" title={url.shortUrl}> {url.shortUrl} </span>
                                    </div>

                                    <div className="top-clicks">
                                        {url.clickCount} {url.clickCount <= 1 ? 'click' : 'clicks'}
                                    </div>
                                    
                                </div>
                            ))
                    )}

                </div>

                <div className="most-clicked-info">

                    <h3>Most Clicked URL</h3>

                    <p className="top-url-name">

                        {dashboardStats.mostClickedUrl || "No Clicks Yet"}

                    </p>

                    <span className="top-url-count">

                        {dashboardStats.mostClickedCount} Clicks

                    </span>

                </div>

            </div>  

        </div>
  )
}

export default React.memo(AnalyticsCards);
