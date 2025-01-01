import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiChartPie } from 'react-icons/hi';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';

export default function DashSidebar() {
  const {currentUser}=useSelector((state)=>state.auth)
  return (
    <div className="d-flex flex-column p-3 bg-light" style={{ width: '250px', height: '100vh' }}>
      <Nav className="flex-column">
        {/* Dashboard link (Admin only) */}
        {currentUser?.admin && (
          <Link to="/dashboard?tab=dash" className="nav-link d-flex align-items-center gap-2">
            <HiChartPie /> Dashboard
          </Link>
        )}
        
        {/* Profile link */}
        <Link to="/dashboard?tab=profile" className="nav-link d-flex align-items-center gap-2">
          <HiUser /> Profile <span className="badge bg-secondary ms-2">{currentUser.admin ? 'Admin' : 'User'}</span>
        </Link>

        {/* Posts link (Admin only) */}
        {currentUser?.admin && (
          <Link to="/dashboard?tab=posts" className="nav-link d-flex align-items-center gap-2">
            <HiDocumentText /> Posts
          </Link>
        )}

        {/* Users link (Admin only) */}
        {currentUser?.admin && (
          <Link to="/dashboard?tab=users" className="nav-link d-flex align-items-center gap-2">
            <HiOutlineUserGroup /> Users
          </Link>
        )}

        {/* Comments link (Admin only) */}
        {currentUser?.admin && (
          <Link to="/dashboard?tab=comments" className="nav-link d-flex align-items-center gap-2">
            <HiAnnotation /> Comments
          </Link>
        )}

        {/* Sign Out link */}
        <div className="nav-link d-flex align-items-center gap-2 cursor-pointer">
          <HiArrowSmRight /> Sign Out
        </div>
      </Nav>
    </div>
  );
}
