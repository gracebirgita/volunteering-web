import React from "react";


/**
 * StatCard Component
 * @param {string} title - The label for the statistic
 * @param {number} value - The numerical data to display
 */

const AdminStatCard = ({title, value}) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 font-sans hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className = "text-3xl md:text-4xl font-extrabold text-[#005D67] tracking-tight">{value}</h3>
                    <p className="text-gray-500 text-sm font-medium mt-2 uppercase tracking-wider">{title}</p>
                </div>                
            </div>
        </div>
    )
}
export default AdminStatCard; 

